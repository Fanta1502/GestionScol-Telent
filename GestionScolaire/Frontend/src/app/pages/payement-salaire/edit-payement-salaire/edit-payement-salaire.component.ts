import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayementSalaireComponent } from '../payement-salaire.component';
import { DepenseService } from 'src/app/services/depense/depense.service';

@Component({
  selector: 'app-edit-payement-salaire',
  templateUrl: './edit-payement-salaire.component.html',
  styleUrls: ['./edit-payement-salaire.component.scss']
})
export class EditPayementSalaireComponent implements OnInit {
  editForm: FormGroup; ""
  submitted = false;
  dateSup = false;
  type;
  personnels;
  enseignants;
  periodes;
  data;
  depense;
  constructor(private modalService: NgbModal, private salaireService: SalaireService, private depenseService: DepenseService, private personnelService: PersonnelService, private enseignantService: EnseignantService, private periodeService: PeriodeService) { }

  ngOnInit() {
    this.depense = this.depenseService.getData()
    this.type = this.salaireService.getType();
    let data = this.salaireService.getData();
    this.periodeService.allWhitoutPagination().subscribe(
      data => {
        this.periodes = data;
      }
    )
    if (this.type === "enseignant") {
      this.editForm = new FormGroup({
        montant: new FormControl(data.montant, Validators.required),
        date_paiement: new FormControl(moment(data.date_paiement).format("YYYY-MM-DD"), Validators.required),
        mode_paiement: new FormControl(data.mode_paiement, Validators.required),
        nombre_heure_travaille: new FormControl(data.nombre_heure_travaille, Validators.required),
        details: new FormControl(data.details),
        periode: new FormControl(data.periode, Validators.required),
      });
    }
    else {
      this.editForm = new FormGroup({
        montant: new FormControl(data.montant, Validators.required),
        date_paiement: new FormControl(moment(data.date_paiement).format("YYYY-MM-DD"), Validators.required),
        mode_paiement: new FormControl(data.mode_paiement, Validators.required),
        nombre_heure_travaille: new FormControl(data.nombre_heure_travaille, Validators.required),
        details: new FormControl(data.details),
        periode: new FormControl(data.periode, Validators.required),
      });
    }
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
    let date = moment(Date.now());
    if (date.isBefore(moment(form.value.date_paiement))) {
      this.dateSup = true;
      return;
    }
    let periode = {
      id: this.salaireService.getData().periode.id
    }
    if (this.type === "enseignant") {
      let salaire = {
        id: this.salaireService.getData().id,
        montant: form.value.montant,
        date_paiement: form.value.date_paiement,
        mode_paiement: form.value.mode_paiement,
        nombre_heure_travaille: form.value.nombre_heure_travaille,
        details: form.value.details,
        periode: periode,
        enseignant: this.salaireService.getData().enseignant
      }
      this.salaireService.editEnseigant(salaire).subscribe(
        res => {
          this.modalService.dismissAll();
          const modal = this.modalService.open(PayementSalaireComponent, { size: 'lg' });
        }
      )
      this.depenseService.edit(
        {
          id: this.depense.id,
          libelle: this.depense.libelle,
          montant: salaire.montant,
          mode_paiement: salaire.mode_paiement,
          fournisseur: this.depense.fournisseur,
          responsable: this.depense.responsable,
          motif: this.depense.motif,
          date: salaire.date_paiement,
          type: this.depense.type,
        }
      ).subscribe()
    }
    else if (this.type === "personnel") {
      let salaire = {
        id: this.salaireService.getData().id,
        montant: form.value.montant,
        date_paiement: form.value.date_paiement,
        mode_paiement: form.value.mode_paiement,
        nombre_heure_travaille: form.value.nombre_heure_travaille,
        details: form.value.details,
        periode: periode,
        personnel: this.salaireService.getData().personnel
      }
      this.salaireService.editPersonnel(salaire).subscribe(
        res => {
          this.modalService.dismissAll();
          const modal = this.modalService.open(PayementSalaireComponent, { size: 'lg' });
        }
      )
      this.depenseService.edit(
        {
          id: this.depense.id,
          libelle: this.depense.libelle,
          montant: salaire.montant,
          mode_paiement: salaire.mode_paiement,
          fournisseur: this.depense.fournisseur,
          responsable: this.depense.responsable,
          motif: this.depense.motif,
          date: salaire.date_paiement,
          type: this.depense.type,
        }
      ).subscribe()
    }
  }
  close() {
    this.modalService.dismissAll();
    const modal = this.modalService.open(PayementSalaireComponent, { size: 'lg' });
  }
}