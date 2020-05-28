import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';

import { CrawlerAttributeService } from '../../../../services/crawler/crawler-attribute/crawler-attribute.service';
import { CrawlerAttributeSearchRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-search-request';
import { CrawlerAttributeCrudRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-add-or-update';
import { CrawlerAttributeAddOrUpdateComponent } from '../../../../components/crawler/crawler-attribute/crawler-attribute-add-or-update/crawler-attribute-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-crawler-attribute',
  templateUrl: './crawler-attribute.component.html',
  styleUrls: ['./crawler-attribute.component.css']
})
export class CrawlerAttributeComponent implements OnInit {
  @ViewChild(CrawlerAttributeAddOrUpdateComponent, {static: false}) crawlerAttributeAddOrUpdate: CrawlerAttributeAddOrUpdateComponent;

  addOrUpdateParams: CrawlerAttributeCrudRequest;
  searchParams: CrawlerAttributeSearchRequest;
  statuses: KeyValueModel[];
  crawlerAttributes: KeyValueModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;

  constructor(
    private crawlerAttributeService: CrawlerAttributeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchParams = new CrawlerAttributeSearchRequest();
    this.addOrUpdateParams = new CrawlerAttributeCrudRequest();
    this.crawlerAttributes = [];
    this.statuses = [];
    this.onSearch();
  }
  async onSearch(): Promise<void> {
    try {
      const response = await this.crawlerAttributeService.search(this.searchParams);
      this.crawlerAttributes = response.CrawlerAttributes;
      this.statuses = response.statuses;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowAddOrUpdateForm(id: string): Promise<void> {
    try {
      this.crawlerAttributeAddOrUpdate.crawlerAttributeGet.attributeId = id;
      this.crawlerAttributeAddOrUpdate.onGet();
      $('#crawler-attribute-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
