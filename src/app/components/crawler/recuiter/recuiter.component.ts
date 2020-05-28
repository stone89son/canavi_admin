import { Component, OnInit, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../common/configSetting';
import { WebsiteService } from '../../../services/crawler/website/crawler.website.service';
import { RecuiterService } from '../../../services/crawler/recuiter/crawler.recuiter.service';
import { RecuiterSearchRequest } from '../../../models/crawler/recuiter/recuiter-search-request';
import { RecuiterMappingRequest } from '../../../models/crawler/recuiter/recuiter-mapping-request';
import { JobComponent } from '../../../components/crawler/job/job.component';
import { WebsiteSearchRequest } from '../../../models/crawler/website-request';
import { CanaviRecuiterService } from '../../../services/canavi/recuiter/canavi.recuiter.service';
import { CanaviAttributeValueService } from '../../../services/canavi/attribute-value/canavi-attribute-value-service';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';
import { CrawlerMappingAttributeService } from '../../../services/crawler/mapping-attribute/crawler.mapping-attribute-service';
import { MappingAttributeGetRequest } from '../../../models/crawler/mapping-attribute/mapping-attribute-get-request';
import { RecuiterDetailComponent } from '../../canavi/recuiter/getDetail/canavi.recuiter-detail.component';
import { MultipleFileUploadComponent } from '../../multiple-file-upload/multiple-file-upload.component';
import { FileUploadModel } from '../../../models/upload/result-model';
import { debug } from 'util';

declare var jQuery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'recuiter',
  templateUrl: './recuiter.component.html',
  styleUrls: ['./recuiter.component.css']
})

export class RecuiterComponent implements OnInit {
  @ViewChild(JobComponent, {static: false}) job: JobComponent;
  @ViewChild(FileUploadComponent, {static: false}) fileUpload: FileUploadComponent;
  @ViewChild(RecuiterDetailComponent, {static: false}) recuiterDetail: RecuiterDetailComponent;
  @ViewChild(MultipleFileUploadComponent, {static: false}) multipleFileUpload: MultipleFileUploadComponent;

