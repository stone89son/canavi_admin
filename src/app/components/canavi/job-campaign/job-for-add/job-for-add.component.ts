import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JobCampaignAddRequest } from 'src/app/models/canavi/jobs/job-request/job-campaign-add-request';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CanaviJobService } from 'src/app/services/canavi/jobs/canavi-job-service';





declare var App: any;
@Component({
  selector: 'app-job-for-add',
  templateUrl: './job-for-add.component.html',
  styleUrls: ['./job-for-add.component.css']
})
export class JobForAddComponent implements OnInit {

  constructor(private canaviJobService: CanaviJobService) { }

  @Input() jobId: string;
  @Input() jobTitlte: string;
  @Output() backForward = new EventEmitter<boolean>();
  request: JobCampaignAddRequest;
  ngOnInit() {
    this.request = new JobCampaignAddRequest();
    this.request.jobId = this.jobId;
    this.request.displayOrder = 1;
    this.request.typeCampaign = 1;
    this.request.typeJob = 1;
  }

  async SaveJob() {
    try {
      App.blockUI();
      const response = await this.canaviJobService.JobCampaignAdd(this.request);
      if (response.status) {
        ConfigSetting.ShowSuccess("Thêm Job thành công");
        this.backForward.emit(true);
      } else {
        ConfigSetting.ShowError("Công ty này không có Job");
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async Back() { 
    this.backForward.emit(true);
  }

}
