import { Injectable } from '@angular/core';
import { CommonSearchRequest } from "src/app/models/common/common-search-model";
import { HttpClientService } from 'src/app/common/http-client.service';
import { ConfigSetting } from 'src/app/common/configSetting';

@Injectable()
export class CommonService {
  constructor(private httpClient: HttpClientService) {}

  async getSkill(): Promise<any> {
    let request = new CommonSearchRequest();
    request.term = '';
    request.pageIndex = 0;
    request.pageSize = 1000;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathCommonSkillSearch,
      request
    );
    let result = response as any;
    
    return result;
  }

  async getExperienceRange(): Promise<any> {
    let request = new CommonSearchRequest();
    request.term = '';
    request.pageIndex = 0;
    request.pageSize = 1000;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathCommonExperienceRangeSearch,
      request
    );
    let result = response as any;
    return result;
  }

  async getGender(): Promise<any> {
    let request = new CommonSearchRequest();
    request.term = '';
    request.pageIndex = 0;
    request.pageSize = 1000;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathCommonGenderSearch,
      request
    );
    let result = response as any;
    return result;
  }

  async getCurriculumVitaeLanguage(): Promise<any> {
    let request = new CommonSearchRequest();
    request.term = '';
    request.pageIndex = 0;
    request.pageSize = 1000;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathCommonLanguageSearch,
      request
    );
    let result = response as any;
    return result;
  }

  async getWorkingType(): Promise<any> {
    let request = new CommonSearchRequest();
    request.term = '';
    request.pageIndex = 0;
    request.pageSize = 1000;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathCommonWorkingTypeSearch,
      request
    );
    let result = response as any;
    return result;
  }

  async getCategory(): Promise<any> {
    let request = new CommonSearchRequest();
    request.term = '';
    request.pageIndex = 0;
    request.pageSize = 1000;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathCommonCategorySearch,
      request
    );
    let result = response as any;
    return result;
  }
}
