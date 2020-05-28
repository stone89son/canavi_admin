
import {filter} from 'rxjs/operators';
import { ConfigSetting } from './common/configSetting';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from './common/helpers';
import { AuthConfig, OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private oauthService: OAuthService) {
    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.configure(authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndTryLogin();

      // Optional
      this.oauthService.setupAutomaticSilentRefresh();

      this.oauthService.events.subscribe(e => {
        // console.log('oauth/oidc event', e);
      });

      this.oauthService.events.pipe(
        filter(e => e.type === 'session_terminated'))
        .subscribe(e => {
          // console.log('Your session has been terminated!');
        });

      this.oauthService.events.pipe(
        filter(e => e.type === 'token_received'))
        .subscribe(e => {
          // this.oauthService.loadUserProfile();
        });
    }
  }

  ngOnInit() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
      }
      if (route instanceof NavigationEnd) {
        Helpers.setLoading(false);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
        if (
          !this.oauthService.hasValidIdToken() ||
          !this.oauthService.hasValidAccessToken()
        ) {
          this.oauthService.initImplicitFlow();
        }
      });
    }
  }
}

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: ConfigSetting.SSO_URL,
  requireHttps: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: ConfigSetting.AdminUI_URL,

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: ConfigSetting.Silent_Refresh_URL,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: ConfigSetting.SSO_ClientId,

  // set the scope for the permissions the client should request
  scope: ConfigSetting.SSO_Scope,

  showDebugInformation: true,
  sessionChecksEnabled: true
};
