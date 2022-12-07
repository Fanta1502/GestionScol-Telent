import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';

@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['./edit-personnel.component.scss']
})
export class EditPersonnelComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  data;
  constructor(private modalService: NgbModal, private personnelService: PersonnelService) { }
ngOnInit(): void {
  this.data = this.personnelService.getData();
  this.editForm = new FormGroup({
    matricule: new FormControl(this.data.matricule, Validators.required),
    nom: new FormControl(this.data.nom, Validators.required),
    prenom: new FormControl(this.data.prenom, Validators.required),
    date_naissance: new FormControl(moment(this.data.date_naissance).format("YYYY-MM-DD"), Validators.required),
    lieu_naissance: new FormControl(this.data.lieu_naissance, Validators.required),
    adresse: new FormControl(this.data.adresse, Validators.required),
    telephone: new FormControl(this.data.telephone, Validators.required),
    nationalite: new FormControl(this.data.nationalite, Validators.required),
    date_recrutement: new FormControl(moment(this.data.date_recrutement).format("YYYY-MM-DD"), Validators.required),
    fonction: new FormControl(this.data.fonction, Validators.required),
    statut: new FormControl(this.data.statut, Validators.required),
    type_contrat: new FormControl(this.data.type_contrat, Validators.required),
    role: new FormControl(this.data.role, Validators.required),
    duree_contrat: new FormControl(this.data.duree_contrat, Validators.required),
  });  
}
get f() {
  return this.editForm.controls;
}
onSubmit(form: FormGroup) {
  this.submitted = true;
  this.dateSup = false;
  let date = moment(Date.now());
  let date_naissance = moment(form.value.date_naissance);
  if (date_naissance.isAfter(date)) {
    this.dateSup = true;
    return;
  }
  if (this.editForm.invalid) {
    return;
  }
  let personnel = {
    id : this.data.id,
    matricule:  form.value.matricule,
    nom: form.value.nom,
    prenom:  form.value.prenom,
    date_naissance:  form.value.date_naissance,
    lieu_naissance:  form.value.lieu_naissance,
    adresse:  form.value.adresse,
    telephone:  form.value.telephone,
    nationalite:  form.value.nationalite,
    date_recrutement:  form.value.date_recrutement,
    fonction:  form.value.fonction,
    statut:  form.value.statut,
    type_contrat:  form.value.type_contrat,
    role:  form.value.role,
    duree_contrat:  form.value.duree_contrat,
  }
  this.personnelService.edit(personnel).subscribe(
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