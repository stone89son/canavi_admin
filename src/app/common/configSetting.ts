import { environment } from './../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Dictionary } from '../models/dictionary';

declare var jquery: any;
declare var $: any;
declare var AjaxRequest: any;

export class ConfigSetting {
  public static BASE_URL = environment.baseUrl;
  public static CDN_URL = environment.cdnUrl;
  public static SSO_URL = environment.ssoUrl;
  public static SSO_ClientId = environment.ssoClientId;
  public static SSO_Scope = environment.ssoScope;
  public static AdminUI_URL = environment.adminUIUrl;
  public static Silent_Refresh_URL = environment.silentRefreshUrl;
  public static FE_DOMAIN = environment.feDomain;

  public static Headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private static LocalStorageAuthenKey = 'LocalStorageAuthenKey';
  public static LocalStorageRedirectKey = 'LocalStorageRedirectKey';

  public static UrlPathLogin = 'Account/GenerateToken';
  public static UrlPathRegister = 'Account/Register';
  public static UrlPathCheckLogin = 'Account/CheckLogin';
  public static LoginExpiretime = 30;

  public static UrlPathCategoryGets = 'Category/Gets';
  public static UrlPathCategoryGet = 'Category/Get';
  public static UrlPathCategoryGetCategorys = 'Category/GetCategorys';
  public static UrlPathCategoryAddOrChange = 'Category/AddOrChange';

  public static LoginStatus = 'LoginStatus';
  public static HomePage = '/g/customer';
  public static LoginPage = '/login';
  public static CustomerDetailPage = '/g/DetailCustomer/';
  public static TemplatesPage = '/g/template';
  public static EmailSmsDetailPage = '/g/DetailEmailSms/';
  public static EmailSmsVerifyDetailPage = '/g/VerifyDetailEmailSms/';
  public static WarehouseInventoryChangePage = '/g/warehouse-inventory/change/';

  public static UrlPathCrawlerAttributeSearch = 'CrawlerAttribute/Search';
  public static UrlPathCrawlerAttributeGet = 'CrawlerAttribute/Get';
  public static UrlPathCrawlerAttributeAddOrUpdate = 'CrawlerAttribute/AddOrUpdate';
  public static UrlPathCrawlerAttributeValueSearch = 'CrawlerAttributeValue/Search';
  public static UrlPathCrawlerAttributeValueGet = 'CrawlerAttributeValue/Get';
  public static UrlPathCrawlerAttributeValueAddOrUpdate = 'CrawlerAttributeValue/AddOrUpdate';

  public static UrlPathCrawlerSearchSelectAttributes = 'CrawlerJob/GetAttributes';
  public static UrlPathCrawlerSearchSelectAttributeValues = 'CrawlerJob/GetAttributeValues';
  public static UrlPathCrawlerSearchSelectRecuiters = 'CrawlerJob/GetRecuiters';

  public static UrlPathWebsiteCrawlerSearch = 'CrawlerWebsite/Search';
  public static UrlPathAttributeMapping = 'CrawlerMappingAttribute/AddOrChange';
  public static UrlPathCrawlerRecuiterSearch = 'CrawlerRecuiter/Search';
  public static UrlPathCrawlerRecuiterGetById = 'CrawlerRecuiter/Get';
  public static UrlPathCrawlerRecuiterExportExcel = 'CrawlerRecuiter/ExportExcel';

  public static UrlPathCrawJobSearch = 'CrawlerJob/Search';
  public static UrlPathCrawJobGetById = 'CrawlerJob/Get';
  public static UrlPathCrawJobExportExcel = 'CrawlerJob/ExportExcel';
  public static UrlPathCrawlerMappingAttributeGet = 'CrawlerMappingAttribute/Get';

  // FILE
  public static UrlPathFileUpload = 'File/Index';

  // DB Canavi
  // Attribute
  public static UrlPathCanaviAttributeSearch = 'Attribute/Search';
  public static UrlPathCanaviAttributeGet = 'Attribute/Get';
  public static UrlPathCanaviAttributeAddOrUpdate = 'Attribute/AddOrChange';

