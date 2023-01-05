import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EleveService } from 'src/app/services/eleve/eleve.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { MensualiteService } from 'src/app/services/mensualite/mensualite.service';
import { MensualiteComponent } from '../mensualite/mensualite.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { PrintService } from 'src/app/services/print/print.service';
@Component({
  selector: 'app-recu-paiement-mensualite',
  templateUrl: './recu-paiement-mensualite.component.html',
  styleUrls: ['./recu-paiement-mensualite.component.scss']
})
export class RecuPaiementMensualiteComponent implements OnInit {

  constructor(private modalService: NgbModal, private mensualiteService: MensualiteService, private eleveService: EleveService, private etablissementService: EtablissementService) { }
  value;
  etablissement;
  currentEleve;
  @ViewChild('data') pdfData: ElementRef;
  pageSize = 5;
  logo: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  page = 1;
  ngOnInit(): void {
    this.value = this.mensualiteService.getData();
    this.currentEleve = this.eleveService.getData();
    this.etablissementService.all({
      size: this.pageSize,
      page: this.page
    }).subscribe(
      res => {
        this.etablissement = res.content[0];
        if (res.content[0])
          if (res.content[0].logo)
            this.logo = "data:image/jpeg;base64," + this.etablissement.logo
      })
  }
  close() {
    this.modalService.dismissAll();
    const modal = this.modalService.open(MensualiteComponent, { size: 'lg' });
  }
  public print() {
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
      }
    }
    const pdfTable = this.pdfData.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML, {
      window: window,
    });
    let documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait",
      styles: {
        path: "./style.css"
      }, content: [html]
    };
    pdfMake.createPdf(documentDefinition).print();
  }
}