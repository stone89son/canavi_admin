import { Component, OnInit, ViewChild } from '@angular/core';
import { CanaviAttributeValueAddOrUpdateComponent } from './attribute-value-add-or-update/canavi.attribute-value-add-or-update.component';
import { CanaviAttributeValueSearchRequest } from '../../../models/canavi/attribute/attribute-value-request-search';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../../common/configSetting';
import { CanaviAttributeValueService } from '../../../services/canavi/attribute-value/canavi-attribute-value-service';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-attribute-value',
  templateUrl: './canavi.attribute-value.component.html',
  styleUrls: ['./canavi.attribute-value.component.css']
})
export class CanaviAttributeValueComponent implements OnInit {
  @ViewChild(CanaviAttributeValueAddOrUpdateComponent, {static: false}) attributeValueAddOrUpdate: CanaviAttributeValueAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: CanaviAttributeValueSearchRequest;
  data: any;

  constructor(
    private canaviAttributeValueService: CanaviAttributeValueService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviAttributeValueSearchRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.attributeId = param.get('attributeId');
      this.onSearch();
    });
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.canaviAttributeValueService.search(this.searchParams);
      if (response.status) {
        this.data = response.attributeValues;
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
      this.attributeValueAddOrUpdate.id = id;
      this.attributeValueAddOrUpdate.attributeId = this.searchParams.attributeId;
      this.attributeValueAddOrUpdate.onGet();
      $('#canavi-attribute-value-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
