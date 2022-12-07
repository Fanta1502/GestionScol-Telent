import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EleveService } from 'src/app/services/eleve/eleve.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { PrintService } from 'src/app/services/print/print.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  constructor(private modalService: NgbModal,private printService : PrintService) { }
  eleves;
  text;
  @ViewChild('data') pdfData: ElementRef;
  ngOnInit(): void {
    this.text = this.printService.getPrintText();
  }
  close()
  {
    this.modalService.dismissAll();
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
  //  const pdfTable = this.pdfData.nativeElement;
    var html = htmlToPdfmake(this.printService.getPrintData());
    let documentDefinition = { content: [html]};
    pdfMake.createPdf(documentDefinition).print();
  }
}