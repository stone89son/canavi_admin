import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {Observable} from 'rxjs';
 import { AttributeSearchRequest, AttributeMappingRequest } from '../../../models/crawler/attribute-search-request';

@Injectable()
export class AttributeService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: AttributeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeSearch, request);
    const result = response as any;
    return result;
  }

  async Mapping(request: AttributeMappingRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAttributeMapping, request);
    const result = response as any;
    return result;
  }
}
