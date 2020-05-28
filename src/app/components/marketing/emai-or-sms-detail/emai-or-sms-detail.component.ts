import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmailOrSmsModel } from 'src/app/models/marketing/email-or-sms/email-or-sms-model';
import { EmailOrSmsService } from 'src/app/services/marketing/email-or-sms/email-or-sms.service';
import { ConfigSetting } from 'src/app/common/configSetting';

@Component({
  selector: 'app-emai-or-sms-detail',
  templateUrl: './emai-or-sms-detail.component.html',
  styleUrls: ['./emai-or-sms-detail.component.css']
})
export class EmaiOrSmsDetailComponent implements OnInit {
  emailSms: EmailOrSmsModel;
  constructor(
    private router: ActivatedRoute,
    private emailOrSmsService: EmailOrSmsService
  ) { }

  ngOnInit() {
    this.emailSms = new EmailOrSmsModel();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.onGet(param.get('id'));
    });
  }

  async onGet(id: string): Promise<void> {
    try {
      const response = await this.emailOrSmsService.get(id);
      this.emailSms = response.emailSms;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
