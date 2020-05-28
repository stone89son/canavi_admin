import { Injectable } from '@angular/core';
import { ConfigSetting } from 'src/app/common/configSetting';
import { HttpClientService } from 'src/app/common/http-client.service';
import { CompanyGetsRequest } from 'src/app/models/canavi/manage-company/company-gets-request';
import { CompanyChangeStatus } from 'src/app/models/canavi/manage-company/company-change-status';
@Injectable({
  providedIn: 'root'
})
export class ManageCompanyService {

  constructor(private httpClient: HttpClientService) { }
  async SearchCompany(request: CompanyGetsRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterSearch, request);
    const result = response as any;
    return result;
  }

  async ChangeStatusCompany(request: CompanyChangeStatus): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterChangeStatusInCms, request);
    const result = response as any;
    return result;
  }
}
