import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AnneescolaireService } from 'src/app/services/anneescolaire/anneescolaire.service';

@Component({
  selector: 'app-add-annee-scolaire',
  templateUrl: './add-annee-scolaire.component.html',
  styleUrls: ['./add-annee-scolaire.component.scss']
})
export class AddAnneeScolaireComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  constructor(private modalService: NgbModal,private anneescolaireService : AnneescolaireService) {}
  
  ngOnInit() {
    this.addForm = new FormGroup({
      libele_annee_scolaire: new FormControl('', Validators.required),
      date_debut_annee_scolaire: new FormControl('', Validators.required),
      date_fin_annee_scolaire: new FormControl('', Validators.required),
    });  
  }
  get f() {
    return this.addForm.controls;
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
    if (this.addForm.invalid) {
      return;
    }
    let anneescolaire = {
      libele_annee_scolaire: form.value.libele_annee_scolaire,
      date_debut_annee_scolaire: form.value.date_debut_annee_scolaire,
      date_fin_annee_scolaire: form.value.date_fin_annee_scolaire
    }
    this.anneescolaireService.add(anneescolaire).subscribe(
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