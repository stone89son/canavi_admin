import { Component, OnInit, ViewChild } from '@angular/core';
import { JobSubStatusAddOrUpdateComponent } from './job-sub-status-add-or-update/job-sub-status-add-or-update.component';
import { JobSubStatusGetsRequest, JobSubStatusModel } from '../../../models/canavi/jobs/job-sub-status-request';
import { JobSubStatusService } from '../../../services/canavi/jobs/job-sub-status.service';
import { ConfigSetting } from '../../../common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-job-sub-status',
  templateUrl: './job-sub-status.component.html',
  styleUrls: ['./job-sub-status.component.css']
})
export class JobSubStatusComponent implements OnInit {
  @ViewChild(JobSubStatusAddOrUpdateComponent, {static: false}) jobSubStatusAddOrUpdate: JobSubStatusAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: JobSubStatusGetsRequest;
  jobSubStatuses: JobSubStatusModel[];

  constructor(
    private jobSubStatusService: JobSubStatusService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new JobSubStatusGetsRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.jobStatusId = param.get('jobstatusId');
      this.onSearch();
    });
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.jobSubStatusService.gets(this.searchParams);
      if (response.status) {
        this.jobSubStatuses = response.jobSubStatuses;
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
      this.jobSubStatusAddOrUpdate.id = id;
      this.jobSubStatusAddOrUpdate.jobStatusId = this.searchParams.jobStatusId;
      this.jobSubStatusAddOrUpdate.onGet();
      $('#jobSubStatus-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
