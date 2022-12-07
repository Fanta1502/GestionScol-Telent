import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AnneescolaireService } from 'src/app/services/anneescolaire/anneescolaire.service';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { PeriodeComponent } from '../periode.component';

@Component({
  selector: 'app-add-periode',
  templateUrl: './add-periode.component.html',
  styleUrls: ['./add-periode.component.scss']
})
export class AddPeriodeComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  currentAnneeScolaire;
  constructor(private modalService: NgbModal,private periodeService : PeriodeService,private anneeScolaireService : AnneescolaireService) {}
  
  ngOnInit() {
    this.addForm = new FormGroup({
      libelle_periode: new FormControl('', Validators.required),
      date_debut_periode: new FormControl('', Validators.required),
      date_fin_periode: new FormControl('', Validators.required),
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
    this.currentAnneeScolaire = this.anneeScolaireService.getCurrentData();
    let etablissement = {
      libelle_periode: form.value.libelle_periode,
      date_debut_periode: form.value.date_debut_periode,
      date_fin_periode: form.value.date_fin_periode,
      anneeScolaire : this.currentAnneeScolaire
    }
    this.periodeService.add(etablissement).subscribe(
      res => {
        this.modalService.dismissAll();
        const modal = this.modalService.open(PeriodeComponent, { size: 'lg' });
      }
    )
  }
  close()
  {
    this.modalService.dismissAll();
    const modal = this.modalService.open(PeriodeComponent, { size: 'lg' });
  }
}