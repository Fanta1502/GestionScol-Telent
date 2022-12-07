import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import Validation from 'src/app/util/util_reset_password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  dateSup = false;
  user;
  lastPasswordVerif = true;
  constructor(private modalService: NgbModal,private authService : AuthService) {}
  
  ngOnInit() {
    this.authService.getUser(localStorage.getItem("id")).subscribe(
      data =>
      {
        this.user = data;
      }
    )
    this.resetForm = new FormGroup({
      last_password: new FormControl('',Validators.required),
      new_password: new FormControl('',Validators.required),
      repeat_password: new FormControl('',Validators.required)
    },
    {
      validators: [Validation.match('new_password', 'repeat_password')]
    });  
  }
  get f() {
    return this.resetForm.controls;
  }
  onSubmit(form: FormGroup) { 
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    let user =
    {
      id: this.user.id,
      username: this.user.username,
      password: form.value.new_password
    };
    this.authService.verif(
      {
        username: this.user.username,
        password: form.value.last_password
      }
    ).subscribe(
      data => {
        if (data == true) {
          this.authService.resetPassword(user).subscribe(
            (res: any) => {
              if (res) {
                this.close();
              }
            }
          );
        }
        else {
          this.lastPasswordVerif = false;
        }
      }
    )
  }
  close()
  {
    this.modalService.dismissAll();
  }
}