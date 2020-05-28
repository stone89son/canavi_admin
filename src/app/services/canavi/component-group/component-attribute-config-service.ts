import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { ComponentAttributeConfigSearchRequest, ComponentAttributeConfigModel } from 'src/app/models/canavi/component-group/component-attribute-config-request';

@Injectable()
export class ComponentAttributeConfigService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: ComponentAttributeConfigSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentAttributeConfigSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentAttributeConfigGetById, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: ComponentAttributeConfigModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentAttributeConfigAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}

