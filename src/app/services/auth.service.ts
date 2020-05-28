import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';

@Injectable()
export class VendorService {
  constructor(private httpClient: HttpClientService) { }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCategoryGets, request);
    const result = response as any;
    return result;
  }
}
