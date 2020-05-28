import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {CanaviAttribtuteFilterMappingModel } from '../../../models/canavi/attribute-filter-mapping/attribute-group-request-search';
import {CanaviAttributeFilerMappingSearchRequest } from '../../../models/canavi/attribute-filter-mapping/attribute-group-request-search';
@Injectable()
export class CanaviAttributeFilterMappingService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CanaviAttributeFilerMappingSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeFilterMappingSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeFilterMappingGet, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: CanaviAttribtuteFilterMappingModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeFilterMappingAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}

