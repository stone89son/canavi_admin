import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';
import { promise } from 'selenium-webdriver';
import { Jsonp } from '@angular/http/src/http';

import { CrawlerAttributeService } from '../../../../services/crawler/crawler-attribute/crawler-attribute.service';
import { CrawlerAttributeValueSearchRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-value-search-request';
import { CrawlerAttributeValueCrudRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-value-add-or-update';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-crawler-attribute-value-add-or-update',
  templateUrl: './crawler-attribute-value-add-or-update.component.html',
  styleUrls: ['./crawler-attribute-value-add-or-update.component.css']
})
export class CrawlerAttributeValueAddOrUpdateComponent implements OnInit {
  @Output() searchData = new EventEmitter<string>();

  crawlerAttributeValueGet: CrawlerAttributeValueSearchRequest;
  crawlerAttributeValue: CrawlerAttributeValueCrudRequest;
  statuses: KeyValueModel[];
  submited: boolean;
  constructor(
    private crawlerAttributeService: CrawlerAttributeService
  ) { }

  ngOnInit() {
    this.crawlerAttributeValueGet = new CrawlerAttributeValueSearchRequest();
    this.crawlerAttributeValue = new CrawlerAttributeValueCrudRequest();
    this.submited = false;
  }
  async onGet(): Promise<void> {
    App.blockUI();
    try {
      const response = await this.crawlerAttributeService.getCrawlerAttributeValue(this.crawlerAttributeValueGet);
      const item = response.crawlerAttributeValue;
      this.crawlerAttributeValue.id = item.attributeValueId;
      this.crawlerAttributeValue.attributeId = this.crawlerAttributeValueGet.attributeId;
      this.crawlerAttributeValue.value = item.value;
      this.statuses = response.statuses;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  async onAddOrUpdate(form): Promise<void> {
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        const request = this.crawlerAttributeValue;
        const response = await this.crawlerAttributeService.saveCrawlerAttributeValue(request);
        if (response.status) {
          $('#crawler-attribute-value-add-or-update').modal('hide');
          ConfigSetting.ShowSuccess('Save success.');
          this.searchData.next('onSearch');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
