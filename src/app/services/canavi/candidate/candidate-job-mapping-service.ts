import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CandidateJobMappingSearchRequest } from 'src/app/models/canavi/candidate/candidate-job-mapping-model';

@Injectable()
export class CandidateJobMappingService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CandidateJobMappingSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCandidateJobMappingSearch, request);
    const result = response as any;
    return result;
  }
}

