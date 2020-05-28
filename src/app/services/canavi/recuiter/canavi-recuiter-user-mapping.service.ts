import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviRecuiterUserMappingSearchRequest } from '../../../models/canavi/recuiter/recuiter-user-mapping-search';


@Injectable()
export class CanaviRecuiterUserMappingService {

  constructor(private httpClient: HttpClientService) { }

  async getByRecuiterId(request: CanaviRecuiterUserMappingSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterUserMappingGetByRecuiterId, request);
    const result = response as any;
    return result;
  }

  async update(id: string, claimCode: string): Promise<any> {
    const request = {
      id, claimCode
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterUserMappingUpdate, request);
    const result = response as any;
    return result;
  }

  async accepted(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterUserMappingAccepted, request);
    const result = response as any;
    return result;
  }

  async reject(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterUserMappingReject, request);
    const result = response as any;
    return result;
  }
}