  // Attribute value
  public static UrlPathCanaviAttributeValueSearch = 'AttributeValue/Search';
  public static UrlPathCanaviAttributeValueGet = 'AttributeValue/Get';
  public static UrlPathCanaviAttributeValueAddOrUpdate = 'AttributeValue/AddOrChange';

  // Attribute group
  public static UrlPathCanaviAttributeGroupSearch = 'AttributeGroup/Search';
  public static UrlPathCanaviAttributeGroupGet = 'AttributeGroup/Get';
  public static UrlPathCanaviAttributeGroupAddOrUpdate = 'AttributeGroup/AddOrChange';
  public static UrlPathCanaviAttributeGroupMappingGetByAttributeGroupId = 'AttributeGroup/AttributeAttributeGroupMappingGetByAttributeGroupId';
  public static UrlPathCanaviAttributeGroupMappingGetById = 'AttributeGroup/AttributeAttributeGroupMappingGetById';
  public static UrlPathCanaviAttributeGroupMappingAddOrUpdate = 'AttributeGroup/AttributeAttributeGroupMappingAddOrChange';

  // Job Status
  public static UrlPathSystemJobStatusGroupSearch = 'JobStatusGroup/Gets';
  public static UrlPathSystemJobStatusGroupGet = 'JobStatusGroup/Get';
  public static UrlPathSystemJobStatusGroupAdd = 'JobStatusGroup/Add';
  public static UrlPathSystemJobStatusGroupChange = 'JobStatusGroup/Change';
  public static UrlPathSystemJobStatusSearch = 'JobStatus/Gets';
  public static UrlPathSystemJobStatusGet = 'JobStatus/Get';
  public static UrlPathSystemJobStatusAdd = 'JobStatus/Add';
  public static UrlPathSystemJobStatusChange = 'JobStatus/Change';
  public static UrlPathSystemJobSubStatusSearch = 'JobSubStatus/Gets';
  public static UrlPathSystemJobSubStatusGet = 'JobSubStatus/Get';
  public static UrlPathSystemJobSubStatusAdd = 'JobSubStatus/Add';
  public static UrlPathSystemJobSubStatusChange = 'JobSubStatus/Change';

  public static UrlPathCanaviAttributeRelationshipSearch = 'AttributeRelationship/Search';
  public static UrlPathCanaviAttributeRelationshipGet = 'AttributeRelationship/Get';
  public static UrlPathCanaviAttributeRelationshipAddOrUpdate = 'AttributeRelationship/AddOrChange';
  public static UrlPathCanaviAttributeRelationshipGetAttributes = 'AttributeRelationship/GetAttributes';

  public static UrlPathCanaviSearchHistoryGet = 'SearchHistory/Get';
  public static UrlPathCanaviSearchHistoryAddOrUpdate = 'SearchHistory/AddOrUpdate';
  public static UrlPathCanaviSearchHistorySearch = 'SearchHistory/Search';
  public static UrlPathCanaviSearchHistoryDetailGets = 'SearchHistory/SearchHistoryDetailGets';

  public static UrlPathCanaviAttributeFilterMappingGet = 'AttributeFilterMapping/Get';
  public static UrlPathCanaviAttributeFilterMappingAddOrUpdate = 'AttributeFilterMapping/AddOrUpdate';
  public static UrlPathCanaviAttributeFilterMappingSearch = 'AttributeFilterMapping/Search';
  public static UrlPathCanaviAttributeFilterMappingGetAttributes = 'AttributeFilterMapping/GetAttributes';

  // Commission
  public static UrlPathCanaviCommisstionFeeGet = 'CommisstionFee/Get';
  public static UrlPathCanaviCommisstionFeeAddOrUpdate = 'CommisstionFee/AddOrUpdate';
  public static UrlPathCanaviCommisstionFeeSearch = 'CommisstionFee/Search';
  public static UrlPathCanaviCommisstionFeeGetAttributes = 'CommisstionFee/GetAttributes';
  public static UrlPathCanaviCommisstionFeeGetAttributeValues = 'CommisstionFee/GetAttributeValues';
  public static UrlPathCanaviCommisstionFeeGetRecuiters = 'CommisstionFee/GetRecuiters';
  public static UrlPathCanaviCommisstionFeeGetJobs = 'CommisstionFee/GetJobs';

