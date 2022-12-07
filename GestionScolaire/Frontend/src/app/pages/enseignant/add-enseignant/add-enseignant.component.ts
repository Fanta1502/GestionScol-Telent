import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';

@Component({
  selector: 'app-add-enseignant',
  templateUrl: './add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.scss']
})
export class AddEnseignantComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  constructor(private modalService: NgbModal, private enseignantService: EnseignantService) { }
ngOnInit(): void {
  this.addForm = new FormGroup({
    matricule: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    genre: new FormControl('masculin', Validators.required),
    date_naissance: new FormControl('', Validators.required),
    lieu_naissance: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    nationalite: new FormControl('', Validators.required),
    date_recrutement: new FormControl('', Validators.required),
    specialite: new FormControl('', Validators.required),
    dernier_diplome: new FormControl('', Validators.required),
    etat_contractuel: new FormControl('', Validators.required)
  });  
}
get f() {
  return this.addForm.controls;
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
  if (this.addForm.invalid) {
    return;
  }
  let enseignant = {
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
  this.enseignantService.add(enseignant).subscribe(
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