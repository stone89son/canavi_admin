import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CandidateSearchRequest,CandidateGetByJobCampaignRequest } from 'src/app/models/canavi/candidate/candidate-search-model';

@Injectable()
export class CanaviCandidateService {

  constructor(private httpClient: HttpClientService) { }


  async search(request: CandidateSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCandidateSearch, request);
    const result = response as any;
    return result;
  }

  async searchCandidateCampaign(request: CandidateGetByJobCampaignRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviSearchCandidateCampaign, request);
    const result = response as any;
    return result;
  }

}

