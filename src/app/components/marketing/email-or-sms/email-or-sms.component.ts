import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmailOrSmsAddOrChangeComponent } from '../email-or-sms-add-or-change/email-or-sms-add-or-change.component';
import { EmailOrSmsSearchRequestModel } from 'src/app/models/marketing/email-or-sms/email-or-sms-search-request-model';
import { EmailOrSmsModel } from 'src/app/models/marketing/email-or-sms/email-or-sms-model';
import { KeyValueModel } from 'src/app/models/result-model';
import { Dictionary } from 'src/app/models/dictionary';
import { EmailOrSmsService } from 'src/app/services/marketing/email-or-sms/email-or-sms.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-email-or-sms',
  templateUrl: './email-or-sms.component.html',
  styleUrls: ['./email-or-sms.component.css']
})
export class EmailOrSmsComponent implements OnInit {
  @ViewChild(EmailOrSmsAddOrChangeComponent, {static: false}) emailOrSmsAddOrChange: EmailOrSmsAddOrChangeComponent;
  searchParams: EmailOrSmsSearchRequestModel;
  emailSmses: EmailOrSmsModel[];
  emailStatuses: KeyValueModel[];
  emailTypes: KeyValueModel[];
  emailMessageTypes: KeyValueModel[];
  showAddNew = false;
  formValid = true;
  submitStatus = false;
  rowEdits: Dictionary<boolean>;
  row: Dictionary<boolean>;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  id: string;
  statusEnum: number;
  onChangeStatusSubmit: boolean;

  constructor(
    private emailOrSmsService: EmailOrSmsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.searchParams = new EmailOrSmsSearchRequestModel();
    this.searchParams.status = 0;
    this.searchParams.type = 0;
    this.searchParams.messageType = 0;
    this.emailStatuses = [];
    this.emailTypes = [];
    this.emailMessageTypes = [];
    this.rowEdits = new Dictionary<boolean>();
    this.onSearch();
  }

  async onSearch(): Promise<void> {
    try {
      const response = await this.emailOrSmsService.search(this.searchParams);
      this.emailSmses = response.emailSmses as EmailOrSmsModel[];
      this.emailStatuses = response.emailStatuses;
      this.emailTypes = response.emailTypes;
      this.emailMessageTypes = response.emailMessageTypes;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onAddOrUpdate(id: string): Promise<void> {
    if (this.submitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.submitStatus = true;
    try {
      App.blockUI();

      this.emailOrSmsAddOrChange.model.id = id;
      this.emailOrSmsAddOrChange.statuses = this.emailStatuses;
      this.emailOrSmsAddOrChange.types = this.emailTypes;
      this.emailOrSmsAddOrChange.messageTypes = this.emailMessageTypes;
      this.emailOrSmsAddOrChange.ngInitData();
      $('#email-or-sms-add-or-change').modal('show');

      App.unblockUI();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.submitStatus = false;
      App.unblockUI();
    }
  }

  async onGetDetail(id: string): Promise<void> {
    App.blockUI();
    try {
      if (id !== '') {
        this.router.navigateByUrl(ConfigSetting.EmailSmsDetailPage + id);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }

  async onGetVerifyDetail(id: string): Promise<void> {
    App.blockUI();
    try {
      if (id !== '') {
        this.router.navigateByUrl(ConfigSetting.EmailSmsVerifyDetailPage + id);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }

  onShowFormConfirm(id: string, statusEnum: number) {
    this.id = id;
    this.statusEnum = statusEnum;
    $('#confirm-form').modal('show');
  }

  async onChangeStatus() {
    if (this.onChangeStatusSubmit) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onChangeStatusSubmit = true;
    App.blockUI();
    try {
      const response = await this.emailOrSmsService.changeStatus(this.id, this.statusEnum);
      if (response.status) {
          ConfigSetting.ShowSuccess('Save success.');
          await this.onSearch();
          $('#confirm-form').modal('hide');
      } else {
          ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onChangeStatusSubmit = false;
      App.unblockUI();
    }
  }
}
