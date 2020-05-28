import { Component, OnInit } from '@angular/core';
import { CanaviJobService } from 'src/app/services/canavi/jobs/canavi-job-service';
import { CanaviJobGetResponse } from 'src/app/models/canavi/jobs/canavi-job-model';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-recuiter-job-detail',
  templateUrl: './canavi-recuiter-job-detail.component.html',
  styleUrls: ['./canavi-recuiter-job-detail.component.css']
})
export class CanaviRecuiterJobDetailComponent implements OnInit {
  job: CanaviJobGetResponse;

  constructor(
    private jobService: CanaviJobService,
  ) { }

  ngOnInit() {
    this.job = new CanaviJobGetResponse();
  }

  async getDetail(id: string): Promise<void> {
    try {
      App.blockUI();
      const response = await this.jobService.getById(id);
      this.job = response.job;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    } finally {
      App.unblockUI();
    }
  }
}
