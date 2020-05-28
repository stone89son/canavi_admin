import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/http-client.service';
import { SeoDetailSearchRequest, SeoDetailModel } from 'src/app/models/marketing/seo-detail/seo-detail-model';
import { ConfigSetting } from 'src/app/common/configSetting';

@Injectable()
export class SeoDetailService {
  constructor(private httpClient: HttpClientService) { }

  async search(request: SeoDetailSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMarketingSeoDetailSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMarketingSeoDetailGetById, request);
    const result = response as any;
    return result;
  }

  async getByTargetId(targetId: string, targetType: number): Promise<any> {
    const request = {
      targetId: targetId,
      targetType: targetType
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMarketingSeoDetailGetByTargetId, request);
    const result = response as any;
    return result;
  }

  async addOrChange(request: SeoDetailModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMarketingSeoDetailAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}
