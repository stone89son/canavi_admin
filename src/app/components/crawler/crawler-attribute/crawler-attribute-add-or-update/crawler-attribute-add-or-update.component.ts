import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';
import { promise } from 'selenium-webdriver';
import { Jsonp } from '@angular/http/src/http';

import { CrawlerAttributeService } from '../../../../services/crawler/crawler-attribute/crawler-attribute.service';
import { CrawlerAttributeSearchRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-search-request';
import { CrawlerAttributeCrudRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-add-or-update';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-crawler-attribute-add-or-update',
  templateUrl: './crawler-attribute-add-or-update.component.html',
  styleUrls: ['./crawler-attribute-add-or-update.component.css']
})
export class CrawlerAttributeAddOrUpdateComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();

  crawlerAttributeGet: CrawlerAttributeSearchRequest;
  crawlerAttribute: CrawlerAttributeCrudRequest;
  statuses: KeyValueModel[];
  submited: boolean;
  constructor(
    private crawlerAttributeService: CrawlerAttributeService
  ) { }

  ngOnInit() {
    this.crawlerAttributeGet = new CrawlerAttributeSearchRequest();
    this.crawlerAttribute = new CrawlerAttributeCrudRequest();
    this.submited = false;
  }
  async onGet(): Promise<void> {
    App.blockUI();
    try {
      const response = await this.crawlerAttributeService.get(this.crawlerAttributeGet);
      const item = response.crawlerAttribute;
      this.crawlerAttribute.id = item.attributeId;
      this.crawlerAttribute.name = item.attributeName;
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
        const request = this.crawlerAttribute;
        const response = await this.crawlerAttributeService.save(request);
        if (response.status) {
          $('#crawler-attribute-add-or-update').modal('hide');
          ConfigSetting.ShowSuccess('Save success.');
          this.onSearch.next('onSearch');
          this.submited = false;
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
