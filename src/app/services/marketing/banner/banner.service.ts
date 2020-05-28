import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting'
import { HttpClientService } from '../../../common/http-client.service';
import { Banner } from 'src/app/models/marketing/banner/banner';
import { BannerItemSearchRequest } from 'src/app/models/marketing/banner-item/banner-item-search-request';
import { BannerItem } from 'src/app/models/marketing/banner-item/banner-item';
import { BannerSearchRequest } from 'src/app/models/marketing/banner/banner-search-request';

@Injectable()
export class BannerService {

  constructor(private httpClient: HttpClientService) { }
  async getAllBannerItem(request: BannerItemSearchRequest): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerItemGetAll, request);
    let result = response as any;
    return result;
  }
  async searchBanner(request: BannerSearchRequest): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerSearch, request);
    let result = response as any;
    return result;
  }
  async getBannerById(id: string): Promise<any> {
    var request = {
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerGet, request);
    let result = response as any;
    return result;
  }
  async saveBanner(banner: Banner): Promise<any> {
    let url = "";
    if (banner.id != null && banner.id != undefined && banner.id.length > 0) {
      url = ConfigSetting.UrlPathBannerChange;
    }
    else {
      url = ConfigSetting.UrlPathBannerAdd;
    }
    var request = banner;
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response as any;
    return result;
  }
  async searchBannerItem(request: BannerItemSearchRequest): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerItemSearch, request);
    let result = response as any;
    return result;
  }
  async getBannerItemById(id: string, bannerId: string): Promise<any> {
    var request = {
      id,
      bannerId
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerItemGet, request);
    let result = response as any;
    return result;
  }
  async saveBannerItem(bannerItem: BannerItem): Promise<any> {
    var request = bannerItem;
    let url = '';
    if (request.id != null && request.id != undefined && request.id.length > 0) {
      url = ConfigSetting.UrlPathBannerItemChange;
    }
    else {
      url = ConfigSetting.UrlPathBannerItemAdd;
    }
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response as any;
    return result;
  }
  async removeBanner(id: string): Promise<any> {
    var request = {
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerRemove, request);
    let result = response as any;
    return result;
  }
  async removeBannerItem(id: string, bannerId: string): Promise<any> {
    var request = {
      id: id,
      bannerId: bannerId
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBannerItemRemove, request);
    let result = response as any;
    return result;
  }
}
