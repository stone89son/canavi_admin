
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from 'src/app/models/marketing/banner/banner';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { BannerService } from 'src/app/services/marketing/banner/banner.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-banner-add-or-change',
  templateUrl: './banner-add-or-change.component.html',
  styleUrls: ['./banner-add-or-change.component.css']
})

export class BannerAddOrChangeComponent implements OnInit {
  @Input() bannerId: number;
  @Output() reloadBannerEvent = new EventEmitter();
  @ViewChild('bannerAddOrChange', {static: false}) bannerAddOrChange;
  banner: Banner;
  statuses: KeyValueModel[];
  pageTypes: KeyValueModel[];
  onGetDetailStatus: boolean;
  onAddOrChangeStatus: boolean;
  formValid: boolean;
  submited: boolean;
  constructor(
    private bannerService: BannerService,
    private router: Router
  ) { }


  ngOnInit() {
    this.banner = new Banner();
    this.formValid = true;
    this.submited = false;
  }

  async onGetDetail(): Promise<void> {
    if (this.onGetDetailStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetDetailStatus = true;
    if(!this.bannerId){
      this.bannerAddOrChange.resetForm();
    }
    try {
      const response = await this.bannerService.getBannerById(this.banner.id);
      if (response.status) {
        this.banner = response.banner;
        this.statuses = response.statuses;
        this.pageTypes = response.pageTypes;
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetDetailStatus = false;
      App.unblockUI();
    }
  }

  async onAddOrChange(form): Promise<void> {
    if (this.onAddOrChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    try {
      this.formValid = form.valid;
      if (this.formValid) {
        const requestModel = this.banner;
        const response = await this.bannerService.saveBanner(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess('Lưu thành công.');
          $('#banner-add-or-change').modal('hide');
          this.reloadBannerEvent.emit();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onAddOrChangeStatus = false;
      App.unblockUI();
    }
  }
}
