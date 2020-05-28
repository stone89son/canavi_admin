import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ConfigSetting } from '../../common/configSetting';
import { BlogSearchRequestModel } from 'src/app/models/blog/posts/blog-post-search-model';
import { PostModel } from 'src/app/models/blog/posts/blog-post-model';

@Injectable()

export class BlogPostService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: BlogSearchRequestModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogPostSearch, request);
    const result = response as any;
    return result;
  }

  async getPostToChange(id: string, categoryId: string): Promise<any> {
    const request = {
      id, categoryId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogGetPostToChange, request);
    const result = response as any;
    return result;
  }

  async addOrChange(request: PostModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogGetPostAddOrChange, request);
    const result = response as any;
    return result;
  }

}
