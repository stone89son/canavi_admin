import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogDataRecruiterStatus } from 'src/app/models/canavi/recuiter/dialog-data-recruiter-status';
import { CompanyChangeStatus } from 'src/app/models/canavi/manage-company/company-change-status';
import { ManageCompanyService } from 'src/app/services/canavi/manage-company/manage-company.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var App: any;

export interface StatusCompany {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-status-recruiter-dialog',
  templateUrl: './status-recruiter-dialog.component.html',
  styleUrls: ['./status-recruiter-dialog.component.css']
})
export class StatusRecruiterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StatusRecruiterDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogDataRecruiterStatus,
  private manageCompanyService: ManageCompanyService) { }
  
  ngOnInit() {
    // this.data.idRecruiter+="- dai -";
    // this.data.status;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  statusCompany: StatusCompany[] = [
    { value: 1, viewValue: 'Đang Active' },
    { value: 2, viewValue: 'Dừng Active' },
    { value: 3, viewValue: 'Mới tạo' },
    { value: -1, viewValue: 'Xóa' }
  ];
  companyChangeStatus: CompanyChangeStatus;

  async ChangeStatus(){

    try {
      App.blockUI();
      this.companyChangeStatus=new CompanyChangeStatus();
      this.companyChangeStatus.id=this.data.idRecruiter;
      this.companyChangeStatus.status=this.data.status;
      const response = await this.manageCompanyService.ChangeStatusCompany(this.companyChangeStatus);
      if (response.status) {
        ConfigSetting.ShowSuccess("Thành công");
      }else{
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
