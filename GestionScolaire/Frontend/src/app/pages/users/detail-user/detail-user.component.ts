import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  dateSup = false;
  currentUser;
  constructor(private modalService: NgbModal, private authService: AuthService) { }
ngOnInit(): void {
  this.currentUser = this.authService.getData();
  this.editForm = new FormGroup({
    username: new FormControl(this.currentUser.username, Validators.required),
    nom: new FormControl(this.currentUser.nom, Validators.required),
    prenom: new FormControl(this.currentUser.prenom, Validators.required),
    email: new FormControl(this.currentUser.email, [Validators.required,Validators.email]),
    telephone: new FormControl(this.currentUser.telephone, Validators.required),
    poste: new FormControl(this.currentUser.poste, Validators.required),
  });  
}
get f() {
  return this.editForm.controls;
}
close()
{
  this.modalService.dismissAll();
}
}