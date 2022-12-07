import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { AddClasseComponent } from './add-classe/add-classe.component';
import { EditClasseComponent } from './edit-classe/edit-classe.component';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  classes: any;
  collectionSize;
  pageSize = 5;
  page = 1;
  val;
  nb;
  constructor(private modalService: NgbModal, private classeService: ClasseService) { }
  onAdd() {
    const modal = this.modalService.open(AddClasseComponent);
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  onEdit(classe) {
    this.classeService.data(classe);
    const modal = this.modalService.open(EditClasseComponent);
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
    if (confirm("Voulez-vous réelement supprimer cette classe ?")) {
      this.classeService.remove(event.id).subscribe(
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
    this.classeService.all(request).subscribe(
      res => {
        this.classes = res.content;
        this.collectionSize = res.totalCount;
        this.nb = res.totalCount;
        this.val = res.content;
      }
    )

  }
  ngOnInit(): void {
    this.page = 0;
    this.classeService.allWhitoutPagination().subscribe(
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
      this.classes = this.val;
      this.collectionSize = this.nb;
      return;
    }
    this.customerList.filter(x => {
      if (x.nom_classe.toString().toUpperCase().includes(this.filterText.toUpperCase())) {
         this.collectionSize++;
        this.filteredCustomerList =
          [
            ...this.filteredCustomerList,
            x
          ];
      }
    });
    this.classes = this.filteredCustomerList;
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
