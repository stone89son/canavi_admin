import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JobStatusGroupModel } from '../../../../models/canavi/jobs/job-status-group-request';
import { JobStatusGroupService } from '../../../../services/canavi/jobs/system.job-status-group.service';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-job-status-group-add-or-update',
  templateUrl: './job-status-group-add-or-update.component.html',
  styleUrls: ['./job-status-group-add-or-update.component.css']
})
export class JobStatusGroupAddOrUpdateComponent implements OnInit {
  @Output() reloadJobStatusGroup = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  jobStatusGroup: JobStatusGroupModel;
  formValid = true;

  constructor(
    private jobStatusGroupService: JobStatusGroupService,
  ) { }

  async ngOnInit() {
    this.formValid = true;
    this.jobStatusGroup = new JobStatusGroupModel();
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
      const response = await this.jobStatusGroupService.get(this.id);
      if (response.status) {
        this.jobStatusGroup = response.jobStatusGroup;
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
      let response;
      if (this.jobStatusGroup.id == null || this.jobStatusGroup.id === undefined || this.jobStatusGroup.id.length <= 0) {
        response = await this.jobStatusGroupService.add(this.jobStatusGroup);
      } else {
        response = await this.jobStatusGroupService.update(this.jobStatusGroup);
      }
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadJobStatusGroup.emit();
        $('#jobStatusGroup-addOrChange').modal('hide');
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
