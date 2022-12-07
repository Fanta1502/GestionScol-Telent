import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AnneescolaireService } from 'src/app/services/anneescolaire/anneescolaire.service';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { EleveService } from 'src/app/services/eleve/eleve.service';
import { EncaissementService } from 'src/app/services/encaissement/encaissement.service';
import { InscriptionService } from 'src/app/services/inscription/inscription.service';

@Component({
  selector: 'app-add-eleve',
  templateUrl: './add-eleve.component.html',
  styleUrls: ['./add-eleve.component.scss']
})
export class AddEleveComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  classes;
  anneeScolaires;
  constructor(private modalService: NgbModal, private encaissementService: EncaissementService, private classeService: ClasseService, private anneScolaireService: AnneescolaireService, private inscriptionService: InscriptionService, private eleveService: EleveService) { }
  ngOnInit(): void {
    this.classeService.allWhitoutPagination().subscribe(
      (res) => {
        this.classes = res;
      }
    );
    this.anneScolaireService.allWhitoutPagination().subscribe(
      (res) => {
        this.anneeScolaires = res;
      }
    );
    this.addForm = new FormGroup({
      matricule: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      genre: new FormControl('masculin', Validators.required),
      date_naissance: new FormControl('', Validators.required),
      lieu_naissance: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      email_parent: new FormControl('', [Validators.required, Validators.email]),
      prenom_pere: new FormControl('', Validators.required),
      nom_prenom_mere: new FormControl('', Validators.required),
      profession_pere: new FormControl('', Validators.required),
      profession_mere: new FormControl('', Validators.required),
      handicap_particuliers: new FormControl(''),
      maladies_particulieres: new FormControl(''),
      date_inscription: new FormControl('', Validators.required),
      montant_inscription: new FormControl('', Validators.required),
      mode_paiement: new FormControl('', Validators.required),
      nom_prenom_payeur: new FormControl('', Validators.required),
      classe: new FormControl('', Validators.required),
      anneeScolaire: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.addForm.controls;
  }
  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.dateSup = false;
    let date = moment(Date.now());
    let date_naissance = moment(form.value.date_naissance);
    if (date_naissance.isAfter(date)) {
      this.dateSup = true;
      return;
    }
    if (this.addForm.invalid) {
      return;
    }
    let eleve = {
      matricule: form.value.matricule,
      nom: form.value.nom,
      prenom: form.value.prenom,
      genre: form.value.genre,
      date_naissance: form.value.date_naissance,
      lieu_naissance: form.value.lieu_naissance,
      adresse: form.value.adresse,
      telephone: form.value.telephone,
      email_parent: form.value.email_parent,
      prenom_pere: form.value.prenom_pere,
      nom_prenom_mere: form.value.nom_prenom_mere,
      profession_pere: form.value.profession_pere,
      profession_mere: form.value.profession_mere,
      handicap_particuliers: form.value.handicap_particuliers,
      maladies_particulieres: form.value.maladies_particulieres,
    }
    let classe = {
      id: form.value.classe
    }
    let anneeScolaire = {
      id: form.value.anneeScolaire
    }
    let inscription = {
      date_inscription: form.value.date_inscription,
      montant_inscription: form.value.montant_inscription,
      mode_paiement: form.value.mode_paiement,
      nom_prenom_payeur: form.value.nom_prenom_payeur,
      classe: classe,
      anneeScolaire: anneeScolaire,
      eleve: eleve
    }
    this.inscriptionService.add(inscription).subscribe(
      res => {
        this.modalService.dismissAll();
      }
    )
    this.encaissementService.add({
      libelle: "Inscription de " + eleve.nom + " " + eleve.prenom,
      montant: inscription.montant_inscription,
      mode_paiement : inscription.mode_paiement,
      date : inscription.date_inscription
    }).subscribe()
  }
  close() {
    this.modalService.dismissAll();
  }
}
