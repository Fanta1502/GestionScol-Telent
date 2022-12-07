import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EleveService } from 'src/app/services/eleve/eleve.service';
import { EncaissementService } from 'src/app/services/encaissement/encaissement.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { MensualiteService } from 'src/app/services/mensualite/mensualite.service';
import { PrintService } from 'src/app/services/print/print.service';
import { DownloadComponent } from '../gestion-eleve/download/download.component';
import { AddMensualiteComponent } from './add-mensualite/add-mensualite.component';
import { EditMensualiteComponent } from './edit-mensualite/edit-mensualite.component';

@Component({
  selector: 'app-mensualite',
  templateUrl: './mensualite.component.html',
  styleUrls: ['./mensualite.component.scss']
})
export class MensualiteComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  mensualites: any;
  collectionSize;
  pageSize = 5;
  page = 1;
  currentEleve;
  noPrint = true;
  etablissement;
  @ViewChild('data') pdfData: ElementRef;
  constructor(private modalService: NgbModal,private etablissementService : EtablissementService,private printService : PrintService, private encaissementService: EncaissementService, private mensualiteService: MensualiteService, private eleveService: EleveService) { }
  onAdd() {
    const modal = this.modalService.open(AddMensualiteComponent);
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  print() {
    this.noPrint = false;
    this.etablissementService.all({
      size: this.pageSize,
      page: this.page
    }).subscribe(
      value => {
        this.etablissement = value.content[0];
        const pdfTable = this.pdfData.nativeElement;
        this.printService.printText("Êtes-vous sûr de vouloir imprimer la liste des mensulités de l'élève " + this.currentEleve.nom +" " + this.currentEleve.prenom)
        let data = "";
          data = '<header><span  style="float: left;"">'+this.etablissement.nom+'</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style="float: right;">'+ moment(Date.now()).format("DD/MM/yyyy") +'</span></header><hr><body><br><h2>La liste des mensualités de l\'élève '+ this.currentEleve.nom + ' ' + this.currentEleve.prenom +' </h2><br>' + pdfTable.innerHTML +'</body>';
        this.printService.printData(data);
        this.modalService.open(DownloadComponent);
        this.noPrint = true;
      }
    )
  }
  onEdit(event) {
    this.mensualiteService.data(event);
    this.encaissementService.find("Paiement de mensualité de " + this.currentEleve.nom + " " + this.currentEleve.prenom,moment(event.date_paiement).format("YYYY-MM-DD")).subscribe(
      val => {
        this.encaissementService.data(val);
        const modal = this.modalService.open(EditMensualiteComponent);
        modal.result.then(() => { console.log('When user closes'); }, () => {
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
    if (confirm("Voulez-vous réelement supprimer cette mensualité ?")) {
      this.mensualiteService.remove(event.id).subscribe(
        () => {
          this.loadData(
            {
              size: this.pageSize,
              page: this.page
            });
        }
      );
    }
  }
  loadData(request) {
    this.mensualiteService.all(request, this.currentEleve.id).subscribe(
      res => {
        this.mensualites = res.content;
        this.collectionSize = res.totalCount;
        this.customerList = res.content;
      }
    )

  }
  ngOnInit(): void {
    this.currentEleve = this.eleveService.getData();
    this.page = 0;
    this.loadData(
      {
        size: this.pageSize,
        page: this.page
      });
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
    this.mensualites = this.filteredCustomerList;
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