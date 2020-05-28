import { Component, OnInit, ViewChild } from '@angular/core';
import { CanaviRecuiterSearchRequest, CanaviRecuiterSearchResponse } from 'src/app/models/canavi/recuiter/recuiter-request-search';
import { CanaviRecuiterService } from 'src/app/services/canavi/recuiter/canavi.recuiter.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CanaviRecuiterJobsComponent } from './canavi-recuiter-jobs/canavi-recuiter-jobs.component';
import { CanaviRecuiterDetailComponent } from './canavi-recuiter-detail/canavi-recuiter-detail.component';
import { CanaviRecuiterExternalProfileComponent } from './canavi-recuiter-external-profile/canavi-recuiter-external-profile.component';
import { CanaviRecuiterPaymentHistoryComponent } from './canavi-recuiter-payment-history/canavi-recuiter-payment-history.component';
import { CanaviRecuiterUserMappingComponent } from './canavi-recuiter-user-mapping/canavi-recuiter-user-mapping.component';
import {MatDialog} from '@angular/material/dialog';
import { StatusRecruiterDialogComponent } from './status-recruiter-dialog/status-recruiter-dialog.component';


declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-recuiter',
  templateUrl: './canavi-recuiter.component.html',
  styleUrls: ['./canavi-recuiter.component.css']
})
export class CanaviRecuiterComponent implements OnInit {
  @ViewChild(CanaviRecuiterJobsComponent, {static: false}) canaviRecuiterJobs: CanaviRecuiterJobsComponent;
  @ViewChild(CanaviRecuiterDetailComponent, {static: false}) canaviRecuiterDetailComponent: CanaviRecuiterDetailComponent;
  @ViewChild(CanaviRecuiterExternalProfileComponent, {static: false}) canaviRecuiterExternalProfileComponent: CanaviRecuiterExternalProfileComponent;
  @ViewChild(CanaviRecuiterPaymentHistoryComponent, {static: false}) canaviRecuiterPaymentHistoryComponent: CanaviRecuiterPaymentHistoryComponent;
  @ViewChild(CanaviRecuiterUserMappingComponent, {static: false}) canaviRecuiterUserMappingComponent: CanaviRecuiterUserMappingComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: CanaviRecuiterSearchRequest;
  recuiters: CanaviRecuiterSearchResponse[];

  constructor(
    private recuiterService: CanaviRecuiterService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.searchParams = new CanaviRecuiterSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.recuiterService.search(this.searchParams);
      if (response.status) {
        this.recuiters = response.recuiters;
        this.totalRow = response.totalRow;
      } else {
        this.totalRow = 0;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  pageChanged(page: number) {
    this.onSearch(page);
  }

  async onShowJobs(id: string): Promise<void> {
    try {
      this.canaviRecuiterJobs.searchParams.recuiterId = id;
      this.canaviRecuiterJobs.onGetByRecuiterId();
      $('#job-list').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async showDialogChangStatus(id: string,statusp:number):Promise<void>{
    const dialogRef = this.dialog.open(StatusRecruiterDialogComponent, {
      width: '350px',
      data: {idRecruiter : id,status : statusp}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      location.reload();
    });
  }

  async onShowFormDetail(id: string): Promise<void> {
    try {
      this.canaviRecuiterDetailComponent.request.id = id;
      this.canaviRecuiterDetailComponent.getDetail();
      $('#recuiter-detail').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowFormExternalProfile(id: string): Promise<void> {
    try {
      this.canaviRecuiterExternalProfileComponent.searchParams.recuiterId = id;
      this.canaviRecuiterExternalProfileComponent.onGetByRecuiterId();
      $('#recuiter-external-profile').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowFormPaymentHistory(id: string): Promise<void> {
    try {
      this.canaviRecuiterPaymentHistoryComponent.searchParams.recuiterId = id;
      this.canaviRecuiterPaymentHistoryComponent.onGetByRecuiterId();
      $('#recuiter-payment-history').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowFormUserMapping(id: string): Promise<void> {
    try {
      this.canaviRecuiterUserMappingComponent.searchParams.recuiterId = id;
      this.canaviRecuiterUserMappingComponent.onGetByRecuiterId();
      $('#recuiter-user-mapping').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
