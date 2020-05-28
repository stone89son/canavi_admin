import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/http-client.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { JobCampaignAddRequest } from 'src/app/models/canavi/job-campaign/job-campaign-add-request';
@Injectable({
  providedIn: 'root'
})
export class CampaignjobserviceService {

  constructor(private httpClient: HttpClientService) { }
  async AddJob(request: JobCampaignAddRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAddJobCampaign, request);
    const result = response as any;
    return result;
  }
}
