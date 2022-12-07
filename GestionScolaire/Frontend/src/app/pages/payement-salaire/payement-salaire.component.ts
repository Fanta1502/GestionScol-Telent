import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DepenseService } from 'src/app/services/depense/depense.service';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { AddPayementSalaireComponent } from './add-payement-salaire/add-payement-salaire.component';
import { EditPayementSalaireComponent } from './edit-payement-salaire/edit-payement-salaire.component';

@Component({
  selector: 'app-payement-salaire',
  templateUrl: './payement-salaire.component.html',
  styleUrls: ['./payement-salaire.component.scss']
})
export class PayementSalaireComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  lesSalaires: any;
  collectionSize;
  pageSize = 4;
  page = 0;
  valeur: any;
  classes;
  type;
  constructor(private modalService: NgbModal, private depenseService: DepenseService, private salaireService: SalaireService, private personnelService: PersonnelService, private enseignantService: EnseignantService) {
  }
  onAdd() {
    this.salaireService.data(this.valeur);
    const modal = this.modalService.open(AddPayementSalaireComponent);
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  onEdit(event) {
    this.salaireService.data(event);
    if (event.enseignant)
      this.depenseService.find("Paiement de " + event.enseignant.nom + " " + event.enseignant.prenom, moment(event.date_paiement).format("YYYY-MM-DD")).subscribe(
        val =>{
          this.depenseService.data(val);
          const modal = this.modalService.open(EditPayementSalaireComponent);
          modal.result.then(() => { }, () => {
            this.page = 0;
            this.loadData(
              {
                size: this.pageSize,
                page: this.page
              });
          })
        }
      )
    else
      this.depenseService.find("Paiement de " + event.personnel.nom + " " + event.personnel.prenom, moment(event.date_paiement).format("YYYY-MM-DD")).subscribe(
        val =>{
          this.depenseService.data(val);
          const modal = this.modalService.open(EditPayementSalaireComponent);
          modal.result.then(() => { }, () => {
            this.page = 0;
            this.loadData(
              {
                size: this.pageSize,
                page: this.page
              });
          })
        }
      )
  }
  onDelete(event) {
    if (confirm("Voulez-vous réelement supprimer cet paiement ?")) {
      if (this.salaireService.getType() == "personnel") {
        this.salaireService.removePersonnel(event.id).subscribe(
          () => {
            this.depenseService.find("Paiement de " + event.enseignant.nom + " " + event.enseignant.prenom, moment(event.date_paiement).format("YYYY-MM-DD")).subscribe(
              val =>{
                this.depenseService.remove(val.id)
              })
            this.loadData(
              {
                size: this.pageSize,
                page: this.page
              });
          }
        );
      }
      else if (this.salaireService.getType() == "enseignant") {
        this.salaireService.removeEnseigant(event.id).subscribe(
          () => {
            this.depenseService.find("Paiement de " + event.personnel.nom + " " + event.personnel.prenom, moment(event.date_paiement).format("YYYY-MM-DD")).subscribe(
              val =>{
                this.depenseService.remove(val.id)
              })
            this.loadData(
              {
                size: this.pageSize,
                page: this.page
              });
          }
        );
      }
    }
  }
  ngOnInit(): void {
    this.type = this.salaireService.getType();
    if (this.salaireService.getType() == 'personnel')
    this.valeur = this.personnelService.getData();
  else
    this.valeur = this.enseignantService.getData();
    this.loadData({ size: this.pageSize, page: this.page });
  }
  loadData(request) {
    this.lesSalaires = [];
    this.page = 0;
    if (this.salaireService.getType() == "personnel") {
      this.salaireService.allByPersonnel({ size: this.pageSize, page: this.page }, this.valeur.id).subscribe(
        res => {
          this.lesSalaires = res.content;
          this.collectionSize = res.totalCount;
          this.customerList = res.content;
          return
        }
      )
    }
    else {
      this.salaireService.allByEnseignant({ size: this.pageSize, page: this.page }, this.valeur.id).subscribe(
        res => {
          this.lesSalaires = res.content;
          this.collectionSize = res.totalCount;
          this.customerList = res.content;
          return
        }
      )
    }
  }
  public onFilterChange(): void {
    this.filteredCustomerList = [];
    if (!this.filterText || this.filterText.length === 0) {
      this.filteredCustomerList = this.customerList;
      return;
    }
    this.customerList.filter(x => {
      if (x.lastName.toString().includes(this.filterText)) {
        this.filteredCustomerList =
          [
            ...this.filteredCustomerList,
            x
          ];
      }
    });
    this.lesSalaires = this.filteredCustomerList;
  }
  pageChange(event) {
    this.page = event;
    this.loadData(
      {
        size: this.pageSize,
        page: this.page - 1
      });
  }
  close() {
    this.modalService.dismissAll();
  }
}