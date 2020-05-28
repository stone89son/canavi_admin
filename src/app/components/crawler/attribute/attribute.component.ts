import { Component, OnInit, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../common/configSetting';
import { AttributeService } from '../../../services/crawler/attribute/crawler.attribute.service';
import { WebsiteService } from '../../../services/crawler/website/crawler.website.service';
import { CanaviAttributeService } from '../../../services/canavi/attribute/canavi.attribute.service';
import { ProductSearchModel } from '../../../models/crawler/attributeSearchModel';
import { AttributeValueComponent } from '../attribute-value/attribute-value.component';
import { AttributeSearchRequest, AttributeMappingRequest, TypeMapping, StatusEnum } from '../../../models/crawler/attribute-search-request';
import { WebsiteSearchRequest } from '../../../models/crawler/website-request';
import { CanaviAttributeComponent } from '../../canavi/attribute/canavi.attribute.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})

export class AttributeComponent implements OnInit {
  @ViewChild(AttributeValueComponent, {static: false}) attributeValue: AttributeValueComponent;
  @ViewChild(CanaviAttributeComponent, {static: false}) canaviattribute: CanaviAttributeComponent;

  token: string;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: AttributeSearchRequest;
  data: ProductSearchModel[];
  dataWebsite: any;
  searchParamsWebsite: WebsiteSearchRequest;
  requestMapping: AttributeMappingRequest;
  type: string;
  status: StatusEnum;
  websiteId: string;

  constructor(
    private oauthService: OAuthService,
    private attributeService: AttributeService,
    private websiteService: WebsiteService,
    private canaviAttributeService: CanaviAttributeService
  ) {
  }

  ngOnInit() {
    this.searchParams = new AttributeSearchRequest();
    this.requestMapping = new AttributeMappingRequest();
    this.searchParamsWebsite = new WebsiteSearchRequest();
    this.data = [];
    this.websiteId = '';
    this.type = '';
    this.onSearch();
    this.getWebsite();
  }

  async getWebsite(): Promise<void> {
    try {
      App.blockUI();
      this.searchParamsWebsite.name = '';
      const response = await this.websiteService.search(this.searchParamsWebsite);
      if (response.status) {
        this.dataWebsite = response.websites;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.PageIndex = pIndex;
      this.searchParams.PageSize = this.pageSize;
      const response = await this.attributeService.search(this.searchParams);
      if (response.status) {
        this.data = response.attributes;
        this.totalRow = response.totalRow;
      } else {
        this.totalRow = 0;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  pageChanged(page: number) {
    this.onSearch(page);
  }

  async onShowAttributeValueForm(id: string): Promise<void> {
    try {
      this.attributeValue.attributeId = id;
      this.attributeValue.getAttributeValueByAttributeId();
      $('#modal-attribute-value').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }


  confirm(item) {
    this.canaviattribute.onGets();
    this.requestMapping.OriginalAttributeId = item.id;
    $('#confirm').modal('show');
  }

  displayCounter(canvaviAttributeId) {
    this.requestMapping.TargetAttributeId = canvaviAttributeId;
  }

  async mapping(): Promise<void> {
    try {
      App.blockUI();
      this.requestMapping.WebsiteId = this.websiteId;
      this.requestMapping.MappingType = this.type;
      this.requestMapping.Status = 1;
      const result = await this.attributeService.Mapping(this.requestMapping);
      if (result != null) { }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
    }

  }



  // async onGetWebsite(): Promise<void> {
  //   const $this = this;
  //   try {
  //     ConfigSetting.Select2AjaxRegister(
  //       '#attId',
  //       ConfigSetting.UrlPathCanaviAttributeSeach,
  //       this.createParametersFunGetWebsite,
  //       $this,
  //       'Select Attribute',
  //       this.processResultsWebsite,
  //       this.formatRepoWebsite,
  //       this.formatRepoSelectionWebsite,
  //       this.selectComponentEventWebsite
  //     );
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  // }

  // createParametersFunGetWebsite(params, $this) {
  //   if (params.term === undefined) { params.term = ''; }
  //   const query = {
  //     name: params.term
  //   };
  //   return query;
  // }

  // processResultsWebsite(data, params) {
  //   return {
  //     results: data
  //   };
  // }
  // formatRepoWebsite(repo) {
  //   if (repo.loading) { return repo.text; }
  //   return repo.text;
  // }
  // formatRepoSelectionWebsite(repo) {
  //   return repo.text;
  // }
  // selectComponentEventWebsite(e, $this) {
  //   const id = e.params.data.id;
  //   $this.commissionEdit.vendorId = id;
  // }

}
