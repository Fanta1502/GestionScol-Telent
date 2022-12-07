import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import * as XLSX from 'xlsx';
import { AddEtablissementComponent } from './add-etablissement/add-etablissement.component';
import { EditEtablissementComponent } from './edit-etablissement/edit-etablissement.component';
@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  etablissement: any;
  collectionSize;
  image: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  pageSize = 5;
  page = 1;
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  file: File;
  fileName: string = "No file selected";
  constructor(private modalService: NgbModal, private router: Router, private etablissementService: EtablissementService) { }
  onEdit() {
    this.etablissementService.data(this.etablissement);
    this.router.navigateByUrl("pages/etablissement-edit");
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
  loadData(request) {
    this.etablissementService.all(request).subscribe(
      res => {
        this.etablissement ={
          id : res.content[0].id,
        nom:  res.content[0].nom,
        sigle:  res.content[0].sigle,
        superficie:  res.content[0].superficie,
        reference_foncier:  res.content[0].reference_foncier,
        telephone:  res.content[0].telephone,
        email:  res.content[0].email,
        date_ouverture:  moment(res.content[0].date_ouverture).format("YYYY-MM-DD"),
        nom_prenom_proviseur:  res.content[0].nom_prenom_proviseur,
        nom_prenom_promoteur:  res.content[0].nom_prenom_promoteur,
        capacite_accueil:  res.content[0].capacite_accueil,
        nb_salle_ordinaire:  res.content[0].nb_salle_ordinaire,
        nb_salle_specialisee:  res.content[0].nb_salle_specialisee,
        description:  res.content[0].description,
        adresse:  res.content[0].adresse
      };
        this.collectionSize = res.totalCount;
        this.customerList = res.content;
        if (res.content[0])
        if (res.content[0].logo)
          this.image = "data:image/jpeg;base64," + this.etablissement.logo
      }
    )

  }
  ngOnInit(): void {
    this.loadData(
      {
        size: this.pageSize,
        page: this.page
      });
    this.addForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      sigle: new FormControl('', Validators.required),
      superficie: new FormControl('', Validators.required),
      reference_foncier: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      date_ouverture: new FormControl('', Validators.required),
      nom_prenom_proviseur: new FormControl('', Validators.required),
      nom_prenom_promoteur: new FormControl('', Validators.required),
      capacite_accueil: new FormControl('', Validators.required),
      nbre_salle_ordinaire: new FormControl('', Validators.required),
      nbre_salle_specialisee: new FormControl('', Validators.required),
      description: new FormControl(''),
      adresse: new FormControl('', Validators.required),
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
      reference_foncier: form.value.reference_foncier,
      telephone: form.value.telephone,
      email: form.value.email,
      date_ouverture: form.value.date_ouverture,
      nom_prenom_proviseur: form.value.nom_prenom_proviseur,
      nom_prenom_promoteur: form.value.nom_prenom_promoteur,
      capacite_accueil: form.value.capacite_accueil,
      nb_salle_ordinaire: form.value.nbre_salle_ordinaire,
      nb_salle_specialisee: form.value.nbre_salle_specialisee,
      description: form.value.description,
      adresse: form.value.adresse,
      logo: this.image.slice("data:image/jpeg;base64,".length)
    }
    this.etablissementService.add(etablissement).subscribe(
      res => {
        this.router.navigateByUrl("pages/etablissement");
      }
    )
  }
}