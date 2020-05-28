import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CommisstionFeeModel, CommisstionFeeSearchRequest } from 'src/app/models/canavi/commisstion-fee/commisstion-fee-request';

@Injectable()
export class CanaviCommisstionFeeService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CommisstionFeeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCommisstionFeeSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCommisstionFeeGet, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: CommisstionFeeModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCommisstionFeeAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}