  token: string;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: RecuiterSearchRequest;
  searchParamsWebsite: WebsiteSearchRequest;
  paramMapping: RecuiterMappingRequest;
  dataCrawlerMappingAttribute: any;
  data: any;
  dataWebsite: any;
  objectItem: any;
  objectMap: any;
  ids: any;
  paramCrawlerMappingAttribute: MappingAttributeGetRequest;
  uploadedFiles: FileUploadModel[];
  config = {
    height: '200px',
    allowedContent: true,
    extraPlugins: 'divarea',
    filebrowserBrowseUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload),
    filebrowserUploadUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload)
  };
  onSearchStatus: boolean;

  constructor(
    private oauthService: OAuthService,
    private recuiterService: RecuiterService,
    private websiteService: WebsiteService,
    private canaviRecuiterService: CanaviRecuiterService,
    private canaviAttributeValueService: CanaviAttributeValueService,
    private crawlerMappingAttributeService: CrawlerMappingAttributeService
  ) {
  }

  ngOnInit() {
    // this.token = ConfigSetting.GetAuthenToken;
    this.searchParams = new RecuiterSearchRequest();
    this.searchParams.websiteId = '';
    this.searchParams.status = '1';
    this.searchParams.mapstatus = '0';
    this.searchParams.fromPage = 1;
    this.searchParams.toPage = 5;
    this.searchParamsWebsite = new WebsiteSearchRequest();
    this.paramMapping = new RecuiterMappingRequest();
    this.paramCrawlerMappingAttribute = new MappingAttributeGetRequest();
    this.dataCrawlerMappingAttribute = [];
    this.data = [];
    this.objectItem = {};
    this.objectMap = {};
    this.onRegisterAttributeValue();
    this.onSearch();
    this.getWebsite();
    if (this.multipleFileUpload != null && this.multipleFileUpload != undefined)    {
      this.uploadedFiles = this.multipleFileUpload.files;    
    }   
    else
    {
      this.uploadedFiles = [];
    }

  }

  async getWebsite(): Promise<void> {
    try {
      App.blockUI();
      this.searchParamsWebsite.name = '';
      const response = await this.websiteService.search(this.searchParamsWebsite);
      if (response.status) {
        this.dataWebsite = response.websites;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const attributeValueSelected = $('#attributeValueIdAutocomplete').select2('data');
      const attributeIds = [];
      attributeValueSelected.forEach(element => {
        attributeIds.push(element.id);
      });
      this.searchParams.attributeValueIds = attributeIds;
      const response = await this.recuiterService.search(this.searchParams);
      if (response.status) {
        this.data = response.recuiters;
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

  // region Attribute value
  async onRegisterAttributeValue(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#attributeValueIdAutocomplete',
        ConfigSetting.UrlPathCrawlerSearchSelectAttributeValues,
        this.createParametersFunAttributeValue,
        $this,
        'Search attribute value',
        this.processResultsAttributeValue,
        this.formatRepoAttributeValue,
        this.formatRepoSelectionAttributeValue,
        this.selectAttributeValueEvent,
        null,
        0,
        250,
        false
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  createParametersFunAttributeValue(params, $this) {
    const query = {
      value: params.term,
      attributeId: $this.searchParams.attributeId
    };
    return query;
  }
  formatRepoAttributeValue(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionAttributeValue(repo) {
    return repo.text;
  }
  processResultsAttributeValue(data, params) {
    return {
      results: data.attributeValues
    };
  }
  selectAttributeValueEvent(e, $this) {
    const id = e.params.data.id;
    // $this.searchParams.attributeValueId = id;
  }
  // endregion Attribute value

  async onShowJobForm(id: string, mapStatus: number): Promise<void> {
    try {
      if(mapStatus == 0){
        ConfigSetting.ShowError("Bạn phải map nhà tuyển dụng này trước khi map job!");
      }
      else{
        this.job.searchParams.recuiterId = id;
        this.job.onSearch();
        $('#modal-job').modal('show');
      }
    } 
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowMappingForm(id: string): Promise<void> {
    try {
      App.blockUI();
      this.paramMapping = new RecuiterMappingRequest();
      const response = await this.recuiterService.getById(id);
      if (response.recuiter) {
        this.objectItem = response.recuiter;
        if (this.objectItem.attributes !== undefined && this.objectItem.attributes != null && this.objectItem.attributes.length > 0) {
          this.ids = [];
          for (const item of this.objectItem.attributes) {
            if (item.attribute) {
              this.ids.push(item.attribute.id.toString());
            }
          }
        }
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
      $('#modal-mapping').modal('show');
    }
  }

  async switchMap(itemObject): Promise<void> {
    try {
      App.blockUI();
      if (this.ids) {
        this.paramCrawlerMappingAttribute.OriginalAttributeId = this.ids;
        this.paramCrawlerMappingAttribute.MappingType = '1';
        this.paramCrawlerMappingAttribute.isGetAttibuteValue = true;
        this.paramCrawlerMappingAttribute.isGetMoreAttribute = true;
        const response = await this.crawlerMappingAttributeService.search(this.paramCrawlerMappingAttribute);
        if (response.status) {
          this.dataCrawlerMappingAttribute = response.crawlerMappingAttribute;
          if (this.dataCrawlerMappingAttribute && this.dataCrawlerMappingAttribute.length > 0) {
            this.paramMapping.Id = '';
            this.paramMapping.Name = itemObject.name;
            this.paramMapping.Status = '3'; // New
            this.paramMapping.RefCrawlerRecuiterId = itemObject.id;
            this.paramMapping.Attributes = [];
            for (const item of this.dataCrawlerMappingAttribute) {
              const objOrg = itemObject.attributes.find(function (attributes) {
                return attributes.attributeId === item.originalAttributeId;
              });
              if (objOrg) {
                const attId = item.targetAttribute.attributeValues.find(x => x.value === objOrg.attributeValue.value);
                let attvalueId = '';
                if (attId != null && attId !== 'undefined') {
                  attvalueId = attId.id;
                }
                const itemPush = {
                  TargetId: '',
                  TargetType: 1,
                  AttributeId: item.targetAttribute.id,
                  // AttributeValueId: objOrg.attributeValue.id,
                  AttributeValueId: attvalueId,
                  ValueString: objOrg.attributeValue.value,
                  GroupValue: '',
                  ParentAttributeId: '',
                  Status: '3',
                  Name: item.targetAttribute.name,
                  Type: item.targetAttribute.type,
                  AttributeValueIds: '',
                  // MinValue:0,
                  // MaxValue:0,
                  // ValueNumber:0,
                  // ValueDateTime:'',
                  ListTypeValue: item.targetAttribute.attributeValues.map(function (v) {
                    v.isCheck = false;
                    return v;
                  })
                };
                this.paramMapping.Attributes.push(itemPush);
              } 
              else {
                const itemPushNotfound = {
                  TargetId: '',
                  TargetType: 1,
                  AttributeId: item.targetAttribute.id,
                  AttributeValueId: '',
                  ValueString: '',
                  GroupValue: '',
                  ParentAttributeId: '',
                  Status: '3',
                  Name: item.targetAttribute.name,
                  Type: item.targetAttribute.type,
                  AttributeValueIds: '',
                  // MinValue:0,
                  // MaxValue:0,
                  // ValueNumber:0,
                  // ValueDateTime:'',
                  ListTypeValue: item.targetAttribute.attributeValues.map(function (v) {
                    v.isCheck = false;
                    return v;
                  })
                };
                this.paramMapping.Attributes.push(itemPushNotfound);
              }
            }
            if (this.paramMapping.Attributes != null) {
              this.paramMapping.Attributes.forEach(element => {
                element.userFilter = { value: '' };
              });
            }
          }
        }
        console.log(this.paramMapping.Attributes);
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }

  }

  changeValueCb(event, item) {
    if (item.ListTypeValue) {
      const lstPush = [];
      for (const it of item.ListTypeValue) {
          if (it.isCheck) {
            lstPush.push(it.id);
          }
      }
      if (lstPush.length > 0) {
        item.AttributeValueIds = lstPush.join();
      }
    }
  }

  async saveMapping(): Promise<void> {
    try {
      App.blockUI();
      this.paramMapping.RecuiterMedias = [];
      this.paramMapping.TemplateId = '2';
      let imgPath = '';
      if (this.fileUpload.imagePath = '') {
        if (this.fileUpload.imageUrl !== '') {
          imgPath = this.fileUpload.imageUrl;
        }
      } else {
        imgPath = this.fileUpload.imageUrl;
      }
      const recuiterLogo = {
        MediaType : 1,
        MediaUrl : imgPath,
        Status : 1
      };
      this.paramMapping.RecuiterMedias.push(recuiterLogo);

      this.paramMapping.RecuiterBanners = [];
      // for (let i = 0; i < this.multipleFileUpload.uploadedFiles.length; i++) {
      //   const item = this.multipleFileUpload.uploadedFiles[i];
      //   const recuiterImage = {
      //     MediaType : 2,
      //     MediaUrl : item.imagePath,
      //     Status : 1
      //   };
      //   this.paramMapping.RecuiterMedias.push(recuiterImage);
      // }
      const response = await this.canaviRecuiterService.AddFromCrawler(this.paramMapping);
      if (response.status) {
        const ab = this.paramMapping.RefCrawlerRecuiterId;
        const a = this.data.find(function (data) { return data.id === ab; });
        this.onSearch();
        $('#modal-mapping').modal('hide');
        ConfigSetting.ShowSuccess('Update Success!');
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async onShowDetailRecuiterCanavi(id: string): Promise<void> {
    try {
      // this.paramGetJobCanavi.Id = id;
      this.recuiterDetail.searchParams.IsGetAtttribute = true;
      this.recuiterDetail.searchParams.IsGetListAttributeValue = true;
      this.recuiterDetail.searchParams.RefCrawlerRecuiterId = id;
      this.recuiterDetail.onSearchDetail();
      $('#modal-recuiter-detail').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  ngDeletePhoto(index: any) {
    // if (this.multipleFileUpload.uploadedFiles.length > 0) {
    //   // Xóa element by index
    //   this.multipleFileUpload.uploadedFiles.splice(index, 1);
    // } else {
    //   ConfigSetting.ShowError('Không tồn tại ảnh nào để xóa');
    // }
    ConfigSetting.ShowError('Có lỗi xảy ra vui lòng thử lại sau!');
  }

  async onShowFormExport(): Promise<void> {
    try {
      $('#export-recuiter').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  onPlusPage() {
    this.searchParams.toPage += 5;
    this.searchParams.fromPage += 5;
  }
  onMinusPage() {
    this.searchParams.toPage -= 5;
    this.searchParams.fromPage -= 5;
  }

  async onExport(): Promise<void> {
    if (this.onSearchStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onSearchStatus = true;
    App.blockUI();
    try {
      await this.recuiterService.exportExcel(this.searchParams);
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onSearchStatus = false;
      $('#export-recuiter').modal('hide');
      App.unblockUI();
    }

  }
}
