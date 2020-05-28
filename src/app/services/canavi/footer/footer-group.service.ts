import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting'
import { HttpClientService } from '../../../common/http-client.service';
import { FooterGroup, FooterGroupGetAll, FooterGroupAddOrChange, FooterGroupItemGetAll, FooterGroupItemAddOrChange, ConfigFooterGroup } from 'src/app/models/canavi/footer/footer-group';

@Injectable()
export class FooterGroupService {
  footerGroup: FooterGroup = new FooterGroup();
  footerGroupAddOrChange: FooterGroupAddOrChange = new FooterGroupAddOrChange();
  configFooterGroup: ConfigFooterGroup = new ConfigFooterGroup();

  constructor(private httpClient: HttpClientService) { }

  async getAllFooterGroup(request: FooterGroupGetAll) : Promise<any>{
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathFooterGroupGetAll, request);
    let result = response as any;
    return result;
  }

  async getAllFooterGroupItem(request: FooterGroupItemGetAll) : Promise<any>{
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathFooterGroupItemGetAll, request);
    let result = response as any;
    return result;
  }

  async getFooterGroupById(id: string) : Promise<any> {
    var request = {
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathFooterGroupGetById, request);
    let result = response as any;
    return result;
  }

  async getFooterGroupItemById(id: string) : Promise<any> {
    var request = {
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathFooterGroupItemGetById, request);
    let result = response as any;
    return result;
  }

  async addOrChange(footerGroupAddOrChange: FooterGroupAddOrChange): Promise<any>{
    let urlPath = "";
    if(footerGroupAddOrChange.id != null && footerGroupAddOrChange.id != undefined && footerGroupAddOrChange.id != ""){
      urlPath = ConfigSetting.UrlPathFooterGroupUpdate;
    }
    else{
      urlPath = ConfigSetting.UrlPathFooterGroupAdd;
    }
    var request = footerGroupAddOrChange;

    let response = await this.httpClient.postJsonWithAuthen(urlPath, request);
    let result = response as any;
    return result;
  }

  async addOrChangeFooterGroupItem(footerGroupItemAddOrChange: FooterGroupItemAddOrChange): Promise<any>{
    let urlPath = "";
    if(footerGroupItemAddOrChange.id != null && footerGroupItemAddOrChange.id != undefined && footerGroupItemAddOrChange.id != ""){
      urlPath = ConfigSetting.UrlPathFooterGroupItemUpdate;
    }
    else{
      urlPath = ConfigSetting.UrlPathFooterGroupItemAdd;
    }
    var request = footerGroupItemAddOrChange;

    let response = await this.httpClient.postJsonWithAuthen(urlPath, request);
    let result = response as any;
    return result;
  }

  async getConfigFooterGroupById(id: string): Promise<any>{
    var request = {
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigFooterGroupGetById, request);
    let result = response as any;
    return result;
  }

  async changeConfigFooterGroup(configFooterGroup: ConfigFooterGroup){
    var request = configFooterGroup;

    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigFooterGroupUpdate, request);
    let result = response as any;
    return result;
  }
}
