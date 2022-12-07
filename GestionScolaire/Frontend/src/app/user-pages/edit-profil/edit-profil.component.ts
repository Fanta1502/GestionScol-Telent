import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
  user: any;
  file: File;
  fileName: string = "No file selected";
  image: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  editForm: FormGroup;
  submitted = false;
  success = false;
  constructor(private location: Location, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.user = this.authService.getData();
    if (this.user.profilPicture)
      this.image = this.user.profilPicture
    this.editForm = new FormGroup({
      email: new FormControl(this.user.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ),
      prenom: new FormControl(this.user.prenom, Validators.required),
      nom: new FormControl(this.user.nom, Validators.required),
      username: new FormControl(this.user.username, Validators.required),
      telephone: new FormControl(this.user.telephone, Validators.required),
    })
  }
  get f() {
    return this.editForm.controls;
  }
  imageChange(file) {
    if (file) {
      this.fileName = file.name;
      this.file = file;  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.image = reader.result;
        console.log(reader.result)
        this.user.profilPicture = reader.result;
      }
    }
  }
  back() {
    this.location.back();
    return false;
  }
  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    let user =
    {
      id: this.user.id,
      email: form.value.email,
      prenom: form.value.prenom,
      nom: form.value.nom,
      username: form.value.username,
      poste: this.user.poste,
      telephone: form.value.telephone,
      profilPicture: this.image.slice("data:image/jpeg;base64,".length)
    }
    this.authService.editUserSettings(user).subscribe(
      res => {
        if (res) {
          this.success = true;
          this.router.navigate(["pages/dashboard"]);
        }
        else {
        }
      }
    )
  }
}
