import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviJobMappingRequest, CanaviJobGetByOriginalIdRequest, CanaviJobGetByRecuiterIdRequest, CanaviJobMappingStatisticRequest } from '../../../models/canavi/jobs/canavi-job-mapping-request';
import { JobChangeStatus } from 'src/app/models/canavi/jobs/job-change-status';
import { JobCampaignAddRequest } from 'src/app/models/canavi/jobs/job-request/job-campaign-add-request';
import { Jobcampaignchangestatusrequest } from 'src/app/models/canavi/jobs/job-request/jobcampaignchangestatusrequest';

@Injectable()
export class CanaviJobService {

  constructor(private httpClient: HttpClientService) { }


//Jobcampaignchangestatusrequest
async Jobcampaignchangestatus(request: Jobcampaignchangestatusrequest): Promise<any> {
  const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathChangeStatusJobCampaign, request);
  const result = response as any;
  return result;
}

  async GetJobCampaign(request: JobCampaignAddRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGẹtobCampaign, request);
    const result = response as any;
    return result;
  }


  async JobCampaignAdd(request: JobCampaignAddRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAddJobCampaign, request);
    const result = response as any;
    return result;
  }

  async ChangeStatusJob(request: JobChangeStatus): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathChangeStatusJob, request);
    const result = response as any;
    return result;
  }

  async AddFromCrawler(request: CanaviJobMappingRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathJobAddOrChangeFromCrawler, request);
    const result = response as any;
    return result;
  }

  async GetByOriginal(request: CanaviJobGetByOriginalIdRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathJobGetByOriginal, request);
    const result = response as any;
    return result;
  }

  async getByRecuiterId(request: CanaviJobGetByRecuiterIdRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathJobGetByRecuiterId, request);
    const result = response as any;
    return result;
  }

  async getById(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathJobGetById, request);
    const result = response as any;
    return result;
  }

  async getStatistic(request: CanaviJobMappingStatisticRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathJobStatistic, request);
    const result = response as any;
    return result;
  }
}
