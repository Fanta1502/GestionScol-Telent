import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  isAdmin = false;
  isEconome = false;
  isSecretaire = false;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isEconome = this.authService.isEconome();
    this.isSecretaire = this.authService.isSecretaire();
    const body = document.querySelector('body');
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}
