import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanaviSearchHistoryModel } from 'src/app/models/canavi/search-history/search-history-request';
import { CanaviSearchHistoryService } from 'src/app/services/canavi/search-history/canavi-search-history-service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-search-history-add-or-update',
  templateUrl: './search-history-add-or-update.component.html',
  styleUrls: ['./search-history-add-or-update.component.css']
})
export class SearchHistoryAddOrUpdateComponent implements OnInit {
  @Output() reloadSearchHistory = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  searchHistory: CanaviSearchHistoryModel;
  formValid = true;

  constructor(
    private searchHistoryService: CanaviSearchHistoryService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.searchHistory = new CanaviSearchHistoryModel();
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
      const response = await this.searchHistoryService.get(this.id);
      if (response.status) {
        this.searchHistory = response.searchHistory;
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
      const response = await this.searchHistoryService.addOrUpdate(this.searchHistory);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadSearchHistory.emit();
        $('#search-history-addOrChange').modal('hide');
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