  // Category
  public static UrlPathCanaviCategorySearch = 'SystemCategory/Search';

  // WorkingType
  public static UrlPathCanaviWorkingTypeSearch = 'WorkingType/Search';

  // Skill
  public static UrlPathCanaviSkillSearch = 'Skill/Search';

  // Gender
  public static UrlPathCanaviGenderSearch = 'Gender/Search';

  // SalaryRange
  public static UrlPathCanaviSalaryRangeSearch = 'SalaryRange/Search';

   // Common Component
   public static UrlPathCanaviCommonCompomnentSearch = 'Share/Search';

  public static UrlPathCanaviComponentGroupSearch = 'ComponentGroup/Search';
  public static UrlPathCanaviComponentGroupGetById = 'ComponentGroup/GetById';
  public static UrlPathCanaviComponentGroupAddOrUpdate = 'ComponentGroup/AddOrChange';
  public static UrlPathCanaviComponentAttributeConfigSearch = 'ComponentAttributeConfig/Search';
  public static UrlPathCanaviComponentAttributeConfigGetById = 'ComponentAttributeConfig/GetById';
  public static UrlPathCanaviComponentAttributeConfigAddOrUpdate = 'ComponentAttributeConfig/AddOrChange';
  public static UrlPathCanaviComponentBlogPostConfigSearch = 'ComponentBlogPostConfig/Search';
  public static UrlPathCanaviComponentBlogPostConfigGetById = 'ComponentBlogPostConfig/GetById';
  public static UrlPathCanaviComponentBlogPostConfigAddOrUpdate = 'ComponentBlogPostConfig/AddOrChange';
  public static UrlPathCanaviComponentKeywordConfigSearch = 'ComponentKeywordConfig/Search';
  public static UrlPathCanaviComponentKeywordConfigGetById = 'ComponentKeywordConfig/GetById';
  public static UrlPathCanaviComponentKeywordConfigAddOrUpdate = 'ComponentKeywordConfig/AddOrChange';
  public static UrlPathCanaviComponentRecuiterConfigSearch = 'ComponentRecuiterConfig/Search';
  public static UrlPathCanaviComponentRecuiterConfigGetById = 'ComponentRecuiterConfig/GetById';
  public static UrlPathCanaviComponentRecuiterConfigAddOrUpdate = 'ComponentRecuiterConfig/AddOrChange';
  public static UrlPathCanaviComponentSearchCompanyAuthentication='Recuiter/SearchCompanyAuthentication';
  public static UrlPathCanaviComponentChangeStatusCompanyAuthentication='Recuiter/ChangeStatusCompanyAuthentication';
  
  
  public static UrlPathRecuiterAddOrChangeFromCrawler = 'Recuiter/AddOrChangeFromCrawler';
  public static UrlPathRecuiterGetByOriginal = 'Recuiter/GetByOriginal';
  public static UrlPathCanaviRecuiterSearch = 'Recuiter/Search';
  public static UrlPathCanaviRecuiterSearchInCms = 'Recuiter/SearchInCms';
  public static UrlPathCanaviRecuiterChangeStatusInCms = 'Recuiter/ChangeStatusCompany';
  public static UrlPathCanaviAddJobCampaign = 'Job/JobCampaignAddOrChange';


  public static UrlPathCanaviRecuiterGetById = 'Recuiter/GetById';


  public static UrlPathJobSearch = 'Job/Search';
  public static UrlPathJobAddOrChangeFromCrawler = 'Job/AddOrChangeFromCrawler';


  public static UrlPathChangeStatusJob = 'Job/ChangeStatusJobs';
  public static UrlPathAddJobCampaign='Job/JobCampaignAdd';
  public static UrlPathGẹtobCampaign='Job/GetJobCampaign';
  public static UrlPathChangeStatusJobCampaign='Job/ChangeStatusJobCampaign';

