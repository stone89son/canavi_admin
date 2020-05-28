import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviAttributeRelationshipSearchRequest, CanaviAttribtuteRelationshipModel} from 'src/app/models/canavi/attribute-relationship/attribute-relationship-request-search';

@Injectable()
export class CanaviAttributeRelationshipService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CanaviAttributeRelationshipSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeRelationshipSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeRelationshipGet, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: CanaviAttribtuteRelationshipModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeRelationshipAddOrUpdate, request);
    const result = response as any;
    return result;
  }

}

