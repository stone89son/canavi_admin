import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentGroupModel } from 'src/app/models/canavi/component-group/component-group-request';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ComponentGroupService } from 'src/app/services/canavi/component-group/component-group-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-group-add-or-update',
  templateUrl: './component-group-add-or-update.component.html',
  styleUrls: ['./component-group-add-or-update.component.css']
})
export class ComponentGroupAddOrUpdateComponent implements OnInit {
  @Output() reloadComponentGroup = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  componentGroup: ComponentGroupModel;
  formValid = true;
  groupTypes: KeyValueModel[];
  statuses: KeyValueModel[];

  constructor(
    private componentGroupService: ComponentGroupService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.componentGroup = new ComponentGroupModel();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.componentGroupService.get(this.id);
      if (response.status) {
        this.componentGroup = response.componentGroup;
        this.groupTypes = response.groupTypes;
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
      const response = await this.componentGroupService.addOrUpdate(this.componentGroup);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadComponentGroup.emit();
        $('#component-group-add-or-update').modal('hide');
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
