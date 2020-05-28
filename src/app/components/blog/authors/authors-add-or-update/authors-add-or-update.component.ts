import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogAuthorsModel } from '../../../../models/blog/authors/blog-authors-model';
import { KeyValueModel } from '../../../../models/upload/result-model';
import { BlogAuthorsService } from '../../../../services/blog/blog-authors.service';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-authors-add-or-update',
  templateUrl: './authors-add-or-update.component.html',
  styleUrls: ['./authors-add-or-update.component.css']
})
export class AuthorsAddOrUpdateComponent implements OnInit {
  @Output() reloadAuthors = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  author: BlogAuthorsModel;
  formValid = true;
  statuses: KeyValueModel[];

  constructor(
    private authorsService: BlogAuthorsService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.author = new BlogAuthorsModel();
    // await this.onGet();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.authorsService.get(this.id);
      if (response.status) {
        this.author = response.author;
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
      const response = await this.authorsService.addOrChange(this.author);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAuthors.emit();
        $('#authors-addOrChange').modal('hide');
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
