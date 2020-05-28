import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { ComponentKeywordConfigSearchRequest, ComponentKeywordConfigModel } from 'src/app/models/canavi/component-group/component-keyword-config-request';

@Injectable()
export class ComponentKeywordConfigService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: ComponentKeywordConfigSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentKeywordConfigSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentKeywordConfigGetById, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: ComponentKeywordConfigModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentKeywordConfigAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}

