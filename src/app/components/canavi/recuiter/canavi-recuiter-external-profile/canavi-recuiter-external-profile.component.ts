import { Component, OnInit } from '@angular/core';
import { CanaviRecuiterExternalProfileSearchRequest, CanaviRecuiterExternalProfileSearchResponse } from 'src/app/models/canavi/recuiter/recuiter-external-profile-search';
import { CanaviRecuiterExternalProfileService } from 'src/app/services/canavi/recuiter/canavi-recuiter-external-profile.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-recuiter-external-profile',
  templateUrl: './canavi-recuiter-external-profile.component.html',
  styleUrls: ['./canavi-recuiter-external-profile.component.css']
})
export class CanaviRecuiterExternalProfileComponent implements OnInit {
  searchParams: CanaviRecuiterExternalProfileSearchRequest;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  recuiterExternalProfiles: CanaviRecuiterExternalProfileSearchResponse[];

  constructor(
    private recuiterExternalProfileService: CanaviRecuiterExternalProfileService,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviRecuiterExternalProfileSearchRequest();
  }

  async onGetByRecuiterId(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.recuiterExternalProfileService.getByRecuiterId(this.searchParams);
      if (response.status) {
        this.recuiterExternalProfiles = response.recuiterExternalProfiles;
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

  pageChangedExternal(page: number) {
    this.onGetByRecuiterId(page);
  }
}
