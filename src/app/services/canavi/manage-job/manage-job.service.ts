import { Injectable } from '@angular/core';
import { ConfigSetting } from 'src/app/common/configSetting';
import { HttpClientService } from 'src/app/common/http-client.service';
import { JobSearchRequest } from 'src/app/models/canavi/jobs/job-search-request';
@Injectable({
  providedIn: 'root'
})
export class ManageJobService {

  constructor(private httpClient: HttpClientService) { }
  async SearchJob(request: JobSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathJobSearch, request);
    const result = response as any;
    return result;
  }

  // async ChangeStatusCompany(request: CompanyChangeStatus): Promise<any> {
  //   const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterChangeStatusInCms, request);
  //   const result = response as any;
  //   return result;
  // }
}
