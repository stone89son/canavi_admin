import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviSearchHistorySearchRequest, CanaviSearchHistoryModel } from 'src/app/models/canavi/search-history/search-history-request';
import { CanaviSearchHistoryDetailSearchRequest } from 'src/app/models/canavi/search-history/search-history-detail-request';


@Injectable()
export class CanaviSearchHistoryService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CanaviSearchHistorySearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviSearchHistorySearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviSearchHistoryGet, request);
    const result = response as any;
    return result;
  }

  async addOrUpdate(request: CanaviSearchHistoryModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviSearchHistoryAddOrUpdate, request);
    const result = response as any;
    return result;
  }

  async searchHistoryDetailGets(request: CanaviSearchHistoryDetailSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviSearchHistoryDetailGets, request);
    const result = response as any;
    return result;
  }

}

