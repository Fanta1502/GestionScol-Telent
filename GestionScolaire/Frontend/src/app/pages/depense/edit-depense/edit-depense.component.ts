import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DepenseService } from 'src/app/services/depense/depense.service';

@Component({
  selector: 'app-edit-depense',
  templateUrl: './edit-depense.component.html',
  styleUrls: ['./edit-depense.component.scss']
})
export class EditDepenseComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  currentAnneeScolaire;
  data : any;
  constructor(private modalService: NgbModal,private depenseService : DepenseService) {}
  
  ngOnInit() {
    this.data = this.depenseService.getData();
    this.editForm = new FormGroup({
      libelle: new FormControl(this.data.libelle, Validators.required),
      montant: new FormControl(this.data.montant, Validators.required),
      mode_paiement: new FormControl(this.data.mode_paiement, Validators.required),
      fournisseur: new FormControl(this.data.fournisseur, Validators.required),
      responsable: new FormControl(this.data.responsable, Validators.required),
      motif: new FormControl(this.data.motif, Validators.required),
      date: new FormControl(moment(this.data.date).format("YYYY-MM-DD"), Validators.required),
      type: new FormControl(this.data.type, Validators.required),
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
    let date = moment(Date.now());
    if (date.isBefore(moment(form.value.date))) {
      this.dateSup = true;
      return;
    }
    let depense = {
      id : this.depenseService.getData().id,
      libelle:  form.value.libelle,
      montant:  form.value.montant,
      mode_paiement:  form.value.mode_paiement,
      fournisseur:  form.value.fournisseur,
      responsable:  form.value.responsable,
      motif:  form.value.motif,
      date:  form.value.date,
      type:  form.value.type,
    }
    this.depenseService.edit(depense).subscribe(
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