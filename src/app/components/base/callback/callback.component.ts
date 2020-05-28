import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../common/configSetting';

@Component({
    template: ''
})
export class CallbackComponent implements OnInit {
    constructor(private oauthService: OAuthService, private router: Router) { }

    ngOnInit() {
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
                this.oauthService.initImplicitFlow();
            } else {
                ConfigSetting.SetLoginStatus(this.oauthService.getAccessToken());
                let currentUrl = localStorage.getItem(ConfigSetting.LocalStorageRedirectKey);
                if (currentUrl === undefined || currentUrl === 'undefined' || currentUrl == null || currentUrl === '') {
                    currentUrl = '/g/recuiter';
                }
                this.router.navigate([currentUrl]);
            }
        });
    }
}
