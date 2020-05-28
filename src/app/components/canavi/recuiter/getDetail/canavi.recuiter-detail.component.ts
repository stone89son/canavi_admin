import { debug } from 'util';
import { Component, OnInit, ViewChild, Attribute } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../../common/configSetting';
import { CanaviRecuiterService } from '../../../../services/canavi/recuiter/canavi.recuiter.service';
import { RecuiterGetByIdRequest } from '../../../../models/canavi/recuiter/recuiter-getById-request';
import { FileUploadComponent } from '../../../../components/file-upload/file-upload.component';
import { FileUploadModel } from '../../../../models/upload/result-model';
import { RecuiterMappingRequest } from '../../../../models/crawler/recuiter/recuiter-mapping-request';
declare var jQuery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'recuiter-detail',
  templateUrl: './canavi.recuiter-detail.component.html',
  styleUrls: ['./canavi.recuiter-detail.component.css']
})

export class RecuiterDetailComponent implements OnInit {
  @ViewChild(FileUploadComponent, {static: false}) fileUpload: FileUploadComponent;
  token: string;
  searchParams: RecuiterGetByIdRequest;
  paramMapping: RecuiterMappingRequest;
  dataDetail: any;
  config = {
    height: '500px',
    allowedContent: true,
    extraPlugins: 'divarea',
    filebrowserBrowseUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload),
    filebrowserUploadUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload)
  };

  constructor(
    private oauthService: OAuthService,
    private canaviRecuiterService: CanaviRecuiterService
  ) {
  }

  ngOnInit() {
    // this.token = ConfigSetting.GetAuthenToken;
    this.searchParams = new RecuiterGetByIdRequest();
    this.paramMapping = new RecuiterMappingRequest();
    this.paramMapping.RecuiterMedias = [];
    this.paramMapping.Attributes = [];
    this.dataDetail = {};
  }

  changeValueCb(event, item) {
    if (item.attribute.attributeValues) {
      const lstPush = [];
      for (const it of item.attribute.attributeValues) {
        if (it.isCheck) {
          lstPush.push(it.id);
        }
      }
      if (lstPush.length > 0) {
        item.attributeValueIds = lstPush.join();
      }
    }
  }

  async saveRecuiter(): Promise<void> {
    try {
      App.blockUI();
      let imgPath = '';
      if (this.fileUpload.imagePath = '') {
        if (this.fileUpload.imageUrl !== '') {
          imgPath = this.fileUpload.imageUrl;
        }
      } else {
        imgPath = this.fileUpload.imageUrl;
      }
      const recuiterLogo = {
        MediaType: 1,
        MediaUrl: imgPath,
        Status: 1
      };
      this.paramMapping.RecuiterMedias.push(recuiterLogo);

      this.paramMapping.Id = this.dataDetail.id;
      this.paramMapping.Name = this.dataDetail.name;
      this.paramMapping.RefCrawlerRecuiterId = this.dataDetail.refCrawlerRecuiterId;
      this.paramMapping.ProfileCompletePercent = this.dataDetail.profileCompletePercent;
      this.paramMapping.Status = this.dataDetail.status;
      // Attribute
      for (const item of this.dataDetail.attributes) {
        const itemPush = {
          TargetId: this.dataDetail.id,
          TargetType: 1,
          AttributeId: item.attributeId,
          AttributeValueId: item.attributeValueId,
          ValueString: item.valueString,
          Status: item.status,
          GroupValue: '',
          ParentAttributeId: item.parentAttributeId,
          AttributeValueIds: item.attributeValueIds,
          Type: item.type,
          MinValue: item.minValue,
          MaxValue: item.maxValue,
          ValueNumber: item.valueNumber,
          ValueDateTime: item.valueDateTime
        };
        this.paramMapping.Attributes.push(itemPush);
      }
      const response = await this.canaviRecuiterService.AddFromCrawler(this.paramMapping);
      if (response.status) {
        $('#modal-recuiter-detail').modal('hide');
        ConfigSetting.ShowSuccess('Update Success!');
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async onSearchDetail(): Promise<void> {
    try {
      App.blockUI();
      this.paramMapping = new RecuiterMappingRequest();
      this.paramMapping.RecuiterMedias = [];
      this.paramMapping.Attributes = [];
      this.dataDetail = {};
      const response = await this.canaviRecuiterService.GetByOriginal(this.searchParams);
      if (response.status) {
        this.dataDetail = response.recuiter;
        if (this.dataDetail.attributes != null) {
          this.dataDetail.attributes.forEach(element => {
            element.userFilter = { value: '' };
          });
        }
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }
}