  public static UrlPathJobGetByOriginal = 'Job/GetByOriginal';
  public static UrlPathJobGetByRecuiterId = 'Job/GetsByRecuiterId';
  public static UrlPathJobStatistic = 'Job/JobStatistic';
  public static UrlPathJobGetById = 'Job/GetById';
  public static UrlPathCanaviAttributeValueByIdsGet = 'AttributeValue/GetByAttribute';
  public static UrlPathCanaviRecuiterExternalProfileGetByRecuiterId = 'RecuiterExternalProfile/GetByRecuiterId';
  public static UrlPathCanaviRecuiterPaymentHistoryGetByRecuiterId = 'RecuiterPaymentHistory/GetByRecuiterId';
  public static UrlPathCanaviRecuiterUserMappingGetByRecuiterId = 'RecuiterUserMapping/GetByRecuiterId';
  public static UrlPathCanaviRecuiterUserMappingUpdate = 'RecuiterUserMapping/Update';
  public static UrlPathCanaviRecuiterUserMappingAccepted = 'RecuiterUserMapping/Accepted';
  public static UrlPathCanaviRecuiterUserMappingReject = 'RecuiterUserMapping/Reject';
  public static UrlPathCanaviCandidatePaymentRequestSearch = 'CandidatePaymentRequest/Search';
  public static UrlPathCanaviCandidatePaymentRequestAccepted = 'CandidatePaymentRequest/Accepted';
  public static UrlPathCanaviCandidatePaymentRequestReject = 'CandidatePaymentRequest/Reject';
  public static UrlPathCanaviCandidatePaymentRequestCancel = 'CandidatePaymentRequest/Cancel';
  public static UrlPathCanaviCandidateJobMappingSearch = 'CandidateJobMapping/GetByJobId';
  public static UrlPathCanaviCandidateSearch = 'Candidate/Search';
  public static UrlPathCanaviSearchCandidateCampaign= 'Candidate/SearchCandidateCampaign';


  public static UrlPathCustomerSearch = 'Customer/Index';
  public static UrlPathCustomerGet = 'Customer/Get';
  public static UrlPathCustomerAdd = 'Customer/Add';
  public static UrlPathCustomerChange = 'Customer/Change';
  public static UrlPathCustomerAutocomplete = 'Customer/AutoComplete';
  public static UrlPathCustomerActive = 'Customer/Active';
  public static UrlPathCustomerLock = 'Customer/Lock';

  public static UrlPathDepartmentSearch = 'Department/Search';
  public static UrlPathDepartmentGet = 'Department/Get';
  public static UrlPathDepartmentAdd = 'Department/Add';
  public static UrlPathDepartmentChange = 'Department/Change';
  public static UrlPathRoleSearch = 'Role/RoleSearch';
  public static UrlPathRoleAdd = 'Role/RoleAdd';
  public static UrlPathRoleChange = 'Role/RoleChange';
  public static UrlPathRoleChangeIsAdministrator = 'Role/RoleChangeIsAdministrator';
  public static UrlPathActionDefineSearch = 'Role/ActionDefineSearch';
  public static UrlPathPermissionChangeByRole = 'Role/PermissionChangeByRole';
  public static UrlPathPermissionPermissionGet = 'Role/PermissionGet';
  public static UrlPathAutocompleteActionDefine = 'Role/AutocompleteActionDefine';
  public static UrlPathCustomerRoleGets = 'Role/CustomerRoleGets';
  public static UrlPathCustomerRoleMappingAdd = 'Role/CustomerRoleMappingAdd';
  public static UrlPathCustomerRoleMappingRemove = 'Role/CustomerRoleMappingRemove';
  public static UrlPathRoleGetSelectByDepratmentId = 'Role/GetSelectRoleByDepartmentId';

  public static UrlPathEmailOrSmsAddOrUpdate = 'EmailOrSms/AddOrUpdate';
  public static UrlPathEmailOrSmsSearch = 'EmailOrSms/Search';
  public static UrlPathEmailOrSmsGetDetail = 'EmailOrSms/GetDetail';
  public static UrlPathEmailOrSmsGetVerifyDetail = 'EmailOrSms/GetVerifyDetail';
  public static UrlPathEmailOrSmsChangeStatus = 'EmailOrSms/ChangeStatus';
  public static UrlPathMarketingSeoDetailSearch = 'SeoDetail/Search';
  public static UrlPathMarketingSeoDetailGetById = 'SeoDetail/GetById';
  public static UrlPathMarketingSeoDetailGetByTargetId = 'SeoDetail/GetByTargetId';
  public static UrlPathMarketingSeoDetailAddOrUpdate = 'SeoDetail/AddOrChange';
  public static UrlPathBannerSearch = 'Banner/Search';
  public static UrlPathBannerGet = 'Banner/Get';
  public static UrlPathBannerAdd = 'Banner/Add';
  public static UrlPathBannerChange = 'Banner/Change';
  public static UrlPathBannerRemove = 'Banner/Remove';
  public static UrlPathBannerItemSearch = 'BannerItem/Search';
  public static UrlPathBannerItemGetAll='BannerItem/GetAll';

