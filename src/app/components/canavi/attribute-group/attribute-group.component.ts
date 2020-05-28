import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeGroupAddOrUpdateComponent } from './attribute-group-add-or-update/attribute-group-add-or-update.component';
import { ConfigSetting } from '../../../common/configSetting';
import { CanaviAttributeGroupSearchRequest, CanaviAttribtuteGroupModel } from '../../../models/canavi/attribute-group/attribute-group-request-search';
import { CanaviAttributeGroupService } from '../../../services/canavi/attribute-group/canavi-attribute-group-service';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-group',
  templateUrl: './attribute-group.component.html',
  styleUrls: ['./attribute-group.component.css']
})
export class AttributeGroupComponent implements OnInit {
  @ViewChild(AttributeGroupAddOrUpdateComponent, {static: false}) attributeGroupAddOrChange: AttributeGroupAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: CanaviAttributeGroupSearchRequest;
  attributeGroups: CanaviAttribtuteGroupModel[];

  constructor(
    private attributeGroupService: CanaviAttributeGroupService,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviAttributeGroupSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.attributeGroupService.search(this.searchParams);
      if (response.status) {
        this.attributeGroups = response.attributeGroups;
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

  async onShowFormAddOrChange(id: string): Promise<void> {
    try {
      this.attributeGroupAddOrChange.id = id;
      this.attributeGroupAddOrChange.onGet();
      $('#attributeGroup-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
