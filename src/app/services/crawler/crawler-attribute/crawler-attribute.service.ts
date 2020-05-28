import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CrawlerAttributeSearchRequest } from '../../../models/crawler/crawler-attribute/crawler-attribute-search-request';
import { CrawlerAttributeCrudRequest } from '../../../models/crawler/crawler-attribute/crawler-attribute-add-or-update';
import { CrawlerAttributeValueSearchRequest } from '../../../models/crawler/crawler-attribute/crawler-attribute-value-search-request';
import { CrawlerAttributeValueCrudRequest } from '../../../models/crawler/crawler-attribute/crawler-attribute-value-add-or-update';

@Injectable()
export class CrawlerAttributeService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CrawlerAttributeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeSearch, request);
    const result = response as any;
    return result;
  }
  // async gets(categoryId: string): Promise<any> {
  //   const request = {
  //     categoryId: categoryId
  //   };
  //   const response = await this.httpClient.postJson(ConfigSetting.UrlPathCCrawlerAttributeGets, request);
  //   const result = response as any;
  //   return result;
  // }
  async get(request: CrawlerAttributeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeGet, request);
    const result = response as any;
    return result;
  }
  async save(request: CrawlerAttributeCrudRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeAddOrUpdate, request);
    const result = response as any;
    return result;
  }
  async searchCrawlerAttributeValue(request: CrawlerAttributeValueSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeValueSearch, request);
    const result = response as any;
    return result;
  }
  async getCrawlerAttributeValue(request: CrawlerAttributeValueSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeValueGet, request);
    const result = response as any;
    return result;
  }
  async saveCrawlerAttributeValue(request: CrawlerAttributeValueCrudRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerAttributeValueAddOrUpdate, request);
    const result = response as any;
    return result;
  }
}
