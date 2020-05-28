import { Component, OnInit, ViewChild } from '@angular/core';
import { JobStatusAddOrUpdateComponent } from './job-status-add-or-update/job-status-add-or-update.component';
import { JobStatusGetsRequest, JobStatusModel } from '../../../models/canavi/jobs/job-status-request';
import { JobStatusService } from '../../../services/canavi/jobs/job-status.service';
import { ConfigSetting } from '../../../common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.css']
})
export class JobStatusComponent implements OnInit {
  @ViewChild(JobStatusAddOrUpdateComponent, {static: false}) jobStatusAddOrUpdate: JobStatusAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: JobStatusGetsRequest;
  jobStatuses: JobStatusModel[];

  constructor(
    private jobStatusService: JobStatusService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new JobStatusGetsRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.jobStatusGroupId = param.get('jobstatusgroupId');
      this.onSearch();
    });
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.jobStatusService.gets(this.searchParams);
      if (response.status) {
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

  async onShowFormAddOrChange(id: string): Promise<void> {
    try {
      this.jobStatusAddOrUpdate.id = id;
      this.jobStatusAddOrUpdate.jobStatusGroupId = this.searchParams.jobStatusGroupId;
      this.jobStatusAddOrUpdate.onGet();
      $('#jobStatus-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
