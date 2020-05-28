import { Component, OnInit } from '@angular/core';
import { CanaviSearchHistoryDetailSearchRequest } from 'src/app/models/canavi/search-history/search-history-detail-request';
import { CanaviSearchHistoryService } from 'src/app/services/canavi/search-history/canavi-search-history-service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-search-history-detail',
  templateUrl: './search-history-detail.component.html',
  styleUrls: ['./search-history-detail.component.css']
})
export class SearchHistoryDetailComponent implements OnInit {
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  data: any;
  searchParams: CanaviSearchHistoryDetailSearchRequest;

  constructor(
    private searchHistoryService: CanaviSearchHistoryService,
    private router: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.searchParams = new CanaviSearchHistoryDetailSearchRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.keyword = param.get('keyword');
      this.onGets();
    });
  }

  async onGets(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.searchHistoryService.searchHistoryDetailGets(this.searchParams);
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
}
