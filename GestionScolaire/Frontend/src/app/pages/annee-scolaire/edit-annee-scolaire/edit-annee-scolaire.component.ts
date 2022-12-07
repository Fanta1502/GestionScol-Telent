import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AnneescolaireService } from 'src/app/services/anneescolaire/anneescolaire.service';

@Component({
  selector: 'app-edit-annee-scolaire',
  templateUrl: './edit-annee-scolaire.component.html',
  styleUrls: ['./edit-annee-scolaire.component.scss']
})
export class EditAnneeScolaireComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  data;
  constructor(private modalService: NgbModal,private anneescolaireService : AnneescolaireService) {}
  
  ngOnInit() {
    this.data = this.anneescolaireService.getData();
    this.editForm = new FormGroup({
      libele_annee_scolaire: new FormControl(this.data.libele_annee_scolaire, Validators.required),
      date_debut_annee_scolaire: new FormControl(moment(this.data.date_debut_annee_scolaire).format("YYYY-MM-DD"), Validators.required),
      date_fin_annee_scolaire: new FormControl(moment(this.data.date_fin_annee_scolaire).format("YYYY-MM-DD"), Validators.required),
    });  
  }
  get f() {
    return this.editForm.controls;
  }
  onSubmit(form: FormGroup) { 
    this.submitted = true;
    this.dateSup = false;
    let date_debut = moment(Date.now());
    let date_fin = moment(Date.now());
    if (date_fin.isAfter(date_debut)) {
      this.dateSup = true;
      return;
    }
    if (this.editForm.invalid) {
      return;
    }
    let anneescolaire = {
      id : this.data.id,
      libele_annee_scolaire: form.value.libele_annee_scolaire,
      date_debut_annee_scolaire: form.value.date_debut_annee_scolaire,
      date_fin_annee_scolaire: form.value.date_fin_annee_scolaire
    }
    this.anneescolaireService.edit(anneescolaire).subscribe(
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