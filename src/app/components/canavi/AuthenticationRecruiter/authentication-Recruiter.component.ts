import { Component, OnInit } from '@angular/core';
import { AuthenticationRecruiter, SearchType, CompanyAuthenticationSearch, CompanyAuthenticationChangeStatus } from 'src/app/models/canavi/authentication-recruiter/authentication-recruiter-model';
import { AuthenticationRecruiterSevice } from 'src/app/services/canavi/authentication-recruiter/authentication-recruiter.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var App: any;
declare var $: any;
@Component({
  selector: 'app-authentication-recruiter',
  templateUrl: './authentication-Recruiter.component.html',
  styleUrls: ['./authentication-Recruiter.component.css']
})
export class AppAuthenticationRecruiterComponent implements OnInit {
  searchTypes: SearchType[] = [
    { value: '1', viewValue: 'Nhà tuyển dụng' },
    { value: '0', viewValue: 'Người gửi yêu cầu' }
  ];
  displayedColumns: string[] = ['position', 'nameUser', 'phoneUser', 'emailUSer', 'nameCompany', 'authenticationCode', 'action'];
  dataSource: AuthenticationRecruiter[];
  searchParams: CompanyAuthenticationSearch;
  typeSearch: number;
  keywordSearch: string;
  constructor(
    private authenticationRecruiterSevice: AuthenticationRecruiterSevice,
  ) { }
  ngOnInit(): void {
    this.typeSearch = 1;
    this.keywordSearch = '';
    //
    this.onSearch('', 1);
  }
  async onSearch(keyword: string, type: number): Promise<void> {
    this.searchParams = new CompanyAuthenticationSearch();
    this.searchParams.keyword = keyword;
    this.searchParams.searchType = type;
    try {
      App.blockUI();
      const response = await this.authenticationRecruiterSevice.SearchCompanyAuthentication(this.searchParams);
      if (response.status) {
        this.dataSource = response.companyAuthentications;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async onPopupCompany(idRecruiter: string) {
    $('#informationCompany').modal();
  }

  async onChangeStatus(status: number, idCompany: string, idUser: string) {
    let request: CompanyAuthenticationChangeStatus = new CompanyAuthenticationChangeStatus();
    request.StatusClaim = status;
    request.RecruiterId = idCompany;
    request.UserId = idUser;
    try {
      App.blockUI();
      const response = await this.authenticationRecruiterSevice.ChangeStatusCompanyAuthentication(request);
      if (response.status) {


        ConfigSetting.ShowSuccess('thành công');
        //when change status done

        //
        this.onSearch('', 1);
      } else {
        ConfigSetting.ShowSuccess('có lỗi xảy ra');
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async redirectToProfileUrl(id: string) {
    window.open("https://canavi.com/Recruiter/Index?recuiterId=" + id, "_blank");
  }

}

