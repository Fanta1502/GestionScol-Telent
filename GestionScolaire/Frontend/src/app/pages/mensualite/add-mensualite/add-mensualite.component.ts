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
  selector: 'app-add-mensualite',
  templateUrl: './add-mensualite.component.html',
  styleUrls: ['./add-mensualite.component.scss']
})
export class AddMensualiteComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  currentEleve;
  periodes;
  constructor(private modalService: NgbModal,private encaissementService : EncaissementService,private mensualiteService : MensualiteService,private eleveService : EleveService,private periodeService : PeriodeService) { }

  ngOnInit() {
    this.periodeService.allWhitoutPagination().subscribe(
      data =>
      {
        this.periodes = data;
      }
    )
    this.addForm = new FormGroup({
      mode_paiement: new FormControl('', Validators.required),
      montant_paye: new FormControl('', Validators.required),
      nom_prenom_payeur: new FormControl('', Validators.required),
      periode: new FormControl('', Validators.required),
    });  
  }
  get f() {
    return this.addForm.controls;
  }
  onSubmit(form: FormGroup) { 
    this.submitted = true;
    this.dateSup = false;
    if (this.addForm.invalid) {
      return;
    }
    let period ={
      id : form.value.periode
    }
    let date = moment(Date.now());
    this.currentEleve = this.eleveService.getData();
    let mensualite = {
      mode_paiement: form.value.mode_paiement,
      date_paiement: date,
      nom_prenom_payeur: form.value.nom_prenom_payeur,
      montant_paye: form.value.montant_paye,
      eleve : this.currentEleve,
      periode : period
    }
    this.mensualiteService.add(mensualite).subscribe(
      res => {
        this.modalService.dismissAll();
        const modal = this.modalService.open(MensualiteComponent, { size: 'lg' });
      }
    )    
    this.encaissementService.add({
      libelle: "Paiement de mensualité de " + this.currentEleve.nom + " " + this.currentEleve.prenom,
      montant: mensualite.montant_paye,
      mode_paiement : mensualite.mode_paiement,
      date : mensualite.date_paiement
    }).subscribe()
  }
  close()
  {
    this.modalService.dismissAll();
    const modal = this.modalService.open(MensualiteComponent, { size: 'lg' });
  }
}