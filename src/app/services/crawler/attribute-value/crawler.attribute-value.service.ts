import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {Observable} from 'rxjs';
import { AttributeValueSearchRequest } from '../../../models/crawler/attribute-value-search-request';

@Injectable()
export class AttributeValueService {

  constructor(private httpClient: HttpClientService) { }

  async getByAttributeId(request: AttributeValueSearchRequest): Promise<any> {
    var a = request;
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeValueSearch, request);
    const result = response as any;
    return result;
    // const data = [{text: 'txt0',value:'0'},{text: 'txt1',value:'1'},{text: 'txt2',value:'2'}];
    // result.push(data.find(x => x.value == id));
  }


 
}
