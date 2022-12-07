import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isSend = false;
  isLoading = false;
  mailIncorect = false;
  forgotForm: FormGroup;
  constructor(private location : Location,private authService : AuthService) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email])
      });
  }
  back()
  {
    this.location.back();
    return false;
  }
  onSubmit(form) {
    this.isLoading = true;
    this.mailIncorect = false;
    this.isSend = false;
    this.authService.getUserByMail(form.value.email).subscribe(
      (data : any) => {
        if (data) {
          let message = "\r\n<html>\n <body style =\" font-size : 20px; \">\n <div align='center'>\n <div style='text-align:center;'>\n  Salut " + data.firstName +" "  + data.lastName + " , </div>\n <div style='text-align:center;'> Nous vous envoyons cet e-mail car vous avez demandé la réinitialisation de votre mot de passe. <br> Cliquez sur ce bouton pour créer un nouveau mot de passe : </div> <br><br> <a href= 'http://localhost:4200/auth/reset-forgot-password/"+data.id+"' > <input type=\"button\" value =\"Réinitialiser\" style=\"width:14em;height:2em; border-raduis : 10%; color : white; border: 0ch; background-color: #8E44AD ;\"></a> <br><br> <div style='text-align:center;'>Si vous ne voulez pas de réinitialisation de votre mot de passe, vous pouvez ignorer cet e-mail.<br> Votre mot de passe ne sera pas modifié. </div> <div style='text-align:center;'>Cordialement,</div> </div>  </body> </html>";
          let subject = "Réinitialiser le mot de passe";
          this.authService.sendEmail({ emailAddress: form.value.email, subject: subject, message: message }).subscribe(
            res => {
              if (res == true) {
                this.isSend = true;
                this.isLoading = false;
                window.close();
                window.open("https://mail.google.com")
              }
            }
          )
        }
        else {
          this.isLoading = false;
          this.mailIncorect = true;
        }
      }
    )
  }
}