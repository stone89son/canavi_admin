import { Component, OnInit, ViewChild } from '@angular/core';
import { CanaviJobService } from 'src/app/services/canavi/jobs/canavi-job-service';
import { CanaviJobGetByRecuiterIdRequest, CanaviJobGetByRecuiterIdResponse } from 'src/app/models/canavi/jobs/canavi-job-mapping-request';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CanaviCandidateJobMappingComponent } from './canavi-candidate-job-mapping/canavi-candidate-job-mapping.component';
import { CanaviRecuiterJobDetailComponent } from './canavi-recuiter-job-detail/canavi-recuiter-job-detail.component';
import { JobChangeStatus } from 'src/app/models/canavi/jobs/job-change-status';
import {FormControl} from '@angular/forms';


declare var jQuery: any;
declare var $: any;
declare var App: any;

export interface StatusJob {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-canavi-recuiter-jobs',
  templateUrl: './canavi-recuiter-jobs.component.html',
  styleUrls: ['./canavi-recuiter-jobs.component.css']
})
export class CanaviRecuiterJobsComponent implements OnInit {
  @ViewChild(CanaviCandidateJobMappingComponent, {static: false}) candidateJobMapping: CanaviCandidateJobMappingComponent;
  @ViewChild(CanaviRecuiterJobDetailComponent, {static: false}) candidateJobDetail: CanaviRecuiterJobDetailComponent;
  searchParams: CanaviJobGetByRecuiterIdRequest;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  jobs: CanaviJobGetByRecuiterIdResponse[];

  statusJobs: StatusJob[] = [
    {value: 1, viewValue: 'Mới tạo'},
    {value: 2, viewValue: 'Đã thanh toán trước'},
    {value: 4, viewValue: 'Dừng'},
    {value: 8, viewValue: 'Đang Active'},
    {value: 16, viewValue: 'Xóa'}
  ];


  constructor(
    private jobService: CanaviJobService,
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviJobGetByRecuiterIdRequest();
  }


  async changeStatusJob(id: string, status: number) {

    try {
      App.blockUI();
      let req = new JobChangeStatus();
      req.status=status;
      req.id=id;
      const response = await this.jobService.ChangeStatusJob(req);
      if (response.status) {
      } else {
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }

  }


  async onGetByRecuiterId(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.jobService.getByRecuiterId(this.searchParams);
      if (response.status) {
        this.jobs = response.jobs;
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
    this.onGetByRecuiterId(page);
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

  async onShowFormDetail(id: string): Promise<void> {
    try {
      this.candidateJobDetail.getDetail(id);
      $('#job-list').modal('hide');
      $('#job-detail').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
