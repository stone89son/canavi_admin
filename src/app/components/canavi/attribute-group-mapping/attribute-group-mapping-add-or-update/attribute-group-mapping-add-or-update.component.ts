import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanaviAttribtuteGroupMappingModel } from '../../../../models/canavi/attribute-group/attribute-group-request-search';
import { KeyValueModel } from '../../../../models/result-model';
import { CanaviAttributeGroupService } from '../../../../services/canavi/attribute-group/canavi-attribute-group-service';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-group-mapping-add-or-update',
  templateUrl: './attribute-group-mapping-add-or-update.component.html',
  styleUrls: ['./attribute-group-mapping-add-or-update.component.css']
})
export class AttributeGroupMappingAddOrUpdateComponent implements OnInit {
  @Output() reloadAttributeGroupMapping = new EventEmitter<boolean>();
  id: string;
  attributeGroupId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  attributeGroupMapping: CanaviAttribtuteGroupMappingModel;
  formValid = true;
  attributes: KeyValueModel[];
  statuses: KeyValueModel[];
  attributeTypes: KeyValueModel[];

  constructor(
    private attributeGroupService: CanaviAttributeGroupService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.attributeGroupMapping = new CanaviAttribtuteGroupMappingModel();
    await this.onGet();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.attributeGroupService.attributeGroupMappingGetById(this.id);
      if (response.status) {
        this.attributeGroupMapping = response.attributeAttributeGroupMapping;
        this.attributes = response.attributes;
        this.statuses = response.statuses;
        this.attributeTypes = response.attributeTypes;
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
      this.attributeGroupMapping.attributeGroupId = this.attributeGroupId;
      const response = await this.attributeGroupService.attributeGroupMappingAddOrUpdate(this.attributeGroupMapping);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAttributeGroupMapping.emit();
        $('#attributeGroupMapping-addOrChange').modal('hide');
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
