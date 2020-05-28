import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommisstionFeeModel } from 'src/app/models/canavi/commisstion-fee/commisstion-fee-request';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel } from 'src/app/models/result-model';
import { CanaviCommisstionFeeService } from 'src/app/services/canavi/commisstion-fee/comisstion-fee-service';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-commisstion-fee-add-or-update',
  templateUrl: './commisstion-fee-add-or-update.component.html',
  styleUrls: ['./commisstion-fee-add-or-update.component.css']
})
export class CommisstionFeeAddOrUpdateComponent implements OnInit {
  @Output() reloadCommisstionFee = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  commisstionFee: CommisstionFeeModel;
  formValid = true;
  commissionTypes: KeyValueModel[];
  objectTypes: KeyValueModel[];
  configTypes: KeyValueModel[];
  statuses: KeyValueModel[];

  constructor(
    private commisstionFeeService: CanaviCommisstionFeeService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.commisstionFee = new CommisstionFeeModel();
    this.commisstionFee.jobId = '';
    this.commisstionFee.objectType = 0;
    this.commisstionFee.configType = 0;
    this.commisstionFee.categoryId = '';
    this.commisstionFee.recuiterId = '';
    this.commisstionFee.workingTypeId = '';
    this.commisstionFee.commissionType = 0;
    this.commisstionFee.status = 0;
    this.onRegisterRecuiter();
    this.onRegisterJob();
    this.onRegisterCategory();
    this.onRegisterWorkingType();
    await this.onGet();
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
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.commisstionFeeService.get(this.id);
      if (response.status) {
        this.commisstionFee = response.commisstionFee;
        this.objectTypes = response.objectTypes;
        this.configTypes = response.configTypes;
        this.commissionTypes = response.commissionTypes;
        this.statuses = response.statuses;
        if (this.id != null && this.id !== undefined && this.id.length > 0) {
          $('#categoryIdAutocomplete').find('option').remove();
          $('#categoryIdAutocomplete').append(`<option value="${this.commisstionFee.categoryId}" selected="selected">${this.commisstionFee.categoryName}</option>`);
          $('#workingTypeIdAutocomplete').find('option').remove();
          $('#workingTypeIdAutocomplete').append(`<option value="${this.commisstionFee.workingTypeId}" selected="selected">${this.commisstionFee.workingTypeName}</option>`);
          $('#recuiterIdAutocomplete').find('option').remove();
          $('#recuiterIdAutocomplete').append(`<option value="${this.commisstionFee.recuiterId}" selected="selected">${this.commisstionFee.recuiterName}</option>`);
          $('#jobIdAutocomplete').find('option').remove();
          $('#jobIdAutocomplete').append(`<option value="${this.commisstionFee.jobId}" selected="selected">${this.commisstionFee.jobName}</option>`);
        } else {
          $('#categoryIdAutocomplete').find('option').remove();
          $('#workingTypeIdAutocomplete').find('option').remove();
          $('#recuiterIdAutocomplete').find('option').remove();
          $('#jobIdAutocomplete').find('option').remove();
        }
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onGetStatus = false;
      App.unblockUI();
    }
  }

  async onSave() {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSaveStatus = true;
      this.commisstionFee.startDateUtc = $('input[name=\'startDateUtc\']').val();
      this.commisstionFee.endDateUtc = $('input[name=\'endDateUtc\']').val();
      App.blockUI();
      const response = await this.commisstionFeeService.addOrUpdate(this.commisstionFee);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadCommisstionFee.emit();
        $('#commisstion-fee-add-or-update').modal('hide');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onSaveStatus = false;
      App.unblockUI();
    }
  }
  async onRegisterRecuiter(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#recuiterIdAutocomplete',
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
        $('#commisstion-fee-add-or-update')
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
    $this.commisstionFee.recuiterId = id;
  }
  unSelectRecuiterEvent(e, $this) {
    $this.commisstionFee.recuiterId = '';
  }
  // endregion Recuiter
  // region Job
  async onRegisterJob(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#jobIdAutocomplete',
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
        $('#commisstion-fee-add-or-update')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunJob(params, $this) {
    const query = {
      title: params.term,
      recuiterId: $this.commisstionFee.recuiterId
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
    $this.commisstionFee.jobId = id;
  }
  unSelectJobEvent(e, $this) {
    $this.commisstionFee.jobId = '';
  }
  // endregion Job
  // region Category
  async onRegisterCategory(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#categoryIdAutocomplete',
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
        $('#commisstion-fee-add-or-update')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunCategory(params, $this) {
    const query = {
      term: params.term,
      categoryId: $this.commisstionFee.categoryId
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
    $this.commisstionFee.categoryId = id;
  }
  unSelectCategoryEvent(e, $this) {
    $this.commisstionFee.categoryId = '';
  }
  // endregion Category

  // region WorkingType
  async onRegisterWorkingType(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#workingTypeIdAutocomplete',
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
        $('#commisstion-fee-add-or-update')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunWorkingType(params, $this) {
    const query = {
      term: params.term,
      workingTypeId: $this.commisstionFee.workingTypeId
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
    $this.commisstionFee.workingTypeId = id;
  }
  unSelectWorkingTypeEvent(e, $this) {
    $this.commisstionFee.workingTypeId = '';
  }
  // endregion WorkingType

}
