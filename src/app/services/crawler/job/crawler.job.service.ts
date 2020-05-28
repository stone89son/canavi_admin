import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { Observable } from 'rxjs';
import { JobSearchRequest } from '../../../models/crawler/job/crawler-job-request-search';
import { CrawlerJobGetRequest } from '../../../models/crawler/job/CrawlerJobGetRequest';

@Injectable()
export class JobService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: JobSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawJobSearch, request);
    const result = response as any;
    return result;
  }

  async getJobById(id: string): Promise<any> {
    const rq = new CrawlerJobGetRequest;
    rq.Id = id;
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCrawJobGetById, rq);
    const result = response as any;
    return result;
  }

  async exportExcel(request: JobSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthenResponseBlob(ConfigSetting.UrlPathCrawJobExportExcel, request);
    const fileName = 'export_job.xlsx';
    const linkElement = document.createElement('a');
    try {
      const blob = response._body as Blob; // new Blob([response._body], { type: contentType });
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
