import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeFilterMappingAddOrUpdateComponent } from './attribute-filter-mapping-add-or-update/attribute-filter-mapping-add-or-update.component';
import { CanaviAttributeFilerMappingSearchRequest, CanaviAttribtuteFilterMappingModel } from 'src/app/models/canavi/attribute-filter-mapping/attribute-group-request-search';
import { CanaviAttributeFilterMappingService } from 'src/app/services/canavi/attribute-filter-mapping/attribute-filter-mapping-service';
import { KeyValueModel } from 'src/app/models/result-model';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-filter-mapping',
  templateUrl: './attribute-filter-mapping.component.html',
  styleUrls: ['./attribute-filter-mapping.component.css']
})
export class AttributeFilterMappingComponent implements OnInit {
  @ViewChild(AttributeFilterMappingAddOrUpdateComponent, {static: false}) attributeFilterMappingAddOrChange: AttributeFilterMappingAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: CanaviAttributeFilerMappingSearchRequest;
  attributeFilterMappings: CanaviAttribtuteFilterMappingModel[];
  types: KeyValueModel[];

  constructor(
    private attributeFilterMappingService: CanaviAttributeFilterMappingService,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviAttributeFilerMappingSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.attributeFilterMappingService.search(this.searchParams);
      if (response.status) {
        this.attributeFilterMappings = response.attributeFilterMappings;
        this.types = response.types;
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
      this.attributeFilterMappingAddOrChange.id = id;
      this.attributeFilterMappingAddOrChange.onGet();
      $('#attribute-filter-mapping-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
