import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.component.scss'],
  template: `<div class="container-scroller">
<app-navbar *ngIf="showNavbar"></app-navbar>
  <div class="container-fluid page-body-wrapper">
    <app-sidebar *ngIf="showSidebar"></app-sidebar>
    <div class="main-panel" [ngClass]="{ 'main-panel-only' : !showSidebar }">
      <div class="content-wrapper">
        <app-spinner *ngIf="isLoading"></app-spinner>
        <div contentAnimate *ngIf="!isLoading" class="h-100">
          <router-outlet></router-outlet>
        </div>
      </div>
      <!-- partial -->
    </div>
    <!-- main-panel ends -->
  </div>
  <!-- page-body-wrapper ends -->
</div>`,
})
export class PagesComponent implements OnInit {
  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean;

  constructor(private router: Router) {
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => { 
      if(event instanceof NavigationStart) {
        if((event['url'] == '/pages/detail') ||(event['url'] == '/pages/edit-profil') || (event['url'] == '/auth/login') || (event['url'] == '/auth/register') || (event['url'] == '/pages/error-pages/404') || (event['url'] == '/pages/error-pages/500') ) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          document.querySelector('.main-panel').classList.add('w-100');
          document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg', );
          document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
          if((event['url'] == '/pages/error-pages/404') || (event['url'] == '/pages/error-pages/500')) {
            document.querySelector('.content-wrapper').classList.add('p-0');
          }
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          document.querySelector('.main-panel').classList.remove('w-100');
          document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
          document.querySelector('.content-wrapper').classList.remove('p-0');
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
          this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
          this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
}
