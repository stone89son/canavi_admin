import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { BannerItem } from 'src/app/models/marketing/banner-item/banner-item';
import { Banner } from 'src/app/models/marketing/banner/banner';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { BannerService } from 'src/app/services/marketing/banner/banner.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-banner-item-add-or-change',
  templateUrl: './banner-item-add-or-change.component.html',
  styleUrls: ['./banner-item-add-or-change.component.css']
})
export class BannerItemAddOrChangeComponent implements OnInit {
  @ViewChild(FileUploadComponent, {static: false}) fileUpload: FileUploadComponent;
  @Output() reloadBannerItemEvent = new EventEmitter();
  @ViewChild('bannerItemAddOrChange', {static: false}) bannerItemAddOrChange;
  bannerId: string;
  bannerItemId: string;
  bannerItem: BannerItem;
  banner: Banner;
  statuses: KeyValueModel[];
  submited: boolean;
  onGetDetailStatus: boolean;
  constructor(private bannerService: BannerService,
    private router: Router) { }

  ngOnInit() {
    this.bannerItem = new BannerItem();
    this.banner = new Banner();
    this.submited = false;
    if (jQuery().datetimepicker) {
      // $('#demo').datetimepicker({
      //   format: 'DD/MM/YYYY HH:mm:ss',
      // });
      $('.timepicker').datetimepicker({
        format: 'mm/dd/yyyy HH:mm',
      });
    }
  }

  async onGetDetail(): Promise<boolean> {
    if (this.onGetDetailStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onGetDetailStatus = true;
    App.blockUI();
    try {
      const response = await this.bannerService.getBannerItemById(this.bannerItemId, this.bannerId);
      if (response.status) {
        this.bannerItem = response.bannerItem;
        this.banner = response.banner;
        this.statuses = response.statuses;
        return true;
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
    return false;
  }

  async onAddOrChange(form): Promise<void> {
    if (this.submited) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        const img = this.fileUpload.imagePath;
        if (img !== '') { this.bannerItem.imageUrl = img; }
        const requestModel = this.bannerItem;
        if (requestModel.isDefault) {
          requestModel.startDate = '';
          requestModel.endDate = '';
        } 
        else {
          requestModel.startDate = $('input[name=\'startDate\']').val();
          requestModel.endDate = $('input[name=\'endDate\']').val();
        }
        if(requestModel.targetUrl == null){
          requestModel.targetUrl = "";
        }

        const response = await this.bannerService.saveBannerItem(requestModel);
        if (response.status) {
          $('#banner-item-add-or-change').modal('hide');
          ConfigSetting.ShowSuccess('Lưu thành công.');
          this.reloadBannerItemEvent.emit();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.submited = false;
    }

  }

  async onChangeImage(): Promise<void> {
    App.blockUI();
    try {
      $('#file-uploader-popup').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async getUploadedFile($event): Promise<void> {
    try {
      this.bannerItem.imageUrl = $event;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onSelectedCheckbox(): Promise<void> {
    try {
      $('input[name=\'startDate\']').val('');
      $('input[name=\'endDate\']').val('');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  resetForm() {
    this.bannerItemAddOrChange.resetForm();
  }
}

