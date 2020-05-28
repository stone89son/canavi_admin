import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import {Observable} from 'rxjs';
 import { RecuiterSearchRequest, RecuiterSearchByIdRequest } from '../../../models/crawler/recuiter/recuiter-search-request';

@Injectable()
export class RecuiterService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: RecuiterSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerRecuiterSearch, request);
    const result = response as any;
    return result;
  }
  async getById(id: string): Promise<any> {
    const rq = new RecuiterSearchByIdRequest();
    rq.id = id;
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawlerRecuiterGetById, rq);
    const result = response as any;
    return result;
  }
  async exportExcel(request: RecuiterSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthenResponseBlob(ConfigSetting.UrlPathCrawlerRecuiterExportExcel, request);
    const fileName = 'export_recuiter.xlsx';
    const linkElement = document.createElement('a');
    try {
      const blob = response._body as Blob;
      const url = window.URL.createObjectURL(blob);

      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', fileName);

      const clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': false
      });
      linkElement.dispatchEvent(clickEvent);
    } catch (ex) {
      console.log(ex);
    }
  }
}
