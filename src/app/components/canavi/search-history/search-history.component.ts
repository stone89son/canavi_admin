import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchHistoryAddOrUpdateComponent } from './search-history-add-or-update/search-history-add-or-update.component';
import { CanaviSearchHistorySearchRequest } from 'src/app/models/canavi/search-history/search-history-request';
import { CanaviSearchHistoryService } from 'src/app/services/canavi/search-history/canavi-search-history-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  @ViewChild(SearchHistoryAddOrUpdateComponent, {static: false}) searchHistoryAddOrUpdate: SearchHistoryAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  data: any;
  searchParams: CanaviSearchHistorySearchRequest;
  canvaviAttributeId = "";

  constructor(
    private searchHistoryService: CanaviSearchHistoryService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new CanaviSearchHistorySearchRequest();
    this.onGets();
  }

  async onGets(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.searchHistoryService.search(this.searchParams);
      if (response.status) {
        this.data = response.searchHistorys;
        this.totalRow = response.totalRow;
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
      this.searchHistoryAddOrUpdate.id = id;
      this.searchHistoryAddOrUpdate.onGet();
      $('#search-history-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
