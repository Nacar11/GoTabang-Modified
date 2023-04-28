import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  showFiller = false;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  ngOnInit() {}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: "http://localhost:4200" } });
  }
}
