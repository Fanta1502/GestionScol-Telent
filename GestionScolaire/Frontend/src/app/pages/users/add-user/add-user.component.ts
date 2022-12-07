import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  economeExiste = false;
  secretaireExiste = false;
  isSend = false;
  constructor(private modalService: NgbModal, private authService: AuthService) { }
ngOnInit(): void {
  this.economeExiste = this.authService.getEconomeExist();
  this.secretaireExiste = this.authService.getSecretaireExist();
  this.addForm = new FormGroup({
    username: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    telephone: new FormControl('', Validators.required),
    poste: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });  
}
get f() {
  return this.addForm.controls;
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
  if (this.addForm.invalid) {
    return;
  }
  this.isSend = true;
  let user = {
    username:  form.value.username,
    nom: form.value.nom,
    prenom:  form.value.prenom,
    email : form.value.email,
    telephone:  form.value.telephone,
    poste:  form.value.poste,
    role:  form.value.role
  } 
  console.log(this.isSend)
  this.authService.register(user).subscribe(
    res => {
      this.isSend = false;
      this.modalService.dismissAll();
    }
  )
}
close()
{
  this.modalService.dismissAll();
}
}