import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/http-client.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CustomerSearchRequest } from 'src/app/models/canavi/customer/customer-search-request';
import { CustomerAddOrChangeModel } from 'src/app/models/canavi/customer/customer-add-or-change-model';

@Injectable()
export class CustomerService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CustomerSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerSearch, request);
    const result = response as any;
    return result;
  }
  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerGet, request);
    const result = response as any;
    return result;
  }
  async save(customer: CustomerAddOrChangeModel): Promise<any> {
    const request = customer;
    let url = '';
    if (request.id != null && request.id !== undefined && request.id.length > 0) {
      url = ConfigSetting.UrlPathCustomerChange;
    } else {
      url = ConfigSetting.UrlPathCustomerAdd;
    }
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response as any;
    return result;
  }

  async active(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerActive, request);
    const result = response as any;
    return result;
  }

  async lock(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerLock, request);
    const result = response as any;
    return result;
  }
}
