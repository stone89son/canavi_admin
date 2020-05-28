import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JobStatusModel } from '../../../../models/canavi/jobs/job-status-request';
import { JobStatusService } from '../../../../services/canavi/jobs/job-status.service';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-job-status-add-or-update',
  templateUrl: './job-status-add-or-update.component.html',
  styleUrls: ['./job-status-add-or-update.component.css']
})
export class JobStatusAddOrUpdateComponent implements OnInit {
  @Output() reloadJobStatus = new EventEmitter<boolean>();
  id: string;
  jobStatusGroupId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  jobStatus: JobStatusModel;
  formValid = true;
  jobStatusGroups: KeyValueModel[];

  constructor(
    private jobStatusService: JobStatusService,
  ) { }

  async ngOnInit() {
    this.formValid = true;
    this.jobStatus = new JobStatusModel();
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
      const response = await this.jobStatusService.get(this.id);
      if (response.status) {
        this.jobStatus = response.jobStatus;
        this.jobStatus.jobStatusGroupId = this.jobStatusGroupId;
        this.jobStatusGroups = response.jobStatusGroups;
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
      if (this.jobStatus.id == null || this.jobStatus.id === undefined || this.jobStatus.id.length <= 0) {
        response = await this.jobStatusService.add(this.jobStatus);
      } else {
        response = await this.jobStatusService.update(this.jobStatus);
      }
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadJobStatus.emit();
        $('#jobStatus-addOrChange').modal('hide');
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
