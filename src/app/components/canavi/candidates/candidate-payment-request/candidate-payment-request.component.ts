import { Component, OnInit } from '@angular/core';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CandidatePaymentRequestSearchRequest, CandidatePaymentRequestSearchResponse } from 'src/app/models/canavi/candidate/candidate-payment-request-model';
import { CandidatePaymentRequestService } from 'src/app/services/canavi/candidate/candidate-payment-request-service';
import { KeyValueModel } from 'src/app/models/upload/result-model';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-candidate-payment-request',
  templateUrl: './candidate-payment-request.component.html',
  styleUrls: ['./candidate-payment-request.component.css']
})
export class CandidatePaymentRequestComponent implements OnInit {
  searchParams: CandidatePaymentRequestSearchRequest;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  candidatePaymentRequests: CandidatePaymentRequestSearchResponse[];
  paymentTypes: KeyValueModel[];
  onChangeStatus = false;

  constructor(
    private candidatePaymentRequestService: CandidatePaymentRequestService,
  ) { }

  ngOnInit() {
    this.searchParams = new CandidatePaymentRequestSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.candidatePaymentRequestService.search(this.searchParams);
      if (response.status) {
        this.candidatePaymentRequests = response.candidatePaymentRequests;
        this.paymentTypes = response.paymentTypes;
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

  async onAccepted(id: string): Promise<void> {
    if (this.onChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onChangeStatus = true;
    App.blockUI();
    try {
      const response = await this.candidatePaymentRequestService.accepted(id);
      if (response.status) {
        this.onSearch();
        ConfigSetting.ShowSuccess('Accepted success.');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onChangeStatus = false;
      App.unblockUI();
    }
  }

  async onReject(id: string): Promise<void> {
    if (this.onChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onChangeStatus = true;
    App.blockUI();
    try {
      const response = await this.candidatePaymentRequestService.reject(id);
      if (response.status) {
        this.onSearch();
        ConfigSetting.ShowSuccess('Accepted success.');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onChangeStatus = false;
      App.unblockUI();
    }
  }

  async onCancel(id: string): Promise<void> {
    if (this.onChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onChangeStatus = true;
    App.blockUI();
    try {
      const response = await this.candidatePaymentRequestService.cancel(id);
      if (response.status) {
        this.onSearch();
        ConfigSetting.ShowSuccess('Accepted success.');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onChangeStatus = false;
      App.unblockUI();
    }
  }
}
