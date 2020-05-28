import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { ConfigSetting } from '../../common/configSetting';
import { QuestionsSearchRequest, QuestionsModel } from 'src/app/models/blog/questions/questions-model';

@Injectable()

export class BlogQuestionsService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: QuestionsSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogQuestionsSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogQuestionsGetById, request);
    const result = response as any;
    return result;
  }

  async addOrChange(request: QuestionsModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBlogQuestionsAddOrChange, request);
    const result = response as any;
    return result;
  }

}
