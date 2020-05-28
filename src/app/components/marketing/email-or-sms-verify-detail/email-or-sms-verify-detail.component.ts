import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmailOrSmsService } from 'src/app/services/marketing/email-or-sms/email-or-sms.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { VerifyModel } from 'src/app/models/marketing/email-or-sms/verify-model';

@Component({
  selector: 'app-email-or-sms-verify-detail',
  templateUrl: './email-or-sms-verify-detail.component.html',
  styleUrls: ['./email-or-sms-verify-detail.component.css']
})
export class EmailOrSmsVerifyDetailComponent implements OnInit {
  verify: VerifyModel;
  constructor(
    private router: ActivatedRoute,
    private emailOrSmsService: EmailOrSmsService
  ) { }

  ngOnInit() {
    this.verify = new VerifyModel();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.onGet(param.get('id'));
    });
  }

  async onGet(id: string): Promise<void> {
    try {
      const response = await this.emailOrSmsService.getVerify(id);
      this.verify = response.verify;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
