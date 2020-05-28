import { Component, OnInit } from '@angular/core';
import { CandidateSearchRequest, CandidateSearchResponse } from 'src/app/models/canavi/candidate/candidate-search-model';
import { CanaviCandidateService } from 'src/app/services/canavi/candidate/canavi-candidate-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: CandidateSearchRequest;
  candidates: CandidateSearchResponse[];

  constructor(
    private candidateService: CanaviCandidateService,
  ) { }

  ngOnInit() {
    this.searchParams = new CandidateSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.candidateService.search(this.searchParams);
      if (response.status) {
        this.candidates = response.candidates;
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

  pageChanged(page: number) {
    this.onSearch(page);
  }
}
