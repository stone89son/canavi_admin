import { Component, OnInit, ViewChild } from '@angular/core';
import { CommisstionFeeAddOrUpdateComponent } from './commisstion-fee-add-or-update/commisstion-fee-add-or-update.component';
import { CommisstionFeeModel, CommisstionFeeSearchRequest } from 'src/app/models/canavi/commisstion-fee/commisstion-fee-request';
import { KeyValueModel } from 'src/app/models/result-model';
import { ConfigSetting } from 'src/app/common/configSetting';
import { CanaviCommisstionFeeService } from 'src/app/services/canavi/commisstion-fee/comisstion-fee-service';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-commisstion-fee',
  templateUrl: './commisstion-fee.component.html',
  styleUrls: ['./commisstion-fee.component.css']
})
export class CommisstionFeeComponent implements OnInit {
  @ViewChild(CommisstionFeeAddOrUpdateComponent, {static: false}) commisstionFeeAddOrUpdate: CommisstionFeeAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  objectTypes: KeyValueModel[];
  configTypes: KeyValueModel[];
  commissionTypes: KeyValueModel[];
  statuses: KeyValueModel[];
  searchParams: CommisstionFeeSearchRequest;
  commisstionFees: CommisstionFeeModel[];

  constructor(
    private commisstionFeeService: CanaviCommisstionFeeService,
  ) { }

  ngOnInit() {
    this.onRegisterRecuiter();
    this.onRegisterJob();
    this.onRegisterCategory();
    this.onRegisterWorkingType();
    this.searchParams = new CommisstionFeeSearchRequest();
    this.objectTypes = [];
    this.configTypes = [];
    this.commissionTypes = [];
    this.statuses = [];
    if (jQuery().datepicker) {
      $('.date-picker').datepicker({
        rtl: App.isRTL(),
        orientation: 'left',
        autoclose: true
      });
    }
    this.onSearch();
  }

  async onRegisterRecuiter(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#recuiterIdAutocompleteMain',
        ConfigSetting.UrlPathCanaviCommisstionFeeGetRecuiters,
        this.createParametersFunRecuiter,
        $this,
        'Search recuiter',
        this.processResultsRecuiter,
        this.formatRepoRecuiter,
        this.formatRepoSelectionRecuiter,
        this.selectRecuiterEvent,
        this.unSelectRecuiterEvent,
        0,
        250,
        true,
        $('#main-commission')
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
  unSelectRecuiterEvent(e, $this) {
    $this.searchParams.recuiterId = '';
  }
  // endregion Recuiter
  // region Job
  async onRegisterJob(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#jobIdAutocompleteMain',
        ConfigSetting.UrlPathCanaviCommisstionFeeGetJobs,
        this.createParametersFunJob,
        $this,
        'Search job',
        this.processResultsJob,
        this.formatRepoJob,
        this.formatRepoSelectionJob,
        this.selectJobEvent,
        this.unSelectJobEvent,
        0,
        250,
        true,
        $('#main-commission')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunJob(params, $this) {
    const query = {
      title: params.term,
      recuiterId: $this.searchParams.recuiterId
    };
    return query;
  }
  processResultsJob(data, params) {
    return {
      results: data.jobs
    };
  }
  formatRepoJob(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionJob(repo) {
    return repo.text;
  }
  selectJobEvent(e, $this) {
    const id = e.params.data.id;
    $this.searchParams.jobId = id;
  }
  unSelectJobEvent(e, $this) {
    $this.searchParams.jobId = '';
  }
  // endregion Job
  // region Category
  async onRegisterCategory(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#categoryIdAutocompleteMain',
        ConfigSetting.UrlPathCanaviCategorySearch,
        this.createParametersFunCategory,
        $this,
        'Search Category',
        this.processResultsCategory,
        this.formatRepoCategory,
        this.formatRepoSelectionCategory,
        this.selectCategoryEvent,
        this.unSelectCategoryEvent,
        0,
        250,
        true,
        $('#main-commission')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunCategory(params, $this) {
    const query = {
      term: params.term,
      categoryId: $this.searchParams.categoryId
    };
    return query;
  }
  processResultsCategory(data, params) {
    return {
      results: data.categories
    };
  }
  formatRepoCategory(repo) {
    if (repo.loading) {
      return repo.name;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.name + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionCategory(repo) {
    return repo.name;
  }
  selectCategoryEvent(e, $this) {
    const id = e.params.data.id;
    $this.searchParams.categoryId = id;
  }
  unSelectCategoryEvent(e, $this) {
    $this.searchParams.categoryId = '';
  }
  // endregion Category

  // region WorkingType
  async onRegisterWorkingType(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#workingTypeIdAutocompleteMain',
        ConfigSetting.UrlPathCanaviWorkingTypeSearch,
        this.createParametersFunWorkingType,
        $this,
        'Search WorkingType',
        this.processResultsWorkingType,
        this.formatRepoWorkingType,
        this.formatRepoSelectionWorkingType,
        this.selectWorkingTypeEvent,
        this.unSelectWorkingTypeEvent,
        0,
        250,
        true,
        $('#main-commission')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunWorkingType(params, $this) {
    const query = {
      term: params.term,
      workingTypeId: $this.searchParams.workingTypeId
    };
    return query;
  }
  processResultsWorkingType(data, params) {
    return {
      results: data.workingTypes
    };
  }
  formatRepoWorkingType(repo) {
    if (repo.loading) {
      return repo.workingTypeValue;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.workingTypeValue + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionWorkingType(repo) {
    return repo.workingTypeValue;
  }
  selectWorkingTypeEvent(e, $this) {
    const id = e.params.data.id;
    $this.searchParams.workingTypeId = id;
  }
  unSelectWorkingTypeEvent(e, $this) {
    $this.searchParams.workingTypeId = '';
  }
  // endregion WorkingType

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.fromEndDateUtc = $('input[name=\'fromEndDateUtc\']').val();
      this.searchParams.toEndDateUtc = $('input[name=\'toEndDateUtc\']').val();
      this.searchParams.fromStartDateUtc = $('input[name=\'fromStartDateUtc\']').val();
      this.searchParams.toStartDateUtc = $('input[name=\'toStartDateUtc\']').val();
      const response = await this.commisstionFeeService.search(this.searchParams);
      if (response.status) {
        this.commisstionFees = response.commisstionFees;
        this.objectTypes = response.objectTypes;
        this.configTypes = response.configTypes;
        this.commissionTypes = response.commissionTypes;
        this.statuses = response.statuses;
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

  async onShowFormAddOrChange(id: string): Promise<void> {
    try {
      this.commisstionFeeAddOrUpdate.id = id;
      this.commisstionFeeAddOrUpdate.onGet();
      $('#commisstion-fee-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
