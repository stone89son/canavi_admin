import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanaviAttribtuteFilterMappingModel } from 'src/app/models/canavi/attribute-filter-mapping/attribute-group-request-search';
import { KeyValueModel } from 'src/app/models/result-model';
import { CanaviAttributeFilterMappingService } from 'src/app/services/canavi/attribute-filter-mapping/attribute-filter-mapping-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-filter-mapping-add-or-update',
  templateUrl: './attribute-filter-mapping-add-or-update.component.html',
  styleUrls: ['./attribute-filter-mapping-add-or-update.component.css']
})
export class AttributeFilterMappingAddOrUpdateComponent implements OnInit {
  @Output() reloadAttributeFilterMapping = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  attributeFilterMapping: CanaviAttribtuteFilterMappingModel;
  formValid = true;
  attributeMappingTypes: KeyValueModel[];
  statuses: KeyValueModel[];
  filterTypes: KeyValueModel[];

  constructor(
    private attributeFilterMappingService: CanaviAttributeFilterMappingService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.attributeFilterMapping = new CanaviAttribtuteFilterMappingModel();
    this.onRegisterAttribute();
    // await this.onGet();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.attributeFilterMappingService.get(this.id);
      if (response.status) {
        this.attributeFilterMapping = response.attributeFilterMapping;
        this.attributeMappingTypes = response.attributeMappingTypes;
        this.filterTypes = response.filterTypes;
        this.statuses = response.statuses;
        if (this.id.length > 0) {
          $('#attributeIdAutocomplete').find('option').remove();
          $('#attributeIdAutocomplete').append(`<option value="${this.attributeFilterMapping.attributeId}" selected="selected">${this.attributeFilterMapping.attributeName}</option>`);
        } else {
          $('#attributeIdAutocomplete').find('option').remove();
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
      const response = await this.attributeFilterMappingService.addOrUpdate(this.attributeFilterMapping);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAttributeFilterMapping.emit();
        $('#attribute-filter-mapping-addOrChange').modal('hide');
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
  // region Attribute
  async onRegisterAttribute(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#attributeIdAutocomplete',
        ConfigSetting.UrlPathCanaviAttributeFilterMappingGetAttributes,
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
        false,
        $('#attribute-filter-mapping-addOrChange')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunAttribute(params, $this) {
    const query = {
      keyword: params.term
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
    $this.attributeFilterMapping.attributeId = id;
  }
  // endregion Attribute
}