  public static UrlPathBannerItemGet = 'BannerItem/Get';
  public static UrlPathBannerItemAdd = 'BannerItem/Add';
  public static UrlPathBannerItemChange = 'BannerItem/Change';
  public static UrlPathBannerItemRemove = 'BannerItem/Remove';

  public static UrlPathFooterGroupGetAll = 'FooterGroup/GetAll';
  public static UrlPathFooterGroupGetById = 'FooterGroup/GetById';
  public static UrlPathFooterGroupAdd = 'FooterGroup/Add';
  public static UrlPathFooterGroupUpdate = 'FooterGroup/Change';
  public static UrlPathFooterGroupRemove = 'FooterGroup/Remove';
  public static UrlPathFooterGroupItemGetAll = 'FooterGroup/GetAllFooterGroupItem';
  public static UrlPathFooterGroupItemGetById = 'FooterGroup/GetByIdFooterGroupItem';
  public static UrlPathFooterGroupItemAdd = 'FooterGroup/AddFooterGroupItem';
  public static UrlPathFooterGroupItemUpdate = 'FooterGroup/ChangeFooterGroupItem';
  public static UrlPathConfigFooterGroupGetById = 'FooterGroup/GetByIdConfigFooterGroup';
  public static UrlPathConfigFooterGroupUpdate = 'FooterGroup/ChangeConfigFooterGroup';

  public static UrlPathExportReportLiveCV = 'ExportReport/GetReportAboutLiveCV';
  public static UrlPathExportReportUserCVAndApply = 'ExportReport/GetReportAboutUserCVAndApply';
  public static UrlPathExportReportRecruiter = 'ExportReport/GetReportAboutRecruiter';

  public static UrlPathBlogCategoryGets = 'Category/Gets';
  public static UrlPathBlogCategoryGet = 'Category/GetById';
  public static UrlPathBlogCategoryAddOrUpdate = 'Category/AddOrChange';
  public static UrlPathBlogPostSearch = 'Posts/Search';
  public static UrlPathBlogGetPostToChange = 'Posts/GetPostToChange';
  public static UrlPathBlogGetPostAddOrChange = 'Posts/AddOrChange';
  public static UrlPathTagsAutocomplete = 'Posts/TagsAutocomplete';
  public static UrlPathPostsAutocomplete = 'Posts/PostsAutocomplete';
  public static UrlPathBlogAuthorsSearch = 'Authors/Gets';
  public static UrlPathBlogAuthorsGetById = 'Authors/GetById';
  public static UrlPathBlogAuthorsAddOrChange = 'Authors/AddOrChange';
  public static UrlPathBlogTagsSearch = 'Tags/Gets';
  public static UrlPathBlogTagsGetById = 'Tags/GetById';
  public static UrlPathBlogTagsAddOrChange = 'Tags/AddOrChange';
  public static UrlPathBlogQuestionsSearch = 'Questions/Search';
  public static UrlPathBlogQuestionsGetById = 'Questions/GetById';
  public static UrlPathBlogQuestionsAddOrChange = 'Questions/AddOrChange';
  public static UrlPathBlogWikiSearch = 'Wiki/Search';
  public static UrlPathBlogWikiGetById = 'Wiki/GetById';
  public static UrlPathBlogWikiAddOrChange = 'Wiki/AddOrChange';
  public static UrlPathBlogAnswersSearch = 'Answers/Search';
  public static UrlPathBlogAnswersGetById = 'Answers/GetById';
  public static UrlPathBlogAnswersAddOrChange = 'Answers/AddOrChange';

