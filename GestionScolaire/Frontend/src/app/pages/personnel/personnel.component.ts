import { Component, OnInit,ViewChild,ElementRef,  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { EditPersonnelComponent } from './edit-personnel/edit-personnel.component';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PayementSalaireComponent } from '../payement-salaire/payement-salaire.component';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { DetailPerComponent } from './detail-per/detail-per.component';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';
import { PrintService } from 'src/app/services/print/print.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { DownloadComponent } from '../gestion-eleve/download/download.component';
import * as moment from 'moment';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  personnels: any;
  collectionSize;
  pageSize = 4;
  page = 0;
  isEconome = false;
  isSecretaire = false;
  noPrint = true;
  etablissement;
  val;
  nb;
  @ViewChild('data') pdfData: ElementRef;
  constructor( private printService: PrintService,private etablissementService : EtablissementService,private authService : AuthService,private salaireService : SalaireService,private modalService: NgbModal, private personnelService: PersonnelService) { }
  onAdd() {
    const modal = this.modalService.open(AddPersonnelComponent, { size: 'lg' });
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
        this.printService.printText("Êtes-vous sûr de vouloir imprimer la liste des personnels ?");
        let data = "";
          data = '<header><span  style="float: left;"">'+this.etablissement.nom+'</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style="float: right;">'+ moment(Date.now()).format("DD/MM/yyyy") +'</span></header><hr><body><br><h2>La liste de tous les personnels</h2><br>' + pdfTable.innerHTML +'</body>';
        this.printService.printData(data);
        this.modalService.open(DownloadComponent);
        this.noPrint = true;
      }
    )
  }
  onEdit(event) {
    this.personnelService.data(event);
    const modal = this.modalService.open(EditPersonnelComponent, { size: 'lg' });
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
      this.personnelService.remove(event.id).subscribe(
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
  detail(event) {
    this.personnelService.data(event);
    const modal = this.modalService.open(DetailPerComponent);
  }
  Salaire(event){
    this.salaireService.setType("personnel")
    this.personnelService.data(event);
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
    this.personnelService.allWhitoutPagination().subscribe(
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
    this.personnelService.all(request).subscribe(
      res => {
        this.personnels = res.content;
        this.val = res.content;
        this.collectionSize = res.totalCount;
        this.nb = res.totalCount;
      }
    )
  }
  public onFilterChange(): void {
    this.collectionSize =0;
    this.filteredCustomerList = [];
    if (!this.filterText || this.filterText.length === 0) {
      this.personnels = this.val;
      this.collectionSize = this.nb;
      return;
    }
    this.customerList.filter(x => {
      if (x.nom.toString().toUpperCase().includes(this.filterText.toUpperCase())) {
        this.collectionSize ++;
        this.filteredCustomerList =
          [
            ...this.filteredCustomerList,
            x
          ];
      }
    });
    this.personnels = this.filteredCustomerList;
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    const personnel = {
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
      fonction: null,
      statut: null,
      type_contrat: null,
      role: null,
      duree_contrat: null,
    };
    if (confirm("Voulez-vous réellement importer cet fichier ?"))
      this.fileReader(this.file, personnel);
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
        fonction: worksheet[i].FONCTION,
        statut: worksheet[i].STATUT,
        type_contrat: worksheet[i].TYPE_CONTRAT,
        role: worksheet[i].ROLE,
        duree_contrat: worksheet[i].DUREE_CONTRAT,
      };
      this.personnelService.add(updatedLine).subscribe();
      this.personnels = { ...this.personnels, ...updatedLine };
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