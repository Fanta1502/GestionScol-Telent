import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as XLSX from 'xlsx';
import { AddUserComponent } from './add-user/add-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  tab: any;
  filterText: any;
  filteredCustomerList: any = [];
  customerList: any;
  users: any;
  collectionSize;
  pageSize = 4;
  page = 0;
  nb = 0;
  economeExiste = false;
  secretaireExiste = false;
  image: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  constructor(private modalService: NgbModal, private authService: AuthService) { }
  onAdd() {
    const modal = this.modalService.open(AddUserComponent);
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
    this.authService.data(event);
    const modal = this.modalService.open(EditUserComponent);
    modal.result.then(() => { console.log('When user closes'); }, () => {
      this.page = 0;
      this.loadData(
        {
          size: this.pageSize,
          page: this.page
        });
    })
  }
  detail(event) {
    this.authService.data(event);
    const modal = this.modalService.open(DetailUserComponent);
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
    if (confirm("Voulez-vous réelement supprimer cet utilisateur ?")) {
      this.authService.remove(event.id).subscribe(
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
    this.loadData(
      {
        size: this.pageSize,
        page: this.page
      });
  }
  loadData(request) {
    let val;
    this.users = [];
    this.authService.all(request).subscribe(
      res => {
        this.collectionSize = res.totalCount;
        this.customerList = res.content;
        res.content.forEach(
          element => {
            if (element.profilPicture)
              {
                this.image = "data:image/jpeg;base64," + element.profilPicture;
              }
              else
              this.image = "../../../assets/images/profil.jpg";
            val = {
              id: element.id,
              email: element.email,
              prenom: element.prenom,
              nom: element.nom.toUpperCase(),
              username: element.username,
              poste: element.poste,
              telephone: element.telephone,
              profilPicture: this.image,
              role : element.role
            }
            this.users = [
              ...this.users,
              val
            ];
            if (element.role === "ECONOME") {
              this.authService.setEconomeExist(true);
              this.economeExiste = true;
            }
            else if (element.role === "SECRETAIRE") {
              this.authService.setSecretaireExist(true);
              this.secretaireExiste = true;
            }
          });
      }
    )
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