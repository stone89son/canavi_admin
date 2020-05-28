import { Component, OnInit, ViewChild } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../../common/configSetting';
import { CanaviJobService } from '../../../../services/canavi/jobs/canavi-job-service';
import { CanaviJobGetByOriginalIdRequest } from '../../../../models/canavi/jobs/canavi-job-mapping-request';
import { CanaviJobMappingRequest } from '../../../../models/canavi/jobs/canavi-job-mapping-request';

declare var jQuery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'job-detail',
  templateUrl: './canavi.job-detail.component.html',
  styleUrls: ['./canavi.job-detail.component.css']
})

export class JobDetailComponent implements OnInit {

  token: string;
  searchParams: CanaviJobGetByOriginalIdRequest;
  paramMapping: CanaviJobMappingRequest;
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
    private canaviJobService: CanaviJobService) {
  }

  ngOnInit() {
    // this.token = ConfigSetting.GetAuthenToken;
    this.searchParams = new CanaviJobGetByOriginalIdRequest();
    this.paramMapping = new CanaviJobMappingRequest();
    this.searchParams.IsGetAtttribute = true;
    this.searchParams.IsGetListAttributeValue = true;
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

  async saveJob(): Promise<void> {
    try {
      App.blockUI();
      this.paramMapping.Id = this.dataDetail.id;
      this.paramMapping.Title = this.dataDetail.title;
      this.paramMapping.RecuiterId = this.dataDetail.recuiterId;
      this.paramMapping.Status = this.dataDetail.status;
      this.paramMapping.JobType = this.dataDetail.jobType;
      this.paramMapping.NeedToInterview = this.dataDetail.needToInterview;
      this.paramMapping.CandidateApplyCount = this.dataDetail.candidateApplyCount;
      this.paramMapping.RefCrawlerJobId = this.dataDetail.refCrawlerJobId;
      this.paramMapping.OriginalJobId = this.dataDetail.originalJobId;
      this.paramMapping.NumberSlot = this.dataDetail.numberSlot;
      this.paramMapping.SuggestCandidate = this.dataDetail.suggestCandidate;
      this.paramMapping.Commission = this.dataDetail.commission;
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
      const response = await this.canaviJobService.AddFromCrawler(this.paramMapping);
      if (response.status) {
        $('#modal-job-detail').modal('hide');
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
      this.paramMapping.Attributes = [];
      this.dataDetail = {};
      const response = await this.canaviJobService.GetByOriginal(this.searchParams);
      if (response.status) {
        this.dataDetail = response.job;
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
