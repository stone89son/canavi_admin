import { Component, OnInit, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigSetting } from '../../../common/configSetting';
import { JobService } from '../../../services/crawler/job/crawler.job.service';
import { CanaviJobService } from '../../../services/canavi/jobs/canavi-job-service';
import { JobSearchRequest } from '../../../models/crawler/job/crawler-job-request-search';
import { CanaviJobMappingRequest, CanaviJobGetByOriginalIdRequest } from '../../../models/canavi/jobs/canavi-job-mapping-request';
import { CanaviAttributeValueService } from '../../../services/canavi/attribute-value/canavi-attribute-value-service';
import { CrawlerMappingAttributeService } from '../../../services/crawler/mapping-attribute/crawler.mapping-attribute-service';
import { MappingAttributeGetRequest } from '../../../models/crawler/mapping-attribute/mapping-attribute-get-request';
import { JobDetailComponent } from '../../canavi/job/getDetail/canavi.job-detail.component';
import { isFulfilled } from 'q';
import { CommonService } from 'src/app/services/common/common.service';
import { FormControl } from '@angular/forms';
// import 'rxjs/Rx';
declare var jQuery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'job-crawler',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent implements OnInit {
  @ViewChild(JobDetailComponent, {static: false}) jobDetail: JobDetailComponent;

  token: string;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: JobSearchRequest;
  data: any;
  paramMapping: CanaviJobMappingRequest = new CanaviJobMappingRequest();;
  dataCrawlerMappingAttribute: any;
  objectItem: any;
  objectMap: any;
  ids: any;
  dataJobCanavi: any;
  paramCrawlerMappingAttribute: MappingAttributeGetRequest;
  paramGetJobCanavi: CanaviJobGetByOriginalIdRequest;
  config = {
    height: '200px',
    allowedContent: true,
    extraPlugins: 'divarea',
    filebrowserBrowseUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload),
    filebrowserUploadUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload)
  };
  onSearchStatus: boolean;
  dataSkills: any = [];
  dataExperienceRanges: any = [];
  dataGenders: any = [];
  dataCurriculumVitaeLanguages: any = [];
  dataWorkingTypes: any = [];
  dataCategories: any = [];
  categories = new FormControl();
  genders = new FormControl();
  experienceRanges = new FormControl();
  curriculumVitaeLanguages = new FormControl();
  skills = new FormControl();
  workingTypes = new FormControl();

  constructor(
    private oauthService: OAuthService,
    private jobService: JobService,
    private canaviJobService: CanaviJobService,
    private canaviAttributeValueService: CanaviAttributeValueService,
    private crawlerMappingAttributeService: CrawlerMappingAttributeService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    // this.token = ConfigSetting.GetAuthenToken;
    this.searchParams = new JobSearchRequest();
    this.searchParams.mapStatus = '0';
    this.searchParams.fromPage = 1;
    this.searchParams.toPage = 5;
    this.data = [];
    this.paramCrawlerMappingAttribute = new MappingAttributeGetRequest();
    this.dataCrawlerMappingAttribute = [];
    this.objectItem = {};
    this.objectMap = {};
    this.dataJobCanavi = {};
    this.paramGetJobCanavi = new CanaviJobGetByOriginalIdRequest();
    this.onRegisterAttribute();
    this.onRegisterAttributeValue();
    this.onRegisterRecuiter();
    this.onSearch();
    $('.date-picker').datepicker({
      rtl: App.isRTL(),
      orientation: 'center',
      autoclose: true
    });
  }
  // region Attribute
  async onRegisterAttribute(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#attributeIdAutocomplete',
        ConfigSetting.UrlPathCrawlerSearchSelectAttributes,
        this.createParametersFunAttribute,
        $this,
        'Search Attribute',
        this.processResultsAtribute,
        this.formatRepoAttribute,
        this.formatRepoSelectionAttribute,
        this.selectAttributeEvent,
        null,
        0,
        250,
        false
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunAttribute(params, $this) {
    const query = {
      name: params.term
    };
    return query;
  }
  processResultsAtribute(data, params) {
    return {
      results: data.attributes
    };
  }
  formatRepoAttribute(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionAttribute(repo) {
    return repo.text;
  }
  selectAttributeEvent(e, $this) {
    const id = e.params.data.id;
    $this.searchParams.attributeId = id;
  }
  // endregion Attribute

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

  // region Recuiter
  async onRegisterRecuiter(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#recuiterIdAutocomplete',
        ConfigSetting.UrlPathCrawlerSearchSelectRecuiters,
        this.createParametersFunRecuiter,
        $this,
        'Search recuiter',
        this.processResultsRecuiter,
        this.formatRepoRecuiter,
        this.formatRepoSelectionRecuiter,
        this.selectRecuiterEvent,
        null,
        0,
        250,
        false
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunRecuiter(params, $this) {
    const query = {
      keyword: params.term
    };
    return query;
  }
  processResultsRecuiter(data, params) {
    return {
      results: data.recuiters
    };
  }
  formatRepoRecuiter(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionRecuiter(repo) {
    return repo.text;
  }
  selectRecuiterEvent(e, $this) {
    const id = e.params.data.id;
    $this.searchParams.recuiterId = id;
  }
  // endregion Recuiter

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
      const response = await this.jobService.search(this.searchParams);
      if (response.status) {
        this.data = response.jobs;
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

  async onShowMappingFormJob(id: string): Promise<void> {
    try {
      App.blockUI();
      this.paramMapping = new CanaviJobMappingRequest();
      const response = await this.jobService.getJobById(id);
      if (response.job) {
        this.objectItem = response.job;
        if (this.objectItem.attributes !== undefined && this.objectItem.attributes != null && this.objectItem.attributes.length > 0) {
          this.ids = [];
          for (const item of this.objectItem.attributes) {
            if (item.attribute) {
              this.ids.push(item.attribute.id.toString());
            }
          }
        }
        console.log(this.objectItem);
        this.switchMapJob(this.objectItem);
      }
    } 
    catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
      $('#modal-mapping-job').modal('show');
    }
  }

  async switchMapJob(itemObject): Promise<void> {
    try {
      App.blockUI();
      if (this.ids) {
        //
        this.dataSkills = await this.commonService.getSkill();
        this.dataExperienceRanges = await this.commonService.getExperienceRange();
        this.dataGenders = await this.commonService.getGender();
        this.dataCurriculumVitaeLanguages = await this.commonService.getCurriculumVitaeLanguage();
        this.dataWorkingTypes = await this.commonService.getWorkingType();
        this.dataCategories = await this.commonService.getCategory();
        //
        this.paramMapping.Id = '';
        this.paramMapping.TemplateId = '1';
        this.paramMapping.RecuiterId = itemObject.recuiterId;
        this.paramMapping.Title = itemObject.title;
        this.paramMapping.Status = 1; // New
        this.paramMapping.JobType = 0; // None
        this.paramMapping.NeedToInterview = false;
        this.paramMapping.CandidateApplyCount = 0;
        this.paramMapping.RefCrawlerJobId = itemObject.id;
        this.paramMapping.OriginalJobId = '';
        this.paramMapping.NumberSlot = 1;
        this.paramMapping.SuggestCandidate = 0;
        this.paramMapping.Commission = 0;
        this.paramMapping.CommissionType = 0;
        this.paramMapping.CandidateCommission = 0;
        this.paramMapping.CandidateCommissionType = 0;
        this.paramMapping.ExpirationDateUtcString = '';
        this.paramMapping.SalaryType = null;
        this.paramMapping.SalaryValue = 0;
        this.paramMapping.SalaryFrom = 0;
        this.paramMapping.SalaryTo = 0;
        this.paramMapping.SalaryRange = [];
        this.paramMapping.Categories = [];
        this.paramMapping.Locations = [];
        this.paramMapping.Skills = [];
        this.paramMapping.Languages = [];
        this.paramMapping.WorkingTypes = [];
        this.paramMapping.Genders = [];
        this.paramMapping.ExperienceRanges = [];
        this.paramMapping.Attributes = [];
        this.paramMapping.ProfileInclude = '';
        this.paramMapping.JobDescription = '';
        this.paramMapping.JobRequirement = '';
        this.paramMapping.JobBenefit = '';
        //
      }
    } 
    catch (error) {
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

  async saveMappingJob(): Promise<void> {
    try {
      App.blockUI();
      if(this.categories.value != null && this.categories.value != undefined && this.categories.value.length > 0){
        this.categories.value.forEach(element => {
          this.paramMapping.Categories.push(element);
        });
      }
      if(this.experienceRanges.value != null && this.experienceRanges.value != undefined){
        this.paramMapping.ExperienceRanges.push(this.experienceRanges.value);
      }
      if(this.genders.value != null && this.genders.value != undefined){
        this.paramMapping.Genders.push(this.genders.value);
      }
      if(this.workingTypes.value != null && this.workingTypes.value != undefined){
        this.paramMapping.WorkingTypes.push(this.workingTypes.value);
      }
      if(this.curriculumVitaeLanguages.value != null && this.curriculumVitaeLanguages.value != undefined){
        this.paramMapping.Languages.push(this.curriculumVitaeLanguages.value);
      }
      if(this.skills.value != null && this.skills.value != undefined && this.skills.value.length > 0){
        this.skills.value.forEach(element => {
          this.paramMapping.Skills.push(element);
        });
      }
      this.syncAttributes(this.paramMapping.ProfileInclude, "da66e403d4d64e2d97a60a7f93e1e7d4");
      this.syncAttributes(this.paramMapping.JobDescription, "bc4a4b7db16c4495a9b77f7b7770a269");
      this.syncAttributes(this.paramMapping.JobRequirement, "ce96ee5c773041fea4609eeb15101a2b");
      this.syncAttributes(this.paramMapping.JobBenefit, "f4999036ba374da6a8a8f3b868c48358");
      //
      console.log(this.paramMapping);
      const response = await this.canaviJobService.AddFromCrawler(this.paramMapping);
      if (response.status) {
        this.onSearch();
        $('#modal-mapping-job').modal('hide');
        ConfigSetting.ShowSuccess('Update Success!');
      }
    } 
    catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  syncAttributes(valueString, valueId){
    const itemPush = {
      AttributeId: valueId,
      ValueString: valueString,
      Status: '3',
      Type: '7'
    };
    this.paramMapping.Attributes.push(itemPush);
  }

  closeModalMap() {
    $('#modal-mapping-job').modal('hide');
  }

  async onShowDetailJobCanavi(id: string): Promise<void> {
    try {
      // this.paramGetJobCanavi.Id = id;
      this.jobDetail.searchParams.IsGetAtttribute = true;
      this.jobDetail.searchParams.IsGetListAttributeValue = true;
      this.jobDetail.searchParams.RefCrawlerJobId = id;
      this.jobDetail.onSearchDetail();
      $('#modal-job-detail').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowFormExport(): Promise<void> {
    try {
      $('#export-form').modal('show');
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
      await this.jobService.exportExcel(this.searchParams);
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onSearchStatus = false;
      $('#export-form').modal('hide');
      App.unblockUI();
    }

  }
}
