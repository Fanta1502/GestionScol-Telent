import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DepenseService } from 'src/app/services/depense/depense.service';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.scss']
})
export class AddDepenseComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  currentAnneeScolaire;
  constructor(private modalService: NgbModal,private depenseService : DepenseService) {}
  
  ngOnInit() {
    this.addForm = new FormGroup({
      libelle: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required),
      mode_paiement: new FormControl('', Validators.required),
      fournisseur: new FormControl('', Validators.required),
      responsable: new FormControl('', Validators.required),
      motif: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
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
    let date = moment(Date.now());
    if (date.isBefore(moment(form.value.date))) {
      this.dateSup = true;
      return;
    }
    let depense = {
      libelle:  form.value.libelle,
      montant:  form.value.montant,
      mode_paiement:  form.value.mode_paiement,
      fournisseur:  form.value.fournisseur,
      responsable:  form.value.responsable,
      motif:  form.value.motif,
      date:  form.value.date,
      type:  form.value.type,
    }
    this.depenseService.add(depense).subscribe(
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