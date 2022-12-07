import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEleveComponent } from './add-eleve/add-eleve.component';
import * as XLSX from 'xlsx';
import { EleveService } from 'src/app/services/eleve/eleve.service';
import { EditEleveComponent } from './edit-eleve/edit-eleve.component';
import { DownloadComponent } from './download/download.component';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MensualiteComponent } from '../mensualite/mensualite.component';
import { DetailComponent } from './detail/detail.component';
import { PrintService } from 'src/app/services/print/print.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import * as moment from 'moment';

@Component({
  selector: 'app-gestion-eleve',
  templateUrl: './gestion-eleve.component.html',
  styleUrls: ['./gestion-eleve.component.scss']
})
export class GestionEleveComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  change = "tous";
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  lesEleves: any;
  collectionSize;
  pageSize = 4;
  page = 0;
  classes;
  isEconome = false;
  etablissement;
  isSecretaire = false;
  noPrint = true;
  val;
  nb;
  @ViewChild('data') pdfData: ElementRef;
  constructor(private authService: AuthService, private etablissementService: EtablissementService, private printService: PrintService, private modalService: NgbModal, private classeService: ClasseService, private eleveService: EleveService, private router: Router) { }
  print() {
    this.noPrint = false;
    this.etablissementService.all({
      size: this.pageSize,
      page: this.page
    }).subscribe(
      value => {
        this.etablissement = value.content[0];
        const pdfTable = this.pdfData.nativeElement;
        this.printService.printText("Êtes-vous sûr de vouloir imprimer la liste des élèves ?")
        let data = "";
        if (this.change === "tous")
          data = '<header><span  style="float: left;"">'+this.etablissement.nom+'</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style="float: right;">'+ moment(Date.now()).format("DD/MM/yyyy") +'</span></header><hr><body><br><h2>La liste de tous les étudiants</h2><br>' + pdfTable.innerHTML +'</body>';
        else {
          this.classes.forEach(
            val => {
              if (val.id == this.change) {
                data = '<header><span  style="float: left;"">'+this.etablissement.nom+'</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  style="float: right;">'+ moment(Date.now()).format("DD/MM/yyyy") +'</span></header><hr><body><br><h2>La liste des étudiants de la ' + val.nom_classe + '</h2><br>' + pdfTable.innerHTML+'</body>';
              }
            }
          )
        }
        this.printService.printData(data);
        this.modalService.open(DownloadComponent);
        this.noPrint = true;
      }
    )
  }
  onAdd() {
    const modal = this.modalService.open(AddEleveComponent, { size: 'lg' });
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  mensualite(event) {
    this.eleveService.data(event);
    const modal = this.modalService.open(MensualiteComponent, { size: 'lg' });
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
    this.eleveService.data(event);
    const modal = this.modalService.open(EditEleveComponent, { size: 'lg' });
    modal.result.then(() => { }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  onDelete(event) {
    if (confirm("Voulez-vous réelement supprimer cet élève ?")) {
      this.eleveService.remove(event.id).subscribe(
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
  ngOnInit(): void {
    this.isEconome = this.authService.isEconome();
    this.isSecretaire = this.authService.isSecretaire();
    this.eleveService.allWhitoutPagination().subscribe(
      data =>{
        this.customerList =data;
      }
    )
    this.classeService.allWhitoutPagination().subscribe(
      res => {
        this.classes = res;
      }
    )
    this.selectChange("tous");
  }
  selectChange(event) {
    this.lesEleves = [];
    this.page = 0;
    if (event === "tous") {
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
      return;
    }
    else {
      this.eleveService.allByClasse({ size: this.pageSize, page: this.page }, event).subscribe(
        res => {
          this.lesEleves = res.content;
          this.collectionSize = res.totalCount;
          this.customerList = res.content;
          return
        }
      )
    }
  }
  loadData(request) {
    this.lesEleves = [];
    this.eleveService.all(request).subscribe(
      res => {
        this.lesEleves = res.content;
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
      this.lesEleves = this.val;
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
    this.lesEleves = this.filteredCustomerList;
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
      email_parent: null,
      prenom_pere: null,
      nom_prenom_mere: null,
      profession_pere: null,
      profession_mere: null,
      handicap_particuliers: null,
      maladies_particulieres: null
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
        email_parent: worksheet[i].EMAIL_PARENT,
        prenom_pere: worksheet[i].PRENOM_PERE,
        nom_prenom_mere: worksheet[i].NOM_PRENOM_MERE,
        profession_pere: worksheet[i].PROFESSION_PERE,
        profession_mere: worksheet[i].PROFESSION_MERE,
        handicap_particuliers: worksheet[i].HANDICAP_PARTICULIERS,
        maladies_particulieres: worksheet[i].MALADIE_PARTICULIERS
      };
      this.eleveService.add(updatedLine).subscribe();
      this.lesEleves = { ...this.lesEleves, ...updatedLine };
      //monTab.value.push(line);
    }
    window.location.reload();
  }
  pageChange(event) {
    this.page = event;
    if (this.change === "tous") {
      this.loadData(
        {
          size: this.pageSize,
          page: this.page - 1
        });
      return;
    }
    else {
      this.eleveService.allByClasse({ size: this.pageSize, page: this.page - 1 }, this.change).subscribe(
        res => {
          this.lesEleves = res.content;
          this.collectionSize = res.totalCount;
          this.customerList = res.content;
          return
        }
      )
    }
  }
  detail(event) {
    this.eleveService.data(event);
    const modal = this.modalService.open(DetailComponent);
  }
}
