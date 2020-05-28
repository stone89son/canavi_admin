import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ConfigSetting } from '../../common/configSetting';
import { AnswersSearchRequest, AnswersModel } from 'src/app/models/blog/answers/answers-model';

@Injectable()

export class BlogAnswersService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: AnswersSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogAnswersSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogAnswersGetById, request);
    const result = response as any;
    return result;
  }

  async addOrChange(request: AnswersModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogAnswersAddOrChange, request);
    const result = response as any;
    return result;
  }

}
