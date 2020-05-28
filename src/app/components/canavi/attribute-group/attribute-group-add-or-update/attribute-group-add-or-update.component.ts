import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanaviAttribtuteGroupModel } from '../../../../models/canavi/attribute-group/attribute-group-request-search';
import { KeyValueModel } from '../../../../models/result-model';
import { CanaviAttributeGroupService } from '../../../../services/canavi/attribute-group/canavi-attribute-group-service';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-attribute-group-add-or-update',
  templateUrl: './attribute-group-add-or-update.component.html',
  styleUrls: ['./attribute-group-add-or-update.component.css']
})
export class AttributeGroupAddOrUpdateComponent implements OnInit {
  @Output() reloadAttributeGroup = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  attributeGroup: CanaviAttribtuteGroupModel;
  formValid = true;
  types: KeyValueModel[];

  constructor(
    private attributeGroupService: CanaviAttributeGroupService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.attributeGroup = new CanaviAttribtuteGroupModel();
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
      const response = await this.attributeGroupService.get(this.id);
      if (response.status) {
        this.attributeGroup = response.attributeGroup;
        this.types = response.groupTypes;
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
      const response = await this.attributeGroupService.addOrUpdate(this.attributeGroup);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAttributeGroup.emit();
        $('#attributeGroup-addOrChange').modal('hide');
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
