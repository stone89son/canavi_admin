import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeGroupMappingAddOrUpdateComponent } from './attribute-group-mapping-add-or-update/attribute-group-mapping-add-or-update.component';
import { CanaviAttributeGroupService } from '../../../services/canavi/attribute-group/canavi-attribute-group-service';
import { CanaviAttribtuteGroupMappingModel, CanaviAttributeGroupMappingSearchRequest } from '../../../models/canavi/attribute-group/attribute-group-request-search';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-group-mapping',
  templateUrl: './attribute-group-mapping.component.html',
  styleUrls: ['./attribute-group-mapping.component.css']
})
export class AttributeGroupMappingComponent implements OnInit {
  @ViewChild(AttributeGroupMappingAddOrUpdateComponent, {static: false}) attributeGroupMappingAddOrUpdate: AttributeGroupMappingAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: CanaviAttributeGroupMappingSearchRequest;
  attributeAttributeGroupMappings: CanaviAttribtuteGroupMappingModel[];

  constructor(
    private attributeGroupService: CanaviAttributeGroupService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviAttributeGroupMappingSearchRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.attributeGroupId = param.get('attributeGroupId');
      this.onSearch();
    });
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.attributeGroupService.attributeGroupMappingGetByAttributeGroupId(this.searchParams);
      if (response.status) {
        this.attributeAttributeGroupMappings = response.attributeAttributeGroupMappings;
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
      this.attributeGroupMappingAddOrUpdate.id = id;
      this.attributeGroupMappingAddOrUpdate.attributeGroupId = this.searchParams.attributeGroupId;
      this.attributeGroupMappingAddOrUpdate.onGet();
      $('#attributeGroupMapping-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
