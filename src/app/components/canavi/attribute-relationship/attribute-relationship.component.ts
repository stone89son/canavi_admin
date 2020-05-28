import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeRelationshipAddOrUpdateComponent } from './attribute-relationship-add-or-update/attribute-relationship-add-or-update.component';
import { CanaviAttributeRelationshipSearchRequest, CanaviAttribtuteRelationshipModel } from 'src/app/models/canavi/attribute-relationship/attribute-relationship-request-search';
import { CanaviAttributeRelationshipService } from 'src/app/services/canavi/attribute-relationship/canavi-attribute-relationship-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-relationship',
  templateUrl: './attribute-relationship.component.html',
  styleUrls: ['./attribute-relationship.component.css']
})
export class AttributeRelationshipComponent implements OnInit {
  @ViewChild(AttributeRelationshipAddOrUpdateComponent, {static: false}) attributeRelationshipAddOrUpdate: AttributeRelationshipAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: CanaviAttributeRelationshipSearchRequest;
  attributeRelationships: CanaviAttribtuteRelationshipModel[];

  constructor(
    private attributeRelationshipService: CanaviAttributeRelationshipService,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviAttributeRelationshipSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.attributeRelationshipService.search(this.searchParams);
      if (response.status) {
        this.attributeRelationships = response.attributeRelationships;
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
      this.attributeRelationshipAddOrUpdate.id = id;
      this.attributeRelationshipAddOrUpdate.onGet();
      $('#attributeRelationship-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
