import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ComponentKeywordConfigModel } from 'src/app/models/canavi/component-group/component-keyword-config-request';
import { ComponentKeywordConfigService } from 'src/app/services/canavi/component-group/component-keyword-config-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-keyword-config-add-or-update',
  templateUrl: './component-keyword-config-add-or-update.component.html',
  styleUrls: ['./component-keyword-config-add-or-update.component.css']
})
export class ComponentKeywordConfigAddOrUpdateComponent implements OnInit {
  @Output() reloadComponentKeyword = new EventEmitter<boolean>();
  id: string;
  componentGroupId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  componentKeyword: ComponentKeywordConfigModel;
  formValid = true;
  statuses: KeyValueModel[];

  constructor(
    private componentKeywordConfigService: ComponentKeywordConfigService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.componentKeyword = new ComponentKeywordConfigModel();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.componentKeywordConfigService.get(this.id);
      if (response.status) {
        this.componentKeyword = response.componentKeyword;
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
      this.componentKeyword.componentGroupId = this.componentGroupId;
      const response = await this.componentKeywordConfigService.addOrUpdate(this.componentKeyword);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadComponentKeyword.emit();
        $('#component-keyword-add-or-update').modal('hide');
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
