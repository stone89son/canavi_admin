import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentGroupModel, ComponentGroupSearchRequest } from 'src/app/models/canavi/component-group/component-group-request';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ComponentGroupService } from 'src/app/services/canavi/component-group/component-group-service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ComponentGroupAddOrUpdateComponent } from './component-group-add-or-update/component-group-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-group',
  templateUrl: './component-group.component.html',
  styleUrls: ['./component-group.component.css']
})
export class ComponentGroupComponent implements OnInit {
  @ViewChild(ComponentGroupAddOrUpdateComponent, {static: false}) componentGroupAddOrUpdate: ComponentGroupAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: ComponentGroupSearchRequest;
  componentGroups: ComponentGroupModel[];
  statuses: KeyValueModel[];
  groupTypes: KeyValueModel[];
  constructor(
    private componentGroupService: ComponentGroupService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new ComponentGroupSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.componentGroupService.search(this.searchParams);
      if (response.status) {
        this.componentGroups = response.componentGroups;
        this.statuses = response.statuses;
        this.groupTypes = response.groupTypes;
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
      this.componentGroupAddOrUpdate.id = id;
      this.componentGroupAddOrUpdate.onGet();
      $('#component-group-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
