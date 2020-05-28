import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { ComponentGroupSearchRequest, ComponentGroupModel } from 'src/app/models/canavi/component-group/component-group-request';

@Injectable()
export class ComponentGroupService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: ComponentGroupSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentGroupSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentGroupGetById, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: ComponentGroupModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentGroupAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}

