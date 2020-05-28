import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { ComponentBlogPostConfigSearchRequest, ComponentBlogPostConfigModel } from 'src/app/models/canavi/component-group/component-blog-post-config-request';

@Injectable()
export class ComponentBlogPostConfigService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: ComponentBlogPostConfigSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentBlogPostConfigSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentBlogPostConfigGetById, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: ComponentBlogPostConfigModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviComponentBlogPostConfigAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}

