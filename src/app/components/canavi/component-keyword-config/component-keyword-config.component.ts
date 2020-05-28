import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ComponentKeywordConfigAddOrUpdateComponent } from './component-keyword-config-add-or-update/component-keyword-config-add-or-update.component';
import { ComponentKeywordConfigSearchRequest, ComponentKeywordConfigModel } from 'src/app/models/canavi/component-group/component-keyword-config-request';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComponentKeywordConfigService } from 'src/app/services/canavi/component-group/component-keyword-config-service';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-keyword-config',
  templateUrl: './component-keyword-config.component.html',
  styleUrls: ['./component-keyword-config.component.css']
})
export class ComponentKeywordConfigComponent implements OnInit {
  @ViewChild(ComponentKeywordConfigAddOrUpdateComponent, {static: false}) componentKeywordConfigAddOrUpdate: ComponentKeywordConfigAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: ComponentKeywordConfigSearchRequest;
  componentKeywords: ComponentKeywordConfigModel[];
  statuses: KeyValueModel[];

  constructor(
    private componentKeywordConfigService: ComponentKeywordConfigService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new ComponentKeywordConfigSearchRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.componentGroupId = param.get('componentGroupId');
      this.onSearch();
    });
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.componentKeywordConfigService.search(this.searchParams);
      if (response.status) {
        this.componentKeywords = response.componentKeywords;
        this.statuses = response.statuses;
        this.totalRow = response.totalRow;
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

  async onShowFormAddOrChange(id: string): Promise<void> {
    try {
      this.componentKeywordConfigAddOrUpdate.id = id;
      this.componentKeywordConfigAddOrUpdate.componentGroupId = this.searchParams.componentGroupId;
      this.componentKeywordConfigAddOrUpdate.onGet();
      $('#component-keyword-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
