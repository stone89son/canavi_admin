import { Component, OnInit,Input } from '@angular/core';
import { CampaignjobserviceService } from 'src/app/services/canavi/campaign-job/campaignjobservice.service';
import { CanaviJobService } from 'src/app/services/canavi/jobs/canavi-job-service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CanaviJobGetByRecuiterIdRequest } from 'src/app/models/canavi/jobs/canavi-job-mapping-request';


declare var App: any;

export class Jobs {
  id: string;
  title: string;
  statusName:string;
  status:number;
}
@Component({
  selector: 'app-list-job-of-company',
  templateUrl: './list-job-of-company.component.html',
  styleUrls: ['./list-job-of-company.component.css']
})
export class ListJobOfCompanyComponent implements OnInit {
  @Input() companyId: string;

  constructor(private canaviJobService: CanaviJobService) { }
  jobs: Jobs[];
  selectedJob: string;
  titleJobSelect:string;
  isShowAddJob:boolean=false;
  isShowJob:boolean=true;
  ngOnInit() {
    this.getListJob();
  }

  async chooseJob(jobs:Jobs) {
    this.selectedJob = jobs.id;
    this.isShowAddJob = true;
    this.isShowJob = false;
    this.titleJobSelect=jobs.title;
  }

  async getListJob(){
    try {
      App.blockUI();

      let request = new CanaviJobGetByRecuiterIdRequest();
      request.recuiterId = this.companyId;
      request.pageIndex = 0;
      request.pageSize = 200;
      const response = await this.canaviJobService.getByRecuiterId(request);
      if (response.status) {
        this.jobs = response.jobs;

        if(this.jobs.length==0){
          ConfigSetting.ShowError("Công ty này không có Job");
        }

      }else{
        ConfigSetting.ShowError("lỗi xảy ra");
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async backStep(agreed: boolean){
    this.isShowAddJob = false;
    this.isShowJob = true;
  }

  
}
