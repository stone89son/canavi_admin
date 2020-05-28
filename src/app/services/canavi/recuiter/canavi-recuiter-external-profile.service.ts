import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviRecuiterExternalProfileSearchRequest } from '../../../models/canavi/recuiter/recuiter-external-profile-search';


@Injectable()
export class CanaviRecuiterExternalProfileService {

  constructor(private httpClient: HttpClientService) { }

  async getByRecuiterId(request: CanaviRecuiterExternalProfileSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterExternalProfileGetByRecuiterId, request);
    const result = response as any;
    return result;
  }
}

