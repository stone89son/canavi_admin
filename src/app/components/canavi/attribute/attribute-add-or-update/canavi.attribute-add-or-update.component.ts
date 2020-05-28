import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanaviAttributeService } from '../../../../services/canavi/attribute/canavi.attribute.service';
import { CanaviAttribtuteModel } from '../../../../models/canavi/attribute/attribute-request-search';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-canavi-attribute-add-or-update',
  templateUrl: './canavi.attribute-add-or-update.component.html',
  styleUrls: ['./canavi.attribute-add-or-update.component.css'],
})


export class CanaviAttributeAddOrUpdateComponent implements OnInit {
  @Output() reloadAttribute = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  attribute: CanaviAttribtuteModel;
  formValid = true;
  types: KeyValueModel[];
  statuses: KeyValueModel[];

  constructor(
    private canaviAttributeService: CanaviAttributeService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.attribute = new CanaviAttribtuteModel();
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
      const response = await this.canaviAttributeService.get(this.id);
      if (response.status) {
        this.attribute = response.attribute;
        this.types = response.types;
        this.statuses = response.statuses;
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
      const response = await this.canaviAttributeService.addOrUpdate(this.attribute);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAttribute.emit();
        $('#canavi-attribute-addOrChange').modal('hide');
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
