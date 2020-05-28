import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';

import { CrawlerAttributeService } from '../../../../services/crawler/crawler-attribute/crawler-attribute.service';
import { CrawlerAttributeValueSearchRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-value-search-request';
import { CrawlerAttributeValueCrudRequest } from '../../../../models/crawler/crawler-attribute/crawler-attribute-value-add-or-update';
import { CrawlerAttributeValueAddOrUpdateComponent } from '../../../../components/crawler/crawler-attribute/crawler-attribute-value-add-or-update/crawler-attribute-value-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-crawler-attribute-value',
  templateUrl: './crawler-attribute-value.component.html',
  styleUrls: ['./crawler-attribute-value.component.css']
})
export class CrawlerAttributeValueComponent implements OnInit {
  @ViewChild(CrawlerAttributeValueAddOrUpdateComponent, {static: false}) crawlerAttributeValueAddOrUpdate: CrawlerAttributeValueAddOrUpdateComponent;

  addOrUpdateParams: CrawlerAttributeValueCrudRequest;
  searchParams: CrawlerAttributeValueSearchRequest;
  statuses: KeyValueModel[];
  crawlerAttributeValues: KeyValueModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  attributeId: string;

  constructor(
    private crawlerAttributeService: CrawlerAttributeService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new CrawlerAttributeValueSearchRequest();
    this.addOrUpdateParams = new CrawlerAttributeValueCrudRequest();
    this.crawlerAttributeValues = [];
    this.statuses = [];
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.attributeId = param.get('attributeId');
      this.onSearch();
    });
  }
  async onSearch(): Promise<void> {
    try {
      this.searchParams.attributeId = this.attributeId;
      const response = await this.crawlerAttributeService.searchCrawlerAttributeValue(this.searchParams);
      this.crawlerAttributeValues = response.crawlerAttributeValues;
      this.statuses = response.statuses;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onShowAddOrUpdateForm(attributeValueId: string): Promise<void> {
    try {
      this.crawlerAttributeValueAddOrUpdate.crawlerAttributeValueGet.attributeValueId = attributeValueId;
      this.crawlerAttributeValueAddOrUpdate.crawlerAttributeValueGet.attributeId = this.attributeId;
      this.crawlerAttributeValueAddOrUpdate.onGet();
      $('#crawler-attribute-value-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
