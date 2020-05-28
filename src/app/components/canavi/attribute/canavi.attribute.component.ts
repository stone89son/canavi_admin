import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../common/configSetting';
import { CanaviAttributeService } from '../../../services/canavi/attribute/canavi.attribute.service';
import { CanaviAttributeSearchRequest } from '../../../models/canavi/attribute/attribute-request-search';
import { CanaviAttributeAddOrUpdateComponent } from './attribute-add-or-update/canavi.attribute-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'canavi-attribute',
  templateUrl: './canavi.attribute.component.html',
  styleUrls: ['./canavi.attribute.component.css'],
})


export class CanaviAttributeComponent implements OnInit {
  @ViewChild(CanaviAttributeAddOrUpdateComponent, {static: false}) attributeAddOrUpdate: CanaviAttributeAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  data: any;
  searchParams: CanaviAttributeSearchRequest;
  canvaviAttributeId = '';

  @Output() valueChange = new EventEmitter();

  constructor(
    private canaviAttributeService: CanaviAttributeService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new CanaviAttributeSearchRequest();
    this.onGets();
  }

  async onGets(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.canaviAttributeService.search(this.searchParams);
      if (response.status) {
        this.data = response.attributes;
        this.totalRow = response.totalRow;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async onShowFormAddOrChange(id: string): Promise<void> {
    try {
      this.attributeAddOrUpdate.id = id;
      this.attributeAddOrUpdate.onGet();
      $('#canavi-attribute-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
