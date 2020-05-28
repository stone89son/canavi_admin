import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogTagsModel } from '../../../../models/blog/tags/blog-tags-model';
import { KeyValueModel } from '../../../../models/upload/result-model';
import { BlogTagsService } from '../../../../services/blog/blog-tags.service';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-tags-add-or-update',
  templateUrl: './tags-add-or-update.component.html',
  styleUrls: ['./tags-add-or-update.component.css']
})
export class TagsAddOrUpdateComponent implements OnInit {
  @Output() reloadTags = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  tag: BlogTagsModel;
  formValid = true;
  statuses: KeyValueModel[];
  types: KeyValueModel[];

  constructor(
    private tagsService: BlogTagsService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.tag = new BlogTagsModel();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.tagsService.get(this.id);
      if (response.status) {
        this.tag = response.tag;
        this.statuses = response.statuses;
        this.types = response.types;
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
      const response = await this.tagsService.addOrChange(this.tag);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadTags.emit();
        $('#tags-addOrChange').modal('hide');
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
