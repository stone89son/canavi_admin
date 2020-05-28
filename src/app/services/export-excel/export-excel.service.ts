import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ExportReportRequest } from "src/app/models/marketing/export-report/export-report";
import { ConfigSetting } from "src/app/common/configSetting";
import { HttpClientService } from "src/app/common/http-client.service";

const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable()
export class ExcelService {
  constructor(private httpClient: HttpClientService) {}

  public async exportAsExcelFile(json: any[], excelFileName: string): Promise<void> {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    await this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private async saveAsExcelFile(buffer: any, fileName: string): Promise<void> {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    await FileSaver.saveAs(
      data,
      fileName + "_Export_" + EXCEL_EXTENSION
    );
  }

  async getReportLiveCV(sd: string, ed: string): Promise<any> {
    let request = new ExportReportRequest();
    request.startDate = sd;
    request.endDate = ed;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathExportReportLiveCV,
      request
    );
    let result = response as any;
    return result;
  }

  async getReportUserCVAndApply(sd: string, ed: string): Promise<any> {
    let request = new ExportReportRequest();
    request.startDate = sd;
    request.endDate = ed;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathExportReportUserCVAndApply,
      request
    );
    let result = response as any;
    return result;
  }

  async getReportRecruiter(sd: string, ed: string): Promise<any> {
    let request = new ExportReportRequest();
    request.startDate = sd;
    request.endDate = ed;

    let response = await this.httpClient.postJsonWithAuthen(
      ConfigSetting.UrlPathExportReportRecruiter,
      request
    );
    let result = response as any;
    return result;
  }
}
