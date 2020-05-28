import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ConfigSetting } from '../../common/configSetting';
import { BlogCategoryModel } from '../../models/blog/category/blog-category-model';

@Injectable()

export class BlogCategoryService {

  constructor(private httpClient: HttpClientService) { }

  async gets(type: number): Promise<any> {
    const request = {
      type
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogCategoryGets, request);
    const result = response as any;
    return result;
  }

  async get(id: string, type: number): Promise<any> {
    const request = {
      id,
      type
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogCategoryGet, request);
    const result = response as any;
    return result;
  }

  async addOrChange(model: BlogCategoryModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogCategoryAddOrUpdate, model);
    const result = response as any;
    return result;
  }
}
