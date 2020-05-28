import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanaviAttributeRelationshipService } from 'src/app/services/canavi/attribute-relationship/canavi-attribute-relationship-service';
import { CanaviAttribtuteRelationshipModel } from 'src/app/models/canavi/attribute-relationship/attribute-relationship-request-search';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel } from '../../../../models/upload/result-model';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-relationship-add-or-update',
  templateUrl: './attribute-relationship-add-or-update.component.html',
  styleUrls: ['./attribute-relationship-add-or-update.component.css']
})
export class AttributeRelationshipAddOrUpdateComponent implements OnInit {
  @Output() reloadAttributeRelationship = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  attributeRelationship: CanaviAttribtuteRelationshipModel;
  formValid = true;
  statuses: KeyValueModel[];

  constructor(
    private attributeRelationshipService: CanaviAttributeRelationshipService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.attributeRelationship = new CanaviAttribtuteRelationshipModel();
    // await this.onGet();
    this.onRegisterOrgAttribute();
    this.onRegisterRelatedAttribute();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.attributeRelationshipService.get(this.id);
      if (response.status) {
        this.attributeRelationship = response.attributeRelationship;
        this.statuses = response.statuses;
        if (this.id.length > 0) {
          $('#orgAttributeAutocomplete').find('option').remove();
          $('#orgAttributeAutocomplete').append(`<option value="${this.attributeRelationship.orgAttributeId}" selected="selected">${this.attributeRelationship.orgAttributeName}</option>`);
          $('#relatedAttributeAutocomplete').find('option').remove();
          $('#relatedAttributeAutocomplete').append(`<option value="${this.attributeRelationship.relatedAttributeId}" selected="selected">${this.attributeRelationship.relatedAttributeName}</option>`);
        } else {
          $('#orgAttributeAutocomplete').find('option').remove();
          $('#relatedAttributeAutocomplete').find('option').remove();
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
      const response = await this.attributeRelationshipService.addOrUpdate(this.attributeRelationship);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAttributeRelationship.emit();
        $('#attributeRelationship-addOrChange').modal('hide');
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

  async onRegisterOrgAttribute(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#orgAttributeAutocomplete',
        ConfigSetting.UrlPathCanaviAttributeRelationshipGetAttributes,
        this.createParametersFun,
        $this,
        'Search OrgAttribute',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectOrgAttributeEvent,
        null,
        0,
        250,
        false,
        $('#attributeRelationship-addOrChange')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onRegisterRelatedAttribute(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#relatedAttributeAutocomplete',
        ConfigSetting.UrlPathCanaviAttributeRelationshipGetAttributes,
        this.createParametersFun,
        $this,
        'Search RelatedAttribute',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectRelatedAttributeEvent,
        null,
        0,
        250,
        false,
        $('#attributeRelationship-addOrChange')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  createParametersFun(params, $this) {
    const query = {
      keyword: params.term
    };
    return query;
  }
  formatRepo(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelection(repo) {
    return repo.text;
  }
  processResults(data, params) {
    return {
      results: data.attributes
    };
  }
  selectOrgAttributeEvent(e, $this) {
    const id = e.params.data.id;
    $this.attributeRelationship.orgAttributeId = id;
  }
  selectRelatedAttributeEvent(e, $this) {
    const id = e.params.data.id;
    $this.attributeRelationship.relatedAttributeId = id;
  }
}
