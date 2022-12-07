import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEnseignantComponent } from './add-enseignant/add-enseignant.component';
import * as XLSX from 'xlsx';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';
import { EditEnseignantComponent } from './edit-enseignant/edit-enseignant.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PayementSalaireComponent } from '../payement-salaire/payement-salaire.component';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { DetailEnsComponent } from './detail-ens/detail-ens.component';
import { PrintService } from 'src/app/services/print/print.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { DownloadComponent } from '../gestion-eleve/download/download.component';
import * as moment from 'moment';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  enseignants: any;
  collectionSize;
  pageSize = 4;
  page = 0;
  isEconome = false;
  isSecretaire = false;
  noPrint = true;
  val;
  nb;
  @ViewChild('data') pdfData: ElementRef;
  etablissement;
  constructor(private authService : AuthService, private printService: PrintService,private etablissementService: EtablissementService, private salaireService : SalaireService,private modalService: NgbModal,private enseignantService : EnseignantService) { }
  onAdd() {
    const modal = this.modalService.open(AddEnseignantComponent, { size: 'lg' });
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
    this.enseignantService.data(event);
    const modal = this.modalService.open(EditEnseignantComponent, { size: 'lg' });
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
    if (confirm("Voulez-vous réelement supprimer cet enseignant ?")) {
      this.enseignantService.remove(event.id).subscribe(
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
  print() {
    this.noPrint = false;
    this.etablissementService.all({
      size: this.pageSize,
      page: this.page
    }).subscribe(
      value => {
        this.etablissement = value.content[0];
        const pdfTable = this.pdfData.nativeElement;
        this.printService.printText("Êtes-vous sûr de vouloir imprimer la liste des enseignants ?");
        let data = "";
          data = '<header><span  style="float: left;"">'+this.etablissement.nom+'</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style="float: right;">'+ moment(Date.now()).format("DD/MM/yyyy") +'</span></header><hr><body><br><h2>La liste de tous les enseignants</h2><br>' + pdfTable.innerHTML +'</body>';
        this.printService.printData(data);
        this.modalService.open(DownloadComponent);
        this.noPrint = true;
      }
    )
  }
  detail(event) {
    this.enseignantService.data(event);
    const modal = this.modalService.open(DetailEnsComponent);
  }
  Salaire(event){
    this.salaireService.setType("enseignant")
    this.enseignantService.data(event);
    const modal = this.modalService.open(PayementSalaireComponent, { size: 'lg' });
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  ngOnInit(): void {
    this.isEconome = this.authService.isEconome();
    this.isSecretaire = this.authService.isSecretaire();
    this.enseignantService.allWhitoutPagination().subscribe(
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
  loadData(request) {
    this.enseignantService.all(request).subscribe(
      res => {
        this.enseignants = res.content;
        this.collectionSize = res.totalCount;
        this.nb = res.totalCount;
        this.val = res.content;
      }
    )
  }
  public onFilterChange(): void {
    this.filteredCustomerList = [];
    this.collectionSize = 0;
    if (!this.filterText || this.filterText.length === 0) {
      this.enseignants = this.val;
      this.collectionSize = this.nb;
      return;
    }
    this.customerList.filter(x => {
      if (x.nom.toString().toUpperCase().includes(this.filterText.toUpperCase())) {
        this.collectionSize++;
        this.filteredCustomerList =
          [
            ...this.filteredCustomerList,
            x
          ];
      }
    });
    this.enseignants = this.filteredCustomerList;
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    const classe = {
      matricule: null,
      nom: null,
      prenom: null,
      genre: null,
      date_naissance: null,
      lieu_naissance: null,
      adresse: null,
      telephone: null,
      nationalite: null,
      date_recrutement: null,
      specialite: null,
      dernier_diplome: null,
      etat_contractuel: null
    };
    if (confirm("Voulez-vous réellement importer cet fichier ?"))
      this.fileReader(this.file, classe);
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
        matricule: worksheet[i].MATRICULE,
        nom: worksheet[i].NOM,
        prenom: worksheet[i].PRENOM,
        genre: worksheet[i].GENRE,
        date_naissance: worksheet[i].DATE_NAISSANCE,
        lieu_naissance: worksheet[i].LIEU_NAISSANCE,
        adresse: worksheet[i].ADRESSE,
        telephone: worksheet[i].TELEPHONE,
        nationalite: worksheet[i].NATIONALITE,
        date_recrutement: worksheet[i].DATE_RECRUTEMENT,
        specialite: worksheet[i].SPECIALITE,
        dernier_diplome: worksheet[i].DERNIER_DIPLOME,
        etat_contractuel: worksheet[i].ETAT_CONTRACTUEL
      };
      this.enseignantService.add(updatedLine).subscribe();
      this.enseignants = { ...this.enseignants, ...updatedLine };
      //monTab.value.push(line);
    }
    window.location.reload();
  }
  pageChange(event) {
    this.page = event;
    this.loadData(
      {
        size: this.pageSize,
        page: this.page - 1
      });
  }
}
