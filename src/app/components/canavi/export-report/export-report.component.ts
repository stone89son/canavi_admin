import { Component, OnInit, NgModule, ViewChild } from "@angular/core";
import { ConfigSetting } from "src/app/common/configSetting";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ExcelService } from "src/app/services/export-excel/export-excel.service";
import {
  ReportLiveCVResponse,
  ExportReportRequest
} from "src/app/models/marketing/export-report/export-report";
import { FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";

declare var App: any;
declare var $: any;

export interface ReportData {
  stt: string;
  name: string;
  description: string;
}

/** Constants used to fill up our data base. */
const NameReports: string[] = [
  "LiveCV(*)",
  "Tải App",
  "WebPush & AppPush",
  "Recruiter(*)",
  "Notification Remind",
  "InformationJobApplyOfCandidate(*)"
];
const DescriptionReports: string[] = [
  "Thông tin chi tiết từng CV đã tạo trong tuần và update tình trạng CV",
  "Số lượng tải app / gỡ app trong tuần / tháng",
  "Số lượng sending, open rate",
  "Thông tin recruiter mới trong tuần",
  "Số lượng click, tỉ lệ hoàn thiện, timeline hoàn thiện, (sau bao lâu từ khi gửi noti user mới thực hiện)",
  "Lượng user trong hệ thống và thông tin job ứng tuyển trong khoảng thời gian"
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: "app-export-report",
  templateUrl: "./export-report.component.html",
  styleUrls: ["./export-report.component.css"]
})
export class ExportReportComponent implements OnInit {
  displayedColumns: string[] = ["stt", "name", "description", "action"];
  dataSource: MatTableDataSource<ReportData>;
  typeReport: number;
  reportLiveCVs: any = [];
  reportUserCVAndApplys: any = [];
  reportRecruiters: any = [];
  //
  endDate = new FormControl(new Date());
  dateNow = new Date();
  startDate = new FormControl(new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() - 1, this.dateNow.getDate()));
  //
  minDateSD = new Date(2000, 0, 1);
  maxDateSD = new Date();
  minDateED = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() - 1, this.dateNow.getDate());
  maxDateED = new Date(this.dateNow.getFullYear() + 1, this.dateNow.getMonth(), this.dateNow.getDate());

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private excelService: ExcelService,
    public datepipe: DatePipe) {
    // Create data
    const reports = Array.from({ length: NameReports.length }, (_, k) =>
      createData(k)
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(reports);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async exportToExcel(typeReport: number): Promise<void> {
    if (typeReport == 1) {
      //LiveCVReport
      await this.getReportLiveCV();
      if (this.reportLiveCVs.length > 0) {
        this.excelService.exportAsExcelFile(this.reportLiveCVs, "ReportLiveCV"); //Export
      } 
      else {
        ConfigSetting.ShowError("Không có dữ liệu để xuất báo cáo");
      }
    } 
    else if(typeReport == 6){
      //UserCV & StatusApply
      await this.getReportUserCVAndApply();
      if (this.reportUserCVAndApplys.length > 0) {
        this.excelService.exportAsExcelFile(this.reportUserCVAndApplys, "ReportUserAndJobCountApply"); //Export
      } 
      else {
        ConfigSetting.ShowError("Không có dữ liệu để xuất báo cáo");
      }
    }
    else if(typeReport == 4){
      //Recruiter
      await this.getReportRecruiter();
      if (this.reportRecruiters.length > 0) {
        this.excelService.exportAsExcelFile(this.reportRecruiters, "ReportRecruiter"); //Export
      } 
      else {
        ConfigSetting.ShowError("Không có dữ liệu để xuất báo cáo");
      }
    }
    else {
      ConfigSetting.ShowError("Không có dữ liệu để xuất báo cáo");
    }
  }

  async getReportLiveCV(): Promise<void> {
    App.blockUI();
    try {
      let startDateValue = convertToDateTimeString(this.startDate);
      let endDateValue = convertToDateTimeString(this.endDate);
      //
      const response = await this.excelService.getReportLiveCV(startDateValue, endDateValue);

      if (response.liveCVs.length > 0) {
        let index = 1;
        this.reportLiveCVs = [];
        response.liveCVs.forEach(items => {
          this.reportLiveCVs.push({
            Stt: index,
            "Họ và tên": items.candidateName,
            "Số điện thoại": items.phone,
            "Email": items.email,
            "Tên loại CV": items.templateName,
            "Ngành nghề quan tâm": items.listCategory,
            "Link CV": items.urlCV,
            "Thời gian tạo": items.createTimeText,
            "Tình trạng ứng tuyển": items.isApply == true ? "Đã ứng tuyển" : "Chưa ứng tuyển cv nào",
            "utmSource" : items.utmSource,
            "utmCampaign" : items.utmCampaign,
            "utmMedium" : items.utmMedium
          });
          index++;
        });
      }
    } 
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async getReportUserCVAndApply(): Promise<void> {
    App.blockUI();
    try {
      let startDateValue = convertToDateTimeString(this.startDate);
      let endDateValue = convertToDateTimeString(this.endDate);
      //
      const response = await this.excelService.getReportUserCVAndApply(startDateValue, endDateValue);

      if (response.userCVAndApplys.length > 0) {
        let index = 1;
        this.reportUserCVAndApplys = [];
        response.userCVAndApplys.forEach(items => {
          this.reportUserCVAndApplys.push({
            "Stt": index,
            "Họ và tên": items.candidateName,
            "Số điện thoại": items.phone,
            "Email": items.email,
            "Thời gian ứng tuyển": items.applyTimeText,
            "Link job ứng tuyển": items.urlJob,
            "utmSource" : items.utmSource,
            "utmCampaign" : items.utmCampaign,
            "utmMedium" : items.utmMedium
          });
          index++;
        });
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async getReportRecruiter(): Promise<void>{
    App.blockUI();
    try {
      let startDateValue = convertToDateTimeString(this.startDate);
      let endDateValue = convertToDateTimeString(this.endDate);
      //
      const response = await this.excelService.getReportRecruiter(startDateValue, endDateValue);

      if (response.recruiters.length > 0) {
        let index = 1;
        this.reportRecruiters = [];
        response.recruiters.forEach(items => {
          this.reportRecruiters.push({
            Stt: index,
            "Id": items.recruiterId,
            "Tên nhà tuyển dụng": items.recruiterName,
            "Số điện thoại": items.recruiterPhone,
            "Email": items.recruiterEmail,
            "Thời gian tạo": items.recruiterCreateTimeText,
            "Url": items.recruiterUrlText
          });
          index++;
        });
      }
    } 
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  onChangeDateTime(time: any, type: number) {
    App.blockUI();
    if(type == 1){ //startdate change
      this.minDateED = new Date(time._i.year, time._i.month, time._i.date);
    }
    else{ //enddate change
      this.maxDateSD = new Date(time._i.year, time._i.month, time._i.date);
      this.maxDateED = new Date(time._i.year + 1, time._i.month, time._i.date);
    }
    App.unblockUI();
  }
}

/** Builds and returns a new User. */
function createData(id: number): ReportData {
  const name = NameReports[id];
  const description = DescriptionReports[id];

  return {
    stt: (id + 1).toString(),
    name: name,
    description: description
  };
}

function convertToDateTimeString(rs: FormControl): string{
  let str = "";
  if(rs.touched){
    str = rs.value._d;
  }
  else{
    str = rs.value;
  }
  let res = new Date(str);
  return is2DigritNumberic(res.getDate()) + "/" + is2DigritNumberic((res.getMonth() + 1)) + "/" + res.getFullYear();
}

function is2DigritNumberic(nb: number): string{
  if(nb > 0 && nb < 10){
    return "0" + nb.toString();
  }
  return nb.toString();
}
