import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DepenseService } from 'src/app/services/depense/depense.service';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { PayementSalaireComponent } from '../payement-salaire.component';

@Component({
  selector: 'app-add-payement-salaire',
  templateUrl: './add-payement-salaire.component.html',
  styleUrls: ['./add-payement-salaire.component.scss']
})
export class AddPayementSalaireComponent implements OnInit {
  addForm: FormGroup; ""
  submitted = false;
  dateSup = false;
  type;
  personnels;
  enseignants;
  periodes;
  data;
  constructor(private modalService: NgbModal,private depenseService : DepenseService, private salaireService: SalaireService, private personnelService: PersonnelService, private enseignantService: EnseignantService,private periodeService : PeriodeService) { }

  ngOnInit() {
    this.type = this.salaireService.getType();
    this.periodeService.allWhitoutPagination().subscribe(
      data =>
      {
        this.periodes = data;
      }
    )
    if (this.type === "enseignant") {
      this.addForm = new FormGroup({
        montant: new FormControl('', Validators.required),
        date_paiement: new FormControl('', Validators.required),
        mode_paiement: new FormControl('', Validators.required),
        nombre_heure_travaille: new FormControl('', Validators.required),
        details: new FormControl(''),
        periode: new FormControl('', Validators.required),
      });
    }
    else {
      this.addForm = new FormGroup({
        montant: new FormControl('', Validators.required),
        date_paiement: new FormControl('', Validators.required),
        mode_paiement: new FormControl('', Validators.required),
        nombre_heure_travaille: new FormControl('', Validators.required),
        details: new FormControl(''),
        periode: new FormControl('', Validators.required),
      });
    }
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
    let date = moment(Date.now());
    if (date.isBefore(moment(form.value.date_paiement))) {
      this.dateSup = true;
      return;
    }
    let periode = {
      id : form.value.periode
    }
    if (this.type === "enseignant") {
      let salaire = {
        montant: form.value.montant,
        date_paiement: form.value.date_paiement,
        date: form.value.date_paiement,
        mode_paiement: form.value.mode_paiement,
        nombre_heure_travaille: form.value.nombre_heure_travaille,
        details: form.value.details,
        periode: periode,
        enseignant: this.salaireService.getData()
      }
      this.salaireService.addEnseignant(salaire).subscribe(
        res => {
          this.modalService.dismissAll();
          const modal = this.modalService.open(PayementSalaireComponent, { size: 'lg' });
        }
      )
      this.depenseService.add({
        libelle:  "Paiement de " + salaire.enseignant.nom + " " + salaire.enseignant.prenom,
        montant:  salaire.montant,
        mode_paiement:  salaire.mode_paiement,
        fournisseur:  "L'econome",
        responsable:  "Le reponsable",
        motif:  "Paiement de salaire",
        date:  salaire.date_paiement,
        type:  "virement",
      }).subscribe()
    }
    else if (this.type === "personnel"){
      let salaire = {
        montant: form.value.montant,
        date_paiement: form.value.date_paiement,
        mode_paiement: form.value.mode_paiement,
        date: form.value.date_paiement,
        nombre_heure_travaille: form.value.nombre_heure_travaille,
        details: form.value.details,
        periode: periode,
        personnel:this.salaireService.getData()
      }
      this.salaireService.addPersonnel(salaire).subscribe(
        res => {
          this.modalService.dismissAll();
          const modal = this.modalService.open(PayementSalaireComponent, { size: 'lg' });
        }
      )
      this.depenseService.add({
        libelle:  "Paiement de " + salaire.personnel.nom + " " + salaire.personnel.prenom,
        montant:  salaire.montant,
        mode_paiement:  salaire.mode_paiement,
        fournisseur:  "L'econome",
        responsable:  "Le reponsable",
        motif:  "Paiement de salaire",
        date:  salaire.date_paiement,
        type:  "virement",
      }).subscribe()
    }
  }
  close() {
    this.modalService.dismissAll();
    const modal = this.modalService.open(PayementSalaireComponent, { size: 'lg' });
  }
}