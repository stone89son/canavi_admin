import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviAttributeSearchRequest, CanaviAttribtuteModel} from '../../../models/canavi/attribute/attribute-request-search';

@Injectable()
export class CanaviAttributeService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CanaviAttributeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeGet, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: CanaviAttribtuteModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviAttributeAddOrUpdate, request);
    const result = response as any;
    return result;
  }

}

