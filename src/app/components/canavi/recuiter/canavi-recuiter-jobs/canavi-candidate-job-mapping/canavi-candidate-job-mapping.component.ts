import { Component, OnInit } from '@angular/core';
import { CandidateJobMappingSearchRequest, CandidateJobMappingSearchResponse } from 'src/app/models/canavi/candidate/candidate-job-mapping-model';
import { CandidateJobMappingService } from 'src/app/services/canavi/candidate/candidate-job-mapping-service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel } from 'src/app/models/upload/result-model';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-candidate-job-mapping',
  templateUrl: './canavi-candidate-job-mapping.component.html',
  styleUrls: ['./canavi-candidate-job-mapping.component.css']
})
export class CanaviCandidateJobMappingComponent implements OnInit {
  jobId: string;
  searchParams: CandidateJobMappingSearchRequest;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  candidateJobMappings: CandidateJobMappingSearchResponse[];
  jobStatuses: KeyValueModel[];

  constructor(
    private candidateJobMappingService: CandidateJobMappingService,
  ) { }

  ngOnInit() {
    this.searchParams = new CandidateJobMappingSearchRequest();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.searchParams.jobId = this.jobId;
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.candidateJobMappingService.search(this.searchParams);
      if (response.status) {
        this.candidateJobMappings = response.candidateJobMappings;
        this.jobStatuses = response.jobStatuses;
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

  pageChangedCandidateMapping(page: number) {
    this.onSearch(page);
  }
}
