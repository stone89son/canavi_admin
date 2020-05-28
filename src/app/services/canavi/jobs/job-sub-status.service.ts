import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { JobSubStatusGetsRequest, JobSubStatusModel } from '../../../models/canavi/jobs/job-sub-status-request';

@Injectable()
export class JobSubStatusService {

  constructor(private httpClient: HttpClientService) { }

  async gets(request: JobSubStatusGetsRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobSubStatusSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobSubStatusGet, request);
    const result = response as any;
    return result;
  }

  async add(request: JobSubStatusModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobSubStatusAdd, request);
    const result = response as any;
    return result;
  }

  async update(request: JobSubStatusModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobSubStatusChange, request);
    const result = response as any;
    return result;
  }
}
