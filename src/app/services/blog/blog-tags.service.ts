import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ConfigSetting } from '../../common/configSetting';
import { BlogTagsSearchRequest, BlogTagsModel } from '../../models/blog/tags/blog-tags-model';

@Injectable()

export class BlogTagsService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: BlogTagsSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogTagsSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogTagsGetById, request);
    const result = response as any;
    return result;
  }

  async addOrChange(request: BlogTagsModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogTagsAddOrChange, request);
    const result = response as any;
    return result;
  }

}
