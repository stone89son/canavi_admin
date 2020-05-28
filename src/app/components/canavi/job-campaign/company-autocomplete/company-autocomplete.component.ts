import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CanaviRecuiterService } from 'src/app/services/canavi/recuiter/canavi.recuiter.service';
import { CanaviRecuiterSearchRequest, CanaviRecuiterGetRequest } from 'src/app/models/canavi/recuiter/recuiter-request-search';
import { ConfigSetting } from 'src/app/common/configSetting';
declare var App: any;
export class User {
  id: string;
  name: string;
  fullLogoUrl:string;
}
@Component({
  selector: 'app-company-autocomplete',
  templateUrl: './company-autocomplete.component.html',
  styleUrls: ['./company-autocomplete.component.css']
})
export class CompanyAutocompleteComponent implements OnInit {

  constructor(private CanaviRecuiterService: CanaviRecuiterService) { }
  keyWord: string;
  options: User[];
  isShowCompanyResult: boolean = false;
  isShowJobs: boolean = false;
  selectedCompany: string;
  selectedJob: string;
  ishowlistRecruiter:boolean = true;
  ngOnInit() {
  }
  async onSearch() {
    this.isShowJobs=false;

    let request = new CanaviRecuiterSearchRequest();
    request.name = this.keyWord;
    request.pageIndex = 0;
    request.pageSize = 5;
    try {
      App.blockUI();
      const response = await this.CanaviRecuiterService.search(request);
      if (response.status) {
        this.options = response.recuiters;
        if (this.options.length > 0) {
          this.ishowlistRecruiter=true;
          this.isShowCompanyResult = true;
        } else {
          this.isShowCompanyResult = false;
          this.ishowlistRecruiter=false;
          ConfigSetting.ShowError("Không có kết quả");
        }
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

  async chooseCompanyForGetJobs(company:User) {
    this.keyWord=company.name;
      this.selectedCompany=company.id;
      this.isShowJobs=true;
      this.ishowlistRecruiter=false;
  }

}
