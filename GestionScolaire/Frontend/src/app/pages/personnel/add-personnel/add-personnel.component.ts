import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  constructor(private modalService: NgbModal, private personnelService: PersonnelService) { }
ngOnInit(): void {
  this.addForm = new FormGroup({
    matricule: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    genre: new FormControl('masculin', Validators.required),
    date_naissance: new FormControl('', Validators.required),
    lieu_naissance: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    nationalite: new FormControl('', Validators.required),
    date_recrutement: new FormControl('', Validators.required),
    fonction: new FormControl('', Validators.required),
    statut: new FormControl('', Validators.required),
    type_contrat: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    duree_contrat: new FormControl('', Validators.required),
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
  let personnel = {
    matricule:  form.value.matricule,
    nom: form.value.nom,
    prenom:  form.value.prenom,
    genre:  form.value.genre,
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
  this.personnelService.add(personnel).subscribe(
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