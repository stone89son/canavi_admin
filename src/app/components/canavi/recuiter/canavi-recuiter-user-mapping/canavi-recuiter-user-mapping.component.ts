import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CanaviRecuiterUserMappingService } from 'src/app/services/canavi/recuiter/canavi-recuiter-user-mapping.service';
import { CanaviRecuiterUserMappingSearchRequest, CanaviRecuiterUserMappingSearchResponse } from 'src/app/models/canavi/recuiter/recuiter-user-mapping-search';
import { CreateClaimCodeComponent } from './create-claim-code.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-recuiter-user-mapping',
  templateUrl: './canavi-recuiter-user-mapping.component.html',
  styleUrls: ['./canavi-recuiter-user-mapping.component.css']
})
export class CanaviRecuiterUserMappingComponent implements OnInit {
  @ViewChild(CreateClaimCodeComponent, {static: false}) createClaimCode: CreateClaimCodeComponent;
  searchParams: CanaviRecuiterUserMappingSearchRequest;
  pageIndexUserMapping = 1;
  pageSizeUserMapping = 10;
  totalRowUserMapping = 0;
  recuiterUserMappings: CanaviRecuiterUserMappingSearchResponse[];

  constructor(
    private recuiterUserMappingService: CanaviRecuiterUserMappingService,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviRecuiterUserMappingSearchRequest();
    // this.onGetByRecuiterId();
  }

  async onGetByRecuiterId(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndexUserMapping = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSizeUserMapping;
      const response = await this.recuiterUserMappingService.getByRecuiterId(this.searchParams);
      if (response.status) {
        this.recuiterUserMappings = response.recuiterUserMappings;
        this.totalRowUserMapping = response.totalRow;
      } else {
        this.totalRowUserMapping = 0;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  pageChangedUserMappings(page: number) {
    this.onGetByRecuiterId(page);
  }

  async onShowFormUpdate(id: string): Promise<void> {
    try {
      this.createClaimCode.id = id;
      $('#create-claim-code').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
