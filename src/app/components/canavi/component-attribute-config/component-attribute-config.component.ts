import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentAttributeConfigAddOrUpdateComponent } from './component-attribute-config-add-or-update/component-attribute-config-add-or-update.component';
import { ComponentAttributeConfigSearchRequest, ComponentAttributeConfigModel } from 'src/app/models/canavi/component-group/component-attribute-config-request';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ComponentAttributeConfigService } from 'src/app/services/canavi/component-group/component-attribute-config-service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-attribute-config',
  templateUrl: './component-attribute-config.component.html',
  styleUrls: ['./component-attribute-config.component.css']
})
export class ComponentAttributeConfigComponent implements OnInit {
  @ViewChild(ComponentAttributeConfigAddOrUpdateComponent, {static: false}) componentAttributeConfigAddOrUpdate: ComponentAttributeConfigAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: ComponentAttributeConfigSearchRequest;
  componentAttributeConfigs: ComponentAttributeConfigModel[];
  statuses: KeyValueModel[];

  constructor(
    private componentAttributeConfigService: ComponentAttributeConfigService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new ComponentAttributeConfigSearchRequest();
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
      const response = await this.componentAttributeConfigService.search(this.searchParams);
      if (response.status) {
        this.componentAttributeConfigs = response.componentAttributeConfigs;
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
      this.componentAttributeConfigAddOrUpdate.id = id;
      this.componentAttributeConfigAddOrUpdate.componentGroupId = this.searchParams.componentGroupId;
      this.componentAttributeConfigAddOrUpdate.onGet();
      $('#component-attribute-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
