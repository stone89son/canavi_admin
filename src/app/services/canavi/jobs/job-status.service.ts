import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { JobStatusGetsRequest, JobStatusModel } from '../../../models/canavi/jobs/job-status-request';

@Injectable()
export class JobStatusService {

  constructor(private httpClient: HttpClientService) { }

  async gets(request: JobStatusGetsRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusGet, request);
    const result = response as any;
    return result;
  }

  async add(request: JobStatusModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusAdd, request);
    const result = response as any;
    return result;
  }

  async update(request: JobStatusModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusChange, request);
    const result = response as any;
    return result;
  }
}
