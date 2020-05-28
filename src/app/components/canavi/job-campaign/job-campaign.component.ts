import { CampaignjobserviceService } from 'src/app/services/canavi/campaign-job/campaignjobservice.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobComponentAddComponent } from './job-component-add/job-component-add.component';
import { CanaviJobService } from 'src/app/services/canavi/jobs/canavi-job-service';
import { CanaviCandidateService } from 'src/app/services/canavi/candidate/canavi-candidate-service';
import { CandidateSearchRequest } from 'src/app/models/canavi/candidate/candidate-search-model';
import { CandidateCampaignModel } from 'src/app/models/canavi/candidate/candidate-campaign-model';
import { JobCampaignAddRequest } from 'src/app/models/canavi/jobs/job-request/job-campaign-add-request';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CandidatesApplyJobComponent } from './candidates-apply-job/candidates-apply-job.component';
import { Jobcampaignchangestatusrequest } from 'src/app/models/canavi/jobs/job-request/jobcampaignchangestatusrequest';
import { config } from 'rxjs';

declare var App: any;

export interface typeJob {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-job-campaign',
  templateUrl: './job-campaign.component.html',
  styleUrls: ['./job-campaign.component.css']
})
export class JobCampaignComponent implements OnInit {
  constructor(private CanaviJobService: CanaviJobService, private canaviCandidateService: CanaviCandidateService,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.jobCampaignAddRequest = new JobCampaignAddRequest();
    this.searchRequest = new CandidateSearchRequest();
    this.SearchCandidate();
    
  }
  jobCampaignAddRequest: JobCampaignAddRequest;
  @ViewChild(FileUploadComponent, { static: false }) fileUpload: FileUploadComponent;
  foods: typeJob[] = [
    { value: 1, viewValue: 'Việc làm thời vụ' },
    { value: 2, viewValue: 'Việc làm không cần kinh nghiệm' },
    { value: 3, viewValue: 'việc làm chuyên môn' }
  ];
  searchRequest: CandidateSearchRequest;
  //CandidateCampaignModel
  listJobCampaignResult:CandidateCampaignModel[];
  dataSource = new MatTableDataSource<CandidateCampaignModel>();
  displayedColumns: string[] = ['jobTitle', 'companyName', 'candidateCount', 'jobType','location','status'];
  pageIndexPara:number=0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  async SearchCandidate() {
    try {
      App.blockUI();
      let req=new JobCampaignAddRequest();
      const response = await this.CanaviJobService.GetJobCampaign(req);
      if (response.status) {
        this.listJobCampaignResult= response.jobs;
        this.dataSource = new MatTableDataSource<CandidateCampaignModel>(this.listJobCampaignResult);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        ConfigSetting.ShowError("Thất bại");
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async changeStatus(id:string,status:number){
    try {
      App.blockUI();
      let req=new Jobcampaignchangestatusrequest();
      req.id=id;
      req.status=status;
      const response = await this.CanaviJobService.Jobcampaignchangestatus(req);
      if (response.status) {
        ConfigSetting.ShowSuccess("Đổi trạng thái thành công");
      } else {
        ConfigSetting.ShowError("Thất bại");
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  async ShowDialogAddJobCampaign() {
    const dialogRef = this.dialog.open(JobComponentAddComponent, {
      width: '700px'
    });
  }

  async ShowDialogListCandidateApply(jobId:string) {
    const dialogRef = this.dialog.open(CandidatesApplyJobComponent, {
      data:{jobId:jobId},
      width: '700px'
    });
  }
}
