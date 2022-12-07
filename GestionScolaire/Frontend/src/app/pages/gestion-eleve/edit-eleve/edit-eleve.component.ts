import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EleveService } from 'src/app/services/eleve/eleve.service';

@Component({
  selector: 'app-edit-eleve',
  templateUrl: './edit-eleve.component.html',
  styleUrls: ['./edit-eleve.component.scss']
})
export class EditEleveComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  data;
  constructor(private modalService: NgbModal, private eleveService: EleveService) { }
ngOnInit(): void {
  this.data = this.eleveService.getData();
  this.editForm = new FormGroup({
    matricule: new FormControl(this.data.matricule, Validators.required),
    nom: new FormControl(this.data.nom, Validators.required),
    prenom: new FormControl(this.data.prenom, Validators.required),
    genre: new FormControl(this.data.genre, Validators.required),
    date_naissance: new FormControl(moment(this.data.date_naissance).format("YYYY-MM-DD"), Validators.required),
    lieu_naissance: new FormControl(this.data.lieu_naissance, Validators.required),
    adresse: new FormControl(this.data.adresse, Validators.required),
    telephone: new FormControl(this.data.telephone, Validators.required),
    email_parent: new FormControl(this.data.email_parent, [Validators.required,Validators.email]),
    prenom_pere: new FormControl(this.data.prenom_pere, Validators.required),
    nom_prenom_mere: new FormControl(this.data.nom_prenom_mere, Validators.required),
    profession_pere: new FormControl(this.data.profession_pere, Validators.required),
    profession_mere: new FormControl(this.data.profession_mere, Validators.required),
    handicap_particuliers: new FormControl(this.data.handicap_particuliers),
    maladies_particulieres: new FormControl(this.data.maladies_particulieres),
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
  let eleve = {
    id : this.data.id,
    matricule:  form.value.matricule,
    nom: form.value.nom,
    prenom:  form.value.prenom,
    genre:  form.value.genre,
    date_naissance:  form.value.date_naissance,
    lieu_naissance:  form.value.lieu_naissance,
    adresse:  form.value.adresse,
    telephone:  form.value.telephone,
    email_parent:  form.value.email_parent,
    prenom_pere:  form.value.prenom_pere,
    nom_prenom_mere:  form.value.nom_prenom_mere,
    profession_pere:  form.value.profession_pere,
    profession_mere:  form.value.profession_mere,
    handicap_particuliers:  form.value.handicap_particuliers,
    maladies_particulieres:  form.value.maladies_particulieres
  } 
  this.eleveService.edit(eleve).subscribe(
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