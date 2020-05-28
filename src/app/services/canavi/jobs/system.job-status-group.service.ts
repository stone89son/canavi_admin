import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { JobStatusGroupGetsRequest, JobStatusGroupModel } from '../../../models/canavi/jobs/job-status-group-request';

@Injectable()
export class JobStatusGroupService {

  constructor(private httpClient: HttpClientService) { }

  async gets(request: JobStatusGroupGetsRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusGroupSearch, request);
    const result = response as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusGroupGet, request);
    const result = response as any;
    return result;
  }

  async add(request: JobStatusGroupModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusGroupAdd, request);
    const result = response as any;
    return result;
  }

  async update(request: JobStatusGroupModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathSystemJobStatusGroupChange, request);
    const result = response as any;
    return result;
  }
}
