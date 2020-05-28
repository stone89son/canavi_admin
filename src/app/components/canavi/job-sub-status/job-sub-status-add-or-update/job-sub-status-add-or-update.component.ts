import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JobSubStatusModel } from '../../../../models/canavi/jobs/job-sub-status-request';
import { KeyValueModel } from '../../../../models/result-model';
import { JobSubStatusService } from '../../../../services/canavi/jobs/job-sub-status.service';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-job-sub-status-add-or-update',
  templateUrl: './job-sub-status-add-or-update.component.html',
  styleUrls: ['./job-sub-status-add-or-update.component.css']
})
export class JobSubStatusAddOrUpdateComponent implements OnInit {
  @Output() reloadJobStatus = new EventEmitter<boolean>();
  id: string;
  jobStatusId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  jobSubStatus: JobSubStatusModel;
  formValid = true;
  jobStatuses: KeyValueModel[];

  constructor(
    private jobSubStatusService: JobSubStatusService,
  ) { }

  async ngOnInit() {
    this.formValid = true;
    this.jobSubStatus = new JobSubStatusModel();
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
      const response = await this.jobSubStatusService.get(this.id);
      if (response.status) {
        this.jobSubStatus = response.jobSubStatus;
        this.jobSubStatus.jobStatusId = this.jobStatusId;
        this.jobStatuses = response.jobStatuses;
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
      if (this.jobSubStatus.id == null || this.jobSubStatus.id === undefined || this.jobSubStatus.id.length <= 0) {
        response = await this.jobSubStatusService.add(this.jobSubStatus);
      } else {
        response = await this.jobSubStatusService.update(this.jobSubStatus);
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
