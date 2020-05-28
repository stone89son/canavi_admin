import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
import { CanaviCandidateService } from 'src/app/services/canavi/candidate/canavi-candidate-service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CandidateGetByJobCampaignRequest } from 'src/app/models/canavi/candidate/candidate-search-model';

declare var App: any;
export class CandidateCampaignModel {
  name: string;
  phone: string;

  email: string;
  location: string;
  applyDateTime: string;
}

export interface DialogData {
  jobId: string;
}

@Component({
  selector: 'app-candidates-apply-job',
  templateUrl: './candidates-apply-job.component.html',
  styleUrls: ['./candidates-apply-job.component.css']
})
export class CandidatesApplyJobComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CandidatesApplyJobComponent>,
    private canaviCandidateService: CanaviCandidateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  result: CandidateCampaignModel[];
  ngOnInit() {
    this.SearchCandidate();
  }
  displayedColumns: string[] = ['name', 'phone', 'email', 'location','dateTime'];
  async SearchCandidate() {
    
    try {
      App.blockUI();
      let req = new CandidateGetByJobCampaignRequest();
      req.jobId=this.data.jobId;
      const response = await this.canaviCandidateService.searchCandidateCampaign(req);
      if (response.status) {
        this.result = response.candidates;
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

}
