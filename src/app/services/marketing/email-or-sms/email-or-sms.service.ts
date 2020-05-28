import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/http-client.service';
import { EmailOrSmsSearchRequestModel } from 'src/app/models/marketing/email-or-sms/email-or-sms-search-request-model';
import { EmailOrSmsAddOrUpdateRequest } from 'src/app/models/marketing/email-or-sms/email-or-sms-add-or-update-request';
import { ConfigSetting } from 'src/app/common/configSetting';

@Injectable()
export class EmailOrSmsService {
  constructor(private httpClient: HttpClientService) { }

  async search(request: EmailOrSmsSearchRequestModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsSearch, request);
    const result = response as any;
    return result;
  }

  async save(request: EmailOrSmsAddOrUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsAddOrUpdate, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {id};
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsGetDetail, request);
    const result = response as any;
    return result;
  }

  async getVerify(id: string): Promise<any> {
    const request = {id};
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsGetVerifyDetail, request);
    const result = response as any;
    return result;
  }

  async changeStatus(id: string, status: number): Promise<any> {
    const request = {
      id, status
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsChangeStatus, request);
    const result = response as any;
    return result;
  }
}
