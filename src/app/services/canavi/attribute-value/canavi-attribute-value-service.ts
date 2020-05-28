import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {Observable} from 'rxjs';
import {CanaviAttributeValueGetByIdsRequest} from '../../../models/canavi/attribute-value/attribute-value-getByIds-request';
import { CanaviAttributeValueSearchRequest, CanaviAttribtuteValueModel } from '../../../models/canavi/attribute/attribute-value-request-search';


@Injectable()
export class CanaviAttributeValueService {

  constructor(private httpClient: HttpClientService) { }

  async searchByIds(attributeIds: string[]): Promise<any> {
    const request = new CanaviAttributeValueGetByIdsRequest();
    request.AttributeIds = attributeIds;
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeValueByIdsGet, request);
    const result = response as any;
    console.log(result);
    return result;
  }

  async search(request: CanaviAttributeValueSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeValueSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeValueGet, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: CanaviAttribtuteValueModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeValueAddOrUpdate, request);
    const result = response as any;
    return result;
  }

}

