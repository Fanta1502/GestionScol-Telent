import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
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
onSubmit(form: FormGroup) {
  this.submitted = true;
  this.dateSup = false;
  let date = moment(Date.now());
  let date_naissance = moment(form.value.date_naissance);
  if (date_naissance.isAfter(date)) {
    this.dateSup = true;
    return;
  }
  if (this.editForm.invalid) {
    return;
  }
  let user = {
    id : this.currentUser.id,
    username:  form.value.username,
    nom: form.value.nom,
    prenom:  form.value.prenom,
    email : form.value.email,
    telephone:  form.value.telephone,
    poste:  form.value.poste,
  } 
  this.authService.editUserSettings(user).subscribe(
    res => {
      this.modalService.dismissAll();
    }
  )
}
close()
{
  this.modalService.dismissAll();
}
}