import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';

@Component({
  selector: 'app-edit-enseignant',
  templateUrl: './edit-enseignant.component.html',
  styleUrls: ['./edit-enseignant.component.scss']
})
export class EditEnseignantComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  data;
  constructor(private modalService: NgbModal, private enseignantService: EnseignantService) { }
ngOnInit(): void {
  this.data = this.enseignantService.getData();
  this.editForm = new FormGroup({
    matricule: new FormControl(this.data.matricule, Validators.required),
    nom: new FormControl(this.data.nom, Validators.required),
    prenom: new FormControl(this.data.prenom, Validators.required),
    email: new FormControl(this.data.email, [Validators.required,Validators.email]),
    genre: new FormControl(this.data.genre, Validators.required),
    date_naissance: new FormControl(moment(this.data.date_naissance).format("YYYY-MM-DD"), Validators.required),
    lieu_naissance: new FormControl(this.data.lieu_naissance, Validators.required),
    adresse: new FormControl(this.data.adresse, Validators.required),
    telephone: new FormControl(this.data.telephone, Validators.required),
    nationalite: new FormControl(this.data.nationalite, Validators.required),
    date_recrutement: new FormControl(moment(this.data.date_recrutement).format("YYYY-MM-DD"), Validators.required),
    specialite: new FormControl(this.data.specialite, Validators.required),
    dernier_diplome: new FormControl(this.data.dernier_diplome, Validators.required),
    etat_contractuel: new FormControl(this.data.etat_contractuel, Validators.required)
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
  let enseignant = {
    id : this.data.id,
    matricule:  form.value.matricule,
    nom: form.value.nom,
    prenom:  form.value.prenom,
    genre:  form.value.genre,
    date_naissance:  form.value.date_naissance,
    lieu_naissance:  form.value.lieu_naissance,
    adresse:  form.value.adresse,
    email : form.value.email,
    telephone:  form.value.telephone,
    nationalite:  form.value.nationalite,
    date_recrutement:  form.value.date_recrutement,
    specialite:  form.value.specialite,
    dernier_diplome:  form.value.dernier_diplome,
    etat_contractuel:  form.value.etat_contractuel
  } 
  this.enseignantService.edit(enseignant).subscribe(
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