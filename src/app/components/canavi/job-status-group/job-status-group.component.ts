import { Component, OnInit, ViewChild } from '@angular/core';
import { JobStatusGroupAddOrUpdateComponent } from './job-status-group-add-or-update/job-status-group-add-or-update.component';
import { JobStatusGroupGetsRequest, JobStatusGroupModel } from '../../../models/canavi/jobs/job-status-group-request';
import { JobStatusGroupService } from '../../../services/canavi/jobs/system.job-status-group.service';
import { ConfigSetting } from '../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-job-status-group',
  templateUrl: './job-status-group.component.html',
  styleUrls: ['./job-status-group.component.css']
})
export class JobStatusGroupComponent implements OnInit {
  @ViewChild(JobStatusGroupAddOrUpdateComponent, {static: false}) jobStatusGroupAddOrChange: JobStatusGroupAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: JobStatusGroupGetsRequest;
  jobStatusGroups: JobStatusGroupModel[];

  constructor(
    private jobStatusGroupService: JobStatusGroupService,
  ) { }

  ngOnInit() {
    this.searchParams = new JobStatusGroupGetsRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.jobStatusGroupService.gets(this.searchParams);
      if (response.status) {
        this.jobStatusGroups = response.jobStatusGroups;
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
      this.jobStatusGroupAddOrChange.id = id;
      this.jobStatusGroupAddOrChange.onGet();
      $('#jobStatusGroup-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
