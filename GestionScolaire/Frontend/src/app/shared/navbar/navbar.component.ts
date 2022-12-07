import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EtablissementService } from 'src/app/services/etablissement/etablissement.service';
import { ResetPasswordComponent } from 'src/app/user-pages/reset-password/reset-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  user:any;
  etablissement;
  pageSize = 5;
  page = 1;
  image: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  logo: String | ArrayBuffer = "../../../assets/images/profil.jpg";
  constructor(config: NgbDropdownConfig,private etablissementService : EtablissementService,private authService : AuthService,private router : Router,private modalService: NgbModal) {
    config.placement = 'bottom-right';
  }
  resetPassword()
  {
    this.modalService.open(ResetPasswordComponent);
  }
  editProfil()
  {
    this.authService.data(this.user);
    this.router.navigateByUrl("/pages/edit-profil");
  }
  loadData(request) {
    this.etablissementService.all(request).subscribe(
      res => {
        this.etablissement = res.content[0];
        if (res.content[0])
        if (res.content[0].logo)
          this.logo = "data:image/jpeg;base64," + this.etablissement.logo
      }
    )

  }
  ngOnInit() {
    this.loadData(
      {
        size: this.pageSize,
        page: this.page
      });
    this.authService.getUser(localStorage.getItem("id")).subscribe(
      (res : any) =>{
        this.user = res;
         if (res.profilPicture) {
          this.image = "data:image/jpeg;base64," + this.user.profilPicture;
          this.user.profilPicture = this.image;
        }
      }
    )
  }
  logout() {
    this.authService.deleteToken();
    this.router.navigateByUrl("/auth/login");
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  // toggleRightSidebar() {
  //   document.querySelector('#right-sidebar').classList.toggle('open');
  // }

}
