import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentRecuiterConfigModel } from 'src/app/models/canavi/component-group/component-recuiter-config-request';
import { ComponentRecuiterConfigService } from 'src/app/services/canavi/component-group/component-recuiter-config-service';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-recuiter-config-add-or-update',
  templateUrl: './component-recuiter-config-add-or-update.component.html',
  styleUrls: ['./component-recuiter-config-add-or-update.component.css']
})
export class ComponentRecuiterConfigAddOrUpdateComponent implements OnInit {
  @Output() reloadComponentRecuiter = new EventEmitter<boolean>();
  id: string;
  componentGroupId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  componentRecuiter: ComponentRecuiterConfigModel;
  formValid = true;
  statuses: KeyValueModel[];

  constructor(
    private componentRecuiterConfigService: ComponentRecuiterConfigService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.componentRecuiter = new ComponentRecuiterConfigModel();
    this.onRegisterRecuiter();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.componentRecuiterConfigService.get(this.id);
      if (response.status) {
        this.componentRecuiter = response.componentRecuiter;
        this.statuses = response.statuses;
        if (this.id.length > 0) {
          $('#recuiterIdAutocomplete').find('option').remove();
          $('#recuiterIdAutocomplete').append(`<option value="${this.componentRecuiter.targetId}" selected="selected">${this.componentRecuiter.recuiterName}</option>`);
        } else {
          $('#recuiterIdAutocomplete').find('option').remove();
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
      App.blockUI();
      this.componentRecuiter.componentGroupId = this.componentGroupId;
      const response = await this.componentRecuiterConfigService.addOrUpdate(this.componentRecuiter);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadComponentRecuiter.emit();
        $('#component-recuiter-add-or-update').modal('hide');
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

  //region Recuiter
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
        null,
        0,
        250,
        false,
        $('#component-recuiter-add-or-update')
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
    $this.componentRecuiter.targetId = id;
  }
  // endregion Recuiter
}
