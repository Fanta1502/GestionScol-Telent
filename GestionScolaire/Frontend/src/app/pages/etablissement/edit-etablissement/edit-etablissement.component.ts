import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';

@Component({
  selector: 'app-edit-etablissement',
  templateUrl: './edit-etablissement.component.html',
  styleUrls: ['./edit-etablissement.component.scss']
})
export class EditEtablissementComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  data;
  file: File;
  fileName: string = "No file selected";
  image: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  constructor(private modalService: NgbModal, private router: Router, private etablissementService: EtablissementService) { }
  ngOnInit() {
    this.data = this.etablissementService.getData();
    if (this.data.logo)
      this.image = "data:image/jpeg;base64," + this.data.logo
    this.editForm = new FormGroup({
      nom: new FormControl(this.data.nom, Validators.required),
      sigle: new FormControl(this.data.sigle, Validators.required),
      superficie: new FormControl(this.data.superficie, Validators.required),
      reference_foncier: new FormControl(this.data.reference_foncier, Validators.required),
      telephone: new FormControl(this.data.telephone, Validators.required),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      date_ouverture: new FormControl(moment(this.data.date_ouverture).format("YYYY-MM-DD"), Validators.required),
      nom_prenom_proviseur: new FormControl(this.data.nom_prenom_proviseur, Validators.required),
      nom_prenom_promoteur: new FormControl(this.data.nom_prenom_promoteur, Validators.required),
      capacite_accueil: new FormControl(this.data.capacite_accueil, Validators.required),
      nbre_salle_ordinaire: new FormControl(this.data.nb_salle_ordinaire, Validators.required),
      nbre_salle_specialisee: new FormControl(this.data.nb_salle_specialisee, Validators.required),
      description: new FormControl(this.data.description),
      adresse: new FormControl(this.data.adresse),
    });
  }
  imageChange(file) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.image = reader.result;
      }
    }
  }
  get f() {
    return this.editForm.controls;
  }
  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.dateSup = false;
    let date = moment(Date.now());
    let date_ouverture = moment(form.value.date_ouverture);
    if (date_ouverture.isAfter(date)) {
      this.dateSup = true;
      return;
    }
    if (this.editForm.invalid) {
      return;
    }
    if (this.image) {
      let etablissement = {
        id: this.data.id,
        nom: form.value.nom,
        sigle: form.value.sigle,
        superficie: form.value.superficie,
        reference_foncier: form.value.reference_foncier,
        telephone: form.value.telephone,
        email: form.value.email,
        date_ouverture: form.value.date_ouverture,
        nom_prenom_proviseur: form.value.nom_prenom_proviseur,
        nom_prenom_promoteur: form.value.nom_prenom_promoteur,
        capacite_accueil: form.value.capacite_accueil,
        nbre_salle_ordinaire: form.value.nbre_salle_ordinaire,
        nbre_salle_specialisee: form.value.nbre_salle_specialisee,
        description: form.value.description,
        adresse: form.value.adresse,
        logo: this.image.slice("data:image/jpeg;base64,".length)
      }
      this.etablissementService.edit(etablissement).subscribe(
        res => {
          this.router.navigateByUrl("/pages/etablissement")
        }
      )
    }
    else {
      let etablissement = {
        id: this.data.id,
        nom: form.value.nom,
        sigle: form.value.sigle,
        superficie: form.value.superficie,
        reference_foncier: form.value.reference_foncier,
        telephone: form.value.telephone,
        email: form.value.email,
        date_ouverture: form.value.date_ouverture,
        nom_prenom_proviseur: form.value.nom_prenom_proviseur,
        nom_prenom_promoteur: form.value.nom_prenom_promoteur,
        capacite_accueil: form.value.capacite_accueil,
        nbre_salle_ordinaire: form.value.nbre_salle_ordinaire,
        nbre_salle_specialisee: form.value.nbre_salle_specialisee,
        description: form.value.description,
        adresse: form.value.adresse,
        logo: this.image
      }
      this.etablissementService.edit(etablissement).subscribe(
        res => {
          this.router.navigateByUrl("/pages/etablissement")
        }
      )
    }
  }
  close() {
    this.router.navigateByUrl("/pages/etablissement")
  }
}