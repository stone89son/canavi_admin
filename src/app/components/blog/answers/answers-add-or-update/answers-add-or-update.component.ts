import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnswersModel } from 'src/app/models/blog/answers/answers-model';
import { BlogAnswersService } from 'src/app/services/blog/blog-answers.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel } from 'src/app/models/upload/result-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-answers-add-or-update',
  templateUrl: './answers-add-or-update.component.html',
  styleUrls: ['./answers-add-or-update.component.css']
})
export class AnswersAddOrUpdateComponent implements OnInit {
  @Output() reloadAnswers = new EventEmitter<boolean>();
  id: string;
  questionId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  answer: AnswersModel;
  formValid = true;
  statuses: KeyValueModel[];
  config = {
    height: '500px',
    allowedContent: true,
    extraPlugins: 'divarea',
    filebrowserBrowseUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload),
    filebrowserUploadUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload)
  };

  constructor(
    private answersService: BlogAnswersService,
  ) { }

  async ngOnInit() {
    this.formValid = true;
    this.answer = new AnswersModel();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.answersService.get(this.id);
      if (response.status) {
        this.answer = response.answer;
        this.answer.questionId = this.questionId;
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
      const response = await this.answersService.addOrChange(this.answer);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadAnswers.emit();
        $('#answers-addOrChange').modal('hide');
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
