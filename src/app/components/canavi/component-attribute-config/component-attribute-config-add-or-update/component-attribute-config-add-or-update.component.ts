import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentAttributeConfigModel } from 'src/app/models/canavi/component-group/component-attribute-config-request';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ComponentAttributeConfigService } from 'src/app/services/canavi/component-group/component-attribute-config-service';
import { debug } from 'util';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-attribute-config-add-or-update',
  templateUrl: './component-attribute-config-add-or-update.component.html',
  styleUrls: ['./component-attribute-config-add-or-update.component.css']
})
export class ComponentAttributeConfigAddOrUpdateComponent implements OnInit {
  @Output() reloadComponentAttribute = new EventEmitter<boolean>();
  id: string;
  componentGroupId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  urlSearch: string;
  componentAttributeConfig: ComponentAttributeConfigModel;
  formValid = true;
  statuses: KeyValueModel[];
  attributeTypes: KeyValueModel[];

  constructor(
    private componentAttributeConfigService: ComponentAttributeConfigService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.componentAttributeConfig = new ComponentAttributeConfigModel();
    this.onRegisterAttributeValue();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.componentAttributeConfigService.get(this.id);
      if (response.status) {
        this.componentAttributeConfig = response.componentAttributeConfig;
        this.statuses = response.statuses;
        this.attributeTypes = response.attributeTypes;
        if (this.id.length > 0) {
          $('#attributeValueIdAutocomplete').find('option').remove();
          $('#attributeValueIdAutocomplete').append(`<option value="${this.componentAttributeConfig.attributeValueId}" selected="selected">${this.componentAttributeConfig.attributeValueName}</option>`);
        } else {
          $('#attributeValueIdAutocomplete').find('option').remove();
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

  // region Attribute value
  async onRegisterAttributeValue(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#attributeValueIdAutocomplete',
        ConfigSetting.UrlPathCanaviCommonCompomnentSearch,
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
        false,
        $('#component-attribute-add-or-update')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  createParametersFunAttributeValue(params, $this) {
    const query = {
      keyword: params.term,
      attributeType: $this.componentAttributeConfig.attributeType
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
      results: data.data
    };
  }
  selectAttributeValueEvent(e, $this) {
    const id = e.params.data.id;
    $this.componentAttributeConfig.attributeValueId = id;
  }
  // endregion Attribute value

  async onSave() {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSaveStatus = true;
      App.blockUI();
      this.componentAttributeConfig.componentGroupId = this.componentGroupId;
      const response = await this.componentAttributeConfigService.addOrUpdate(this.componentAttributeConfig);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadComponentAttribute.emit();
        $('#component-attribute-add-or-update').modal('hide');
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
}
