import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanaviAttribtuteValueModel } from '../../../../models/canavi/attribute/attribute-value-request-search';
import { KeyValueModel } from '../../../../models/result-model';
import { CanaviAttributeValueService } from '../../../../services/canavi/attribute-value/canavi-attribute-value-service';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-attribute-value-add-or-update',
  templateUrl: './canavi.attribute-value-add-or-update.component.html',
  styleUrls: ['./canavi.attribute-value-add-or-update.component.css']
})
export class CanaviAttributeValueAddOrUpdateComponent implements OnInit {
  @Output() reloadAttributeValue = new EventEmitter<boolean>();
  id: string;
  attributeId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  attributeValue: CanaviAttribtuteValueModel;
  formValid = true;
  statuses: KeyValueModel[];
  parents: KeyValueModel[];

  constructor(
    private canaviAttributeValueService: CanaviAttributeValueService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.attributeValue = new CanaviAttribtuteValueModel();
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
      const response = await this.canaviAttributeValueService.get(this.id);
      if (response.status) {
        this.attributeValue = response.attributeValue;
        this.statuses = response.statuses;
        this.parents = response.parents;
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
      this.attributeValue.attributeId = this.attributeId;
      const response = await this.canaviAttributeValueService.addOrUpdate(this.attributeValue);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAttributeValue.emit();
        $('#canavi-attribute-value-addOrChange').modal('hide');
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
