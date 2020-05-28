import { Component, OnInit } from '@angular/core';
import { CanaviRecuiterService } from 'src/app/services/canavi/recuiter/canavi.recuiter.service';
import { CanaviRecuiterGetRequest, CanaviRecuiterSearchResponse } from 'src/app/models/canavi/recuiter/recuiter-request-search';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-recuiter-detail',
  templateUrl: './canavi-recuiter-detail.component.html',
  styleUrls: ['./canavi-recuiter-detail.component.css']
})
export class CanaviRecuiterDetailComponent implements OnInit {
  request: CanaviRecuiterGetRequest;
  recuiter: CanaviRecuiterSearchResponse;

  constructor(
    private recuiterService: CanaviRecuiterService,
  ) { }

  ngOnInit() {
    this.request = new CanaviRecuiterGetRequest();
    this.recuiter = new CanaviRecuiterSearchResponse();
  }

  async getDetail(): Promise<void> {
    try {
      App.blockUI();
      const response = await this.recuiterService.getById(this.request);
      this.recuiter = response.recuiter;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    } finally {
      App.unblockUI();
    }
  }
}
