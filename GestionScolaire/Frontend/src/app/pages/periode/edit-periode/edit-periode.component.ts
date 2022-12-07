import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AnneescolaireService } from 'src/app/services/anneescolaire/anneescolaire.service';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { PeriodeComponent } from '../periode.component';

@Component({
  selector: 'app-edit-periode',
  templateUrl: './edit-periode.component.html',
  styleUrls: ['./edit-periode.component.scss']
})
export class EditPeriodeComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  data;
  currentAnneeScolaire;
  constructor(private modalService: NgbModal,private periodeService : PeriodeService,private anneeScolaireService : AnneescolaireService) {}
  
  ngOnInit() {
    this.data = this.periodeService.getData();
    this.editForm = new FormGroup({
      libelle_periode: new FormControl(this.data.libelle_periode, Validators.required),
      date_debut_periode: new FormControl(moment(this.data.date_debut_periode).format("YYYY-MM-DD"), Validators.required),
      date_fin_periode: new FormControl(moment(this.data.date_fin_periode).format("YYYY-MM-DD"), Validators.required),
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
    this.currentAnneeScolaire = this.anneeScolaireService.getCurrentData();
    let etablissement = {
      id : this.data.id,
      libelle_periode: form.value.libelle_periode,
      date_debut_periode: form.value.date_debut_periode,
      date_fin_periode: form.value.date_fin_periode,
      anneeScolaire : this.currentAnneeScolaire
    }
    this.periodeService.edit(etablissement).subscribe(
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
