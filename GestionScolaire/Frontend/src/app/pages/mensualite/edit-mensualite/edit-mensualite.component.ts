import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EleveService } from 'src/app/services/eleve/eleve.service';
import { EncaissementService } from 'src/app/services/encaissement/encaissement.service';
import { MensualiteService } from 'src/app/services/mensualite/mensualite.service';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { MensualiteComponent } from '../mensualite.component';

@Component({
  selector: 'app-edit-mensualite',
  templateUrl: './edit-mensualite.component.html',
  styleUrls: ['./edit-mensualite.component.scss']
})
export class EditMensualiteComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  currentmensualite;
  encaissement;
  constructor(private modalService: NgbModal,private encaissementSErvice : EncaissementService,private mensualiteService : MensualiteService,private eleveService : EleveService) { }
  ngOnInit() {
    this.encaissement = this.encaissementSErvice.getData();
    this.currentmensualite = this.mensualiteService.getData();
    this.editForm = new FormGroup({
      mode_paiement: new FormControl(this.currentmensualite.mode_paiement, Validators.required),
      montant_paye: new FormControl(this.currentmensualite.montant_paye, Validators.required),
      nom_prenom_payeur: new FormControl(this.currentmensualite.nom_prenom_payeur, Validators.required),
    });  
  }
  get f() {
    return this.editForm.controls;
  }
  onSubmit(form: FormGroup) { 
    this.submitted = true;
    this.dateSup = false;
    if (this.editForm.invalid) {
      return;
    }
    let mensualite = {
      id : this.currentmensualite.id,
      mode_paiement: form.value.mode_paiement,
      date_paiement: this.currentmensualite.date_paiement,
      nom_prenom_payeur: form.value.nom_prenom_payeur,
      montant_paye: form.value.montant_paye,
      eleve : this.currentmensualite.eleve,
      periode : this.currentmensualite.periode
    }
    this.mensualiteService.edit(mensualite).subscribe(
      res => {
        this.modalService.dismissAll();
        const modal = this.modalService.open(MensualiteComponent, { size: 'lg' });
      }
    )
    this.encaissementSErvice.edit(
      {
        id: this.encaissement.id,
        libelle: this.encaissement.libelle,
        montant: mensualite.montant_paye,
        mode_paiement: mensualite.mode_paiement,
        date: this.encaissement.date
      }
    ).subscribe()
  }
  close()
  {
    this.modalService.dismissAll();
    const modal = this.modalService.open(MensualiteComponent, { size: 'lg' });
  }
}