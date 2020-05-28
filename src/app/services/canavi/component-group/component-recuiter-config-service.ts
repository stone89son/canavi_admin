import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { ComponentRecuiterConfigModel, ComponentRecuiterConfigSearchRequest } from 'src/app/models/canavi/component-group/component-recuiter-config-request';

@Injectable()
export class ComponentRecuiterConfigService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: ComponentRecuiterConfigSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentRecuiterConfigSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentRecuiterConfigGetById, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: ComponentRecuiterConfigModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentRecuiterConfigAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}