  public static UrlPathCommonSkillSearch = 'Skill/Search';
  public static UrlPathCommonWorkingTypeSearch = 'WorkingType/Search';
  public static UrlPathCommonExperienceRangeSearch = 'ExperienceRange/Search';
  public static UrlPathCommonGenderSearch = 'Gender/Search';
  public static UrlPathCommonLanguageSearch = 'CurriculumVitaeLanguage/Search';
  public static UrlPathCommonCategorySearch = 'CategoryJob/Search';

  public static CreateUrl(absolutePath: string): string {
    return `${ConfigSetting.BASE_URL}${absolutePath}`;
  }

  public static set SetAuthenToken(token: string) {
    localStorage.setItem(this.LocalStorageAuthenKey, token);
  }
  public static get GetAuthenToken(): string {
    return localStorage.getItem(this.LocalStorageAuthenKey);
  }

  public static SetLoginStatus(authenToken: string): void {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + ConfigSetting.LoginExpiretime);
    const loginObject = {
      status: true,
      loginTime: currentDate.getTime(),
    };
    const tmp = JSON.stringify(loginObject);
    localStorage.setItem(this.LoginStatus, tmp);
    ConfigSetting.SetAuthenToken = authenToken;
  }

  public static GetLoginStatus(): boolean {
    const tmp = localStorage.getItem(this.LoginStatus);
    if (tmp == null) {
      return false;
    }
    const loginObject = JSON.parse(tmp);
    if (loginObject == null || loginObject === undefined) {
      return false;
    }
    if (loginObject.status) {
      try {
        const currentDate = new Date();
        if (loginObject.loginTime < currentDate.getTime()) {
          return false;
        }
      } catch (ex) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public static Logout() {
    localStorage.removeItem(this.LoginStatus);
    localStorage.removeItem(this.LocalStorageAuthenKey);
  }
  public static ShowWaiting() {
    $.notify({
      message: 'Please wait'
    }, {
        type: 'danger'
      });
  }

  public static ShowError(message: string) {
    $.notify({
      message: message
    }, {
        type: 'danger',
        offset: {
          x: 0,
          y: 60
        }
      });
  }

  public static ShowErrores(messages: string[]) {
    const message: string = messages.join();
    $.notify({
      message: message
    }, {
        type: 'danger',
        offset: {
          x: 0,
          y: 60
        }
      });
  }

  public static ShowErrorException(error: any) {
    const message = 'Lỗi không xác định';
    ConfigSetting.ShowError(message + ': ' + error.message);
    throw error;
  }

  public static ShowSuccess(message: string) {
    $.notify({
      message: message
    }, {
        type: 'success',
        offset: {
          x: 0,
          y: 60
        }
      });
  }

  public static Select2AjaxRegister(selector: string, urlPath: string, parametersFun: any, $this, placeholder: string,
    processResults: any,
    formatRepo: any,
    formatRepoSelection: any,
    selectEvent: any,
    unSelectEvent: any = null,
    minimumInputLength: number = 0,
    delay: number = 250,
    allowClear: boolean = true,
    dropdownParent: any = null
  ) {
    const url = ConfigSetting.CreateUrl(urlPath);
    const select2 = $(selector).select2({
      ajax: {
        url: url,
        dataType: 'json',
        delay: delay,
        data: function (result) {
          const params = parametersFun(result, $this);
          return params;
        },
        transport: function (params, success, failure) {
          params.beforeSend = function (request) {
            const token: string = ConfigSetting.GetAuthenToken;
            request.setRequestHeader('Authorization', `Bearer ${token}`);
          };
          const $request = $.ajax(params);
          $request.then(success);
          $request.fail(failure);
          return $request;
        },
        processResults: processResults,
        cache: true,
      },
      escapeMarkup: function (markup) { return markup; },
      placeholder: placeholder,
      minimumInputLength: minimumInputLength,
      templateResult: formatRepo,
      templateSelection: formatRepoSelection,
      allowClear: allowClear,
      dropdownParent: dropdownParent
    });
    select2.on('select2:select', function (e) {
      selectEvent(e, $this);
    });

    if (unSelectEvent !== undefined && unSelectEvent != null) {
      select2.on('select2:unselect', function (e) {
        unSelectEvent(e, $this);
      });
    }
  }
}
