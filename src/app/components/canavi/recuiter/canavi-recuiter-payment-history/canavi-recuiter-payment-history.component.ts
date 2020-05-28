import { Component, OnInit } from '@angular/core';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CanaviRecuiterPaymentHistorySearchRequest, CanaviRecuiterPaymentHistorySearchResponse } from 'src/app/models/canavi/recuiter/recuiter-payment-history-search';
import { CanaviRecuiterPaymentHistoryService } from 'src/app/services/canavi/recuiter/canavi-recuiter-payment-history.service';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-recuiter-payment-history',
  templateUrl: './canavi-recuiter-payment-history.component.html',
  styleUrls: ['./canavi-recuiter-payment-history.component.css']
})
export class CanaviRecuiterPaymentHistoryComponent implements OnInit {
  searchParams: CanaviRecuiterPaymentHistorySearchRequest;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  recuiterPaymentHistorys: CanaviRecuiterPaymentHistorySearchResponse[];

  constructor(
    private recuiterPaymentHistoryService: CanaviRecuiterPaymentHistoryService,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviRecuiterPaymentHistorySearchRequest();
  }

  async onGetByRecuiterId(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.recuiterPaymentHistoryService.getByRecuiterId(this.searchParams);
      if (response.status) {
        this.recuiterPaymentHistorys = response.recuiterPaymentHistorys;
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

  pageChangedPaymentHistorys(page: number) {
    this.onGetByRecuiterId(page);
  }
}
