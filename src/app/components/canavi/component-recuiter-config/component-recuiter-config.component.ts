import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentRecuiterConfigAddOrUpdateComponent } from './component-recuiter-config-add-or-update/component-recuiter-config-add-or-update.component';
import { ComponentRecuiterConfigSearchRequest, ComponentRecuiterConfigModel } from 'src/app/models/canavi/component-group/component-recuiter-config-request';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComponentRecuiterConfigService } from 'src/app/services/canavi/component-group/component-recuiter-config-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-recuiter-config',
  templateUrl: './component-recuiter-config.component.html',
  styleUrls: ['./component-recuiter-config.component.css']
})
export class ComponentRecuiterConfigComponent implements OnInit {
  @ViewChild(ComponentRecuiterConfigAddOrUpdateComponent, {static: false}) componentRecuiterConfigAddOrUpdate: ComponentRecuiterConfigAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: ComponentRecuiterConfigSearchRequest;
  componentRecuiters: ComponentRecuiterConfigModel[];
  statuses: KeyValueModel[];

  constructor(
    private componentRecuiterConfigService: ComponentRecuiterConfigService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new ComponentRecuiterConfigSearchRequest();
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
      const response = await this.componentRecuiterConfigService.search(this.searchParams);
      if (response.status) {
        this.componentRecuiters = response.componentRecuiters;
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
      this.componentRecuiterConfigAddOrUpdate.id = id;
      this.componentRecuiterConfigAddOrUpdate.componentGroupId = this.searchParams.componentGroupId;
      this.componentRecuiterConfigAddOrUpdate.onGet();
      $('#component-recuiter-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
