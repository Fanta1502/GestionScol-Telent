import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepenseService } from 'src/app/services/depense/depense.service';
import { AddDepenseComponent } from './add-depense/add-depense.component';
import { EditDepenseComponent } from './edit-depense/edit-depense.component';
import * as XLSX from 'xlsx';
import { DetailDepComponent } from './detail-dep/detail-dep.component';
import { PrintService } from 'src/app/services/print/print.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { DownloadComponent } from '../gestion-eleve/download/download.component';
import * as moment from 'moment';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  depenses: any;
  collectionSize;
  pageSize = 5;
  page = 1;
  noPrint = true;
  @ViewChild('data') pdfData: ElementRef;
  etablissement;
  val;
  nb;
  constructor(private modalService: NgbModal, private depenseService: DepenseService, private printService: PrintService,private etablissementService: EtablissementService) { }
  onAdd() {
    const modal = this.modalService.open(AddDepenseComponent, { size: 'lg' });
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
        this.printService.printText("Êtes-vous sûr de vouloir imprimer la liste des depenses ?");
        let data = "";
          data = '<header><span  style="float: left;"">'+this.etablissement.nom+'</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style="float: right;">'+ moment(Date.now()).format("DD/MM/yyyy") +'</span></header><hr><body><br><h2>La liste de tous les depenses</h2><br>' + pdfTable.innerHTML +'</body>';
        this.printService.printData(data);
        this.modalService.open(DownloadComponent);
        this.noPrint = true;
      }
    )
  }
  detail(event) {
    this.depenseService.data(event);
    const modal = this.modalService.open(DetailDepComponent);
  }
  onEdit(depense) {
    this.depenseService.data(depense);
    const modal = this.modalService.open(EditDepenseComponent, { size: 'lg' });
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  onDelete(event) {
    if (confirm("Voulez-vous réelement supprimer cette depense ?")) {
      this.depenseService.remove(event.id).subscribe(
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
    this.depenseService.all(request).subscribe(
      res => {
        this.depenses = res.content;
        this.collectionSize = res.totalCount;
        this.nb = res.totalCount;
        this.val = res.content;
      }
    )

  }
  ngOnInit(): void {
    this.page = 0;
    this.depenseService.allWithOutPagination().subscribe(
      data =>{
        this.customerList = data;
      }
    )
    this.loadData(
      {
        size: this.pageSize,
        page: this.page
      });
  }
  public onFilterChange(): void {
    this.collectionSize = 0;
    this.filteredCustomerList = [];
    if (!this.filterText || this.filterText.length === 0) {
      this.depenses = this.val;
      this.collectionSize = this.nb; 
      return;
    }
    else
    {
      this.customerList.filter(x => {
        if (x.libelle.toString().toUpperCase().includes(this.filterText.toUpperCase())) {
          this.collectionSize ++;
          this.filteredCustomerList =
            [
              ...this.filteredCustomerList,
              x
            ];
        }
      });
      this.depenses = this.filteredCustomerList;
      return;
    }
  }
  pageChange(event) {
    this.page = event;
    this.loadData(
      {
        size: this.pageSize,
        page: this.page - 1
      });
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    const depense = {
      libelle: null,
      montant: null,
      mode_paiement: null,
      fournisseur: null,
      responsable: null,
      motif: null,
      date: null,
      type: null,
    };
    if (confirm("Voulez-vous réellement importer cet fichier ?"))
      this.fileReader(this.file, depense);
    return;
  }
  private fileReader(file: any, line: any) {
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();

      for (let i = 0; i !== data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary', cellDates: true });
      const first_sheet_name = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[first_sheet_name];
      this.worksheet = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.matchingCell(this.worksheet, this.tab, line);
    };
    fileReader.readAsArrayBuffer(file);
  }
  private matchingCell(worksheet: any, monTab: any, line: any) {
    // monTab.value = [];
    for (let i = 0; i < worksheet.length; i++) {
      // const worksheetLine = worksheet[i];
      let updatedLine = {
        libelle: worksheet[i].LIBELLE,
        montant: worksheet[i].MONTANT,
        mode_paiement: worksheet[i].MODE_PAIEMENT,
        fournisseur: worksheet[i].FOURNISSEUR,
        responsable: worksheet[i].RESPONSABLE,
        motif: worksheet[i].MOTIF,
        date: worksheet[i].DATE,
        type: worksheet[i].TYPE,
      };
      this.depenseService.add(updatedLine).subscribe();
      this.depenses = { ...this.depenses, ...updatedLine };
      //monTab.value.push(line);
    }
    window.location.reload();
  }
}