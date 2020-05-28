import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {Observable} from 'rxjs';
 import { MappingAttributeGetRequest } from '../../../models/crawler/mapping-attribute/mapping-attribute-get-request';

@Injectable()
export class CrawlerMappingAttributeService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: MappingAttributeGetRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerMappingAttributeGet, request);
    const result = response as any;
    return result;
  }
}
