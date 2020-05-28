import { Component, OnInit } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private oauthService: OAuthService
  ) { }

  ngOnInit() {
  }

  async onLogout(): Promise<any> {
    ConfigSetting.Logout();
    this.oauthService.logOut();
  }
}
