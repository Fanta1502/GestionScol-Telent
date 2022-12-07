import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnneescolaireService } from 'src/app/services/anneescolaire/anneescolaire.service';
import { PeriodeComponent } from '../periode/periode.component';
import { AddAnneeScolaireComponent } from './add-annee-scolaire/add-annee-scolaire.component';
import { EditAnneeScolaireComponent } from './edit-annee-scolaire/edit-annee-scolaire.component';

@Component({
  selector: 'app-annee-scolaire',
  templateUrl: './annee-scolaire.component.html',
  styleUrls: ['./annee-scolaire.component.scss']
})
export class AnneeScolaireComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  anneeScolaires: any;
  collectionSize;
  pageSize = 5;
  page = 1;
  val;
  nb;
  constructor(private modalService: NgbModal, private anneeScolaireService: AnneescolaireService) { }
  onAdd() {
    const modal = this.modalService.open(AddAnneeScolaireComponent);
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  viewPeriod(anneeScolaire : any) {
    this.anneeScolaireService.currentData(anneeScolaire);
    const modal = this.modalService.open(PeriodeComponent, { size: 'lg' });
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  onEdit(anneeScolaire) {
    this.anneeScolaireService.data(anneeScolaire);
    const modal = this.modalService.open(EditAnneeScolaireComponent);
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
    if (confirm("Voulez-vous réelement supprimer cette année scolaire ?")) {
      this.anneeScolaireService.remove(event.id).subscribe(
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
    this.anneeScolaireService.all(request).subscribe(
      res => {
        this.anneeScolaires = res.content;
        this.collectionSize = res.totalCount;
        this.nb = res.totalCount;
        this.val = res.content;
      }
    )

  }
  ngOnInit(): void {
    this.page = 0;
    this.anneeScolaireService.allWhitoutPagination().subscribe(
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
    this.collectionSize =0;
    this.filteredCustomerList = [];
    if (!this.filterText || this.filterText.length === 0) {
      this.anneeScolaires = this.val;
      this.collectionSize = this.nb;
      return;
    }
    this.customerList.filter(x => {
      if (x.libele_annee_scolaire.toString().toUpperCase().includes(this.filterText.toUpperCase())) {
        this.collectionSize ++;
        this.filteredCustomerList =
          [
            ...this.filteredCustomerList,
            x
          ];
      }
    });
    this.anneeScolaires = this.filteredCustomerList;
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