import { Injectable } from '@angular/core';
import { ConfigSetting } from 'src/app/common/configSetting';
import { HttpClientService } from 'src/app/common/http-client.service';
import { CompanyAuthenticationSearch, CompanyAuthenticationChangeStatus } from 'src/app/models/canavi/authentication-recruiter/authentication-recruiter-model';

@Injectable()
export class AuthenticationRecruiterSevice {
    
    constructor(private httpClient: HttpClientService) { }

    async SearchCompanyAuthentication(request: CompanyAuthenticationSearch): Promise<any> {
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentSearchCompanyAuthentication, request);
        const result = response as any;
        return result;
    }
    async ChangeStatusCompanyAuthentication(request: CompanyAuthenticationChangeStatus) {
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentChangeStatusCompanyAuthentication, request);
        const result = response as any;
        return result;
    }
}
