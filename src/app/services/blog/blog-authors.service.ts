import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ConfigSetting } from '../../common/configSetting';
import { BlogAuthorsSearchRequest, BlogAuthorsModel } from '../../models/blog/authors/blog-authors-model';

@Injectable()

export class BlogAuthorsService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: BlogAuthorsSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogAuthorsSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogAuthorsGetById, request);
    const result = response as any;
    return result;
  }

  async addOrChange(request: BlogAuthorsModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogAuthorsAddOrChange, request);
    const result = response as any;
    return result;
  }

}
