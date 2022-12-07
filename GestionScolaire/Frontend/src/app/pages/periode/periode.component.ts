import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnneescolaireService } from 'src/app/services/anneescolaire/anneescolaire.service';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { AddPeriodeComponent } from './add-periode/add-periode.component';
import { EditPeriodeComponent } from './edit-periode/edit-periode.component';

@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',
  styleUrls: ['./periode.component.scss']
})
export class PeriodeComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  periodes: any;
  collectionSize;
  pageSize = 5;
  page = 1;
  currentAnneeScolaire;
  val;
  nb;
  constructor(private modalService: NgbModal, private periodeService: PeriodeService,private anneeScolaireService : AnneescolaireService) { }
  onAdd() {
    const modal = this.modalService.open(AddPeriodeComponent);
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  onEdit(periode) {
    this.periodeService.data(periode);
    const modal = this.modalService.open(EditPeriodeComponent);
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
    if (confirm("Voulez-vous réelement supprimer cette période ?")) {
      this.periodeService.remove(event.id).subscribe(
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
    this.periodeService.allByAnneeScolaire(request,this.currentAnneeScolaire.id).subscribe(
      res => {
        this.periodes = res.content;
        this.collectionSize = res.totalCount;
        this.nb = res.totalCount;
        this.val = res.content;
      }
    )

  }
  ngOnInit(): void {
    this.currentAnneeScolaire = this.anneeScolaireService.getCurrentData();
    this.page = 0;
    this.periodeService.allWhitoutPagination().subscribe(
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
    this.filteredCustomerList = [];
    this.collectionSize = 0;
    if (!this.filterText || this.filterText.length === 0) {
      this.periodes = this.val;
      this.collectionSize = this.nb;
      return;
    }
    this.customerList.filter(x => {
      if (x.libelle_periode.toString().toUpperCase().includes(this.filterText.toUpperCase())) {
        this.collectionSize ++;
        this.filteredCustomerList =
          [
            ...this.filteredCustomerList,
            x
          ];
      }
    });
    this.periodes = this.filteredCustomerList;
  }
  pageChange(event) {
    this.page = event;
    this.loadData(
      {
        size: this.pageSize,
        page: this.page - 1
      });
  }
  close()
  {
    this.modalService.dismissAll();
  }
}