import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {Observable} from 'rxjs';
 import { WebsiteSearchRequest } from '../../../models/crawler/website-request';

@Injectable()
export class WebsiteService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: WebsiteSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWebsiteCrawlerSearch, request);
    const result = response as any;
    return result;
  }
 
}
