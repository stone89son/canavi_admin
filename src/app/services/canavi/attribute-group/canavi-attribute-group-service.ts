import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviAttributeGroupSearchRequest, CanaviAttribtuteGroupModel, CanaviAttribtuteGroupMappingModel, CanaviAttributeGroupMappingSearchRequest } from '../../../models/canavi/attribute-group/attribute-group-request-search';

@Injectable()
export class CanaviAttributeGroupService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CanaviAttributeGroupSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeGroupSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeGroupGet, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: CanaviAttribtuteGroupModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeGroupAddOrUpdate, request);
    const result = response as any;
    return result;
  }

  async attributeGroupMappingGetByAttributeGroupId(request: CanaviAttributeGroupMappingSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeGroupMappingGetByAttributeGroupId, request);
    const result = response as any;
    return result;
  }

  async attributeGroupMappingGetById(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeGroupMappingGetById, request);
    const result = response as any;
    return result;
  }

  async attributeGroupMappingAddOrUpdate(request: CanaviAttribtuteGroupMappingModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeGroupMappingAddOrUpdate, request);
    const result = response as any;
    return result;
  }

}

