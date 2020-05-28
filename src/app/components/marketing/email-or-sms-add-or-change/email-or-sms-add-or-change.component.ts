import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailOrSmsAddOrUpdateRequest } from 'src/app/models/marketing/email-or-sms/email-or-sms-add-or-update-request';
import { KeyValueModel } from 'src/app/models/result-model';
import { ConfigSetting } from 'src/app/common/configSetting';
import { EmailOrSmsService } from 'src/app/services/marketing/email-or-sms/email-or-sms.service';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-email-or-sms-add-or-change',
  templateUrl: './email-or-sms-add-or-change.component.html',
  styleUrls: ['./email-or-sms-add-or-change.component.css']
})
export class EmailOrSmsAddOrChangeComponent implements OnInit {
  @Output() reloadEmailOrSms = new EventEmitter<boolean>();
  model: EmailOrSmsAddOrUpdateRequest;
  statuses: KeyValueModel[];
  types: KeyValueModel[];
  messageTypes: KeyValueModel[];
  formValid = true;
  submitStatus = false;
  config = {
    height: '500px',
    allowedContent: true,
    extraPlugins: 'divarea',
    filebrowserBrowseUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload),
    filebrowserUploadUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload)
  };

  constructor(
    private emailOrSmsService: EmailOrSmsService
  ) { }

  ngOnInit() {
    this.ngInitData();
  }

  async ngInitData(): Promise<void> {
    if (this.model !== null && this.model !== undefined && this.model.id !== '0') {
      const response = await this.emailOrSmsService.get(this.model.id);
      this.model = response.emailSms;
    } else {
      this.model = new EmailOrSmsAddOrUpdateRequest();
      this.model.type = 0;
      this.model.messageType = 0;
    }

    $('.form_datetime').datetimepicker({
      autoclose: true,
      isRTL: App.isRTL(),
      format: 'mm/dd/yyyy hh:ii:ss',
      pickerPosition: (App.isRTL() ? 'bottom-right' : 'bottom-left')
    });
  }

  async onSubmit(form: any): Promise<void> {
    if (this.submitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.submitStatus = true;
    try {
      App.blockUI();
      this.formValid = form.valid;
      if (this.formValid) {
        const response = await this.emailOrSmsService.save(this.model);
        if (response.status) {
          $('#email-or-sms-add-or-change').modal('hide');
          this.reloadEmailOrSms.emit();
          this.model.id !== undefined
            ? ConfigSetting.ShowSuccess('Sửa thông tin thành công.')
            : ConfigSetting.ShowSuccess('Thêm thông tin thành công.');
        }
        App.unblockUI();
      } else {
        App.unblockUI();
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.submitStatus = false;
      App.unblockUI();
    }
  }
}
