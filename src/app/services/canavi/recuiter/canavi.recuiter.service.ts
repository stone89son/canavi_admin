import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {Observable} from 'rxjs';
import { RecuiterMappingRequest} from '../../../models/crawler/recuiter/recuiter-mapping-request';
import { RecuiterGetByIdRequest} from '../../../models/canavi/recuiter/recuiter-getById-request';
import { CanaviRecuiterSearchRequest, CanaviRecuiterGetRequest } from 'src/app/models/canavi/recuiter/recuiter-request-search';


@Injectable()
export class CanaviRecuiterService {

  constructor(private httpClient: HttpClientService) { }

  async AddFromCrawler(request: RecuiterMappingRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRecuiterAddOrChangeFromCrawler, request);
    const result = response as any;
    return result;
  }

  async GetByOriginal(request: RecuiterGetByIdRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRecuiterGetByOriginal, request);
    const result = response as any;
    return result;
  }

  async search(request: CanaviRecuiterSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterSearch, request);
    const result = response as any;
    return result;
  }

  async getById(request: CanaviRecuiterGetRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterGetById, request);
    const result = response as any;
    return result;
  }
}

