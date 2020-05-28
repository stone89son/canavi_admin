import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../common/configSetting';
import { AttributeValueService } from '../../../services/crawler/attribute-value/crawler.attribute-value.service';
import { AttributeValueSearchRequest } from '../../../models/crawler/attribute-value-search-request';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-value',
  templateUrl: './attribute-value.component.html',
  styleUrls: ['./attribute-value.component.css'],
})


export class AttributeValueComponent implements OnInit {
  token: string;
  attributeId: string;
  pageIndex = 0;
  pageSize = 100;
  totalRow = 0;
  data: any;
  searchParams: AttributeValueSearchRequest;
  constructor(
    private attributeValueService: AttributeValueService,
    private oauthService: OAuthService,
  ) {
  }

  ngOnInit() {
    this.token = ConfigSetting.GetAuthenToken;
    this.searchParams = new AttributeValueSearchRequest();
  }

  async getAttributeValueByAttributeId(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.searchParams.AttributeId = this.attributeId;
      this.searchParams.PageIndex = pIndex;
      this.searchParams.PageSize = this.pageSize;
      const response = await this.attributeValueService.getByAttributeId(this.searchParams);
      this.data = response.attributeValues;
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }
}
