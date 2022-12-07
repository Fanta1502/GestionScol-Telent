import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';

@Component({
  selector: 'app-add-etablissement',
  templateUrl: './add-etablissement.component.html',
  styleUrls: ['./add-etablissement.component.scss']
})
export class AddEtablissementComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  constructor(private modalService: NgbModal,private etablissementService : EtablissementService) {}
  
  ngOnInit() {
    this.addForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      sigle: new FormControl('', Validators.required),
      superficie: new FormControl('', Validators.required),
      reference_foncier: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      date_ouverture: new FormControl('', Validators.required),
      nom_prenom_proviseur: new FormControl('', Validators.required),
      nom_prenom_promoteur: new FormControl('', Validators.required),
      capacite_accueil: new FormControl('', Validators.required),
      nbre_salle_ordinaire: new FormControl('', Validators.required),
      nbre_salle_specialisee: new FormControl('', Validators.required),
      description: new FormControl(''),
      adresse: new FormControl(''),
    });  
  }

  get f() {
    return this.addForm.controls;
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
    if (this.addForm.invalid) {
      return;
    }
    let etablissement = {
      nom: form.value.nom,
      sigle: form.value.sigle,
      superficie: form.value.superficie,
      reference_foncier:form.value.reference_foncier,
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
    }
    this.etablissementService.add(etablissement).subscribe(
      res => {
        this.modalService.dismissAll();
      }
    )
  }
  close()
  {
    this.modalService.dismissAll();
  }
}
