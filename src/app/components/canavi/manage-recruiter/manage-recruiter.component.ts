import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/canavi/manage-company/company';
import { CompanyGetsRequest } from 'src/app/models/canavi/manage-company/company-gets-request';
import { ManageCompanyService } from 'src/app/services/canavi/manage-company/manage-company.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { MatSelectModule } from '@angular/material/select';
import { CompanyChangeStatus } from 'src/app/models/canavi/manage-company/company-change-status';
declare var App: any;
export interface StatusCompany {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-manage-recruiter',
  templateUrl: './manage-recruiter.component.html',
  styleUrls: ['./manage-recruiter.component.css']
})
export class ManageRecruiterComponent implements OnInit {

  constructor(private manageCompanyService: ManageCompanyService) { }

  displayedColumns: string[] = ['position', 'companyName', 'totalJob', 'action','delete'];
  ngOnInit() {
    this.companyRequest = new CompanyGetsRequest();
    this.companyChangeStatus = new CompanyChangeStatus();
    this.companyRequest.Name = "";
    this.companyRequest.PageIndex = 0;
    this.companyRequest.PageSize = 10;
    this.onSearch();
  }
  dataSource: Company[];
  companyRequest: CompanyGetsRequest;
  companyChangeStatus: CompanyChangeStatus;
  statusCompany: StatusCompany[] = [
    { value: 1, viewValue: 'Đang Active' },
    { value: 2, viewValue: 'Dừng Active' },
    { value: 3, viewValue: 'Mới tạo' },
    { value: -1, viewValue: 'Xóa' }
  ];
  async onSearch(): Promise<void> {

    try {
      App.blockUI();
      const response = await this.manageCompanyService.SearchCompany(this.companyRequest);
      if (response.status) {
        let listRecruiter = response.recuiters;
        let stt = 1;
        let lst: Company[] = [];
        listRecruiter.forEach(function (value) {
          let record: Company = new Company();
          record.companyName = value.name;
          record.position = stt++;
          record.status = value.status;
          record.totalJob = value.jobCount;
          record.id=value.id;
          lst.push(record);
        });
        this.dataSource = lst;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }

  }

  async onChangeStatus(status: number, idRecruiter: string): Promise<void> {

    try {
      App.blockUI();
      this.companyChangeStatus.status = status;
      this.companyChangeStatus.id = idRecruiter;
      const response = await this.manageCompanyService.ChangeStatusCompany(this.companyChangeStatus);
      if (response.status) {
        ConfigSetting.ShowSuccess("Thành công");
        this.onSearch();
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
