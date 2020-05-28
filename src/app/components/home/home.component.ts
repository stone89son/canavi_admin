import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../common/configSetting';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CanaviJobService } from 'src/app/services/canavi/jobs/canavi-job-service';
import { CanaviJobMappingStatisticRequest, CandidateJobMappingStatisticResponse } from 'src/app/models/canavi/jobs/canavi-job-mapping-request';
import { CanaviCandidateJobMappingComponent } from '../canavi/recuiter/canavi-recuiter-jobs/canavi-candidate-job-mapping/canavi-candidate-job-mapping.component';
import { CanaviRecuiterJobDetailComponent } from '../canavi/recuiter/canavi-recuiter-jobs/canavi-recuiter-job-detail/canavi-recuiter-job-detail.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  @ViewChild(CanaviCandidateJobMappingComponent, {static: false}) candidateJobMapping: CanaviCandidateJobMappingComponent;
  searchParams: CanaviJobMappingStatisticRequest;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  candidateJobStatistic: CandidateJobMappingStatisticResponse[];

  constructor(
    private oauthService: OAuthService,
    private jobService: CanaviJobService,
  ) {
    setInterval(() => this.reloadPage(), 60000);
  }

  reloadPage() {
    this.getStatistic();
  }

  ngOnInit() {
    // this.token = ConfigSetting.GetAuthenToken;
    this.searchParams = new CanaviJobMappingStatisticRequest();
    this.getStatistic();
    localStorage.setItem(ConfigSetting.LocalStorageRedirectKey, '');
  }

  async getStatistic(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.jobService.getStatistic(this.searchParams);
      if (response.status) {
        this.candidateJobStatistic = response.candidateJobStatistic;
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

  pageChangedJobs(page: number) {
    this.getStatistic(page);
  }

  async onShowFormCandidateMapping(id: string): Promise<void> {
    try {
      this.candidateJobMapping.jobId = id;
      this.candidateJobMapping.onSearch();
      $('#job-list').modal('hide');
      $('#candidate-list').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
