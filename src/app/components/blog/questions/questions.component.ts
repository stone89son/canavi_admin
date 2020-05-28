import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionsSearchRequest, QuestionsSearchResponse } from 'src/app/models/blog/questions/questions-model';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { BlogQuestionsService } from 'src/app/services/blog/blog-questions.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { QuestionsAddOrUpdateComponent } from './questions-add-or-update/questions-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  @ViewChild(QuestionsAddOrUpdateComponent, {static: false}) questionssAddOrUpdate: QuestionsAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: QuestionsSearchRequest;
  questions: QuestionsSearchResponse;
  statuses: KeyValueModel[];
  status: number;
  constructor(
    private questionsService: BlogQuestionsService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new QuestionsSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.questionsService.search(this.searchParams);
      if (response.status) {
        this.questions = response.questions;
        this.statuses = response.statuses;
        this.totalRow = response.totalRow;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  pageChanged(page: number) {
    this.onSearch(page);
  }

  async onShowFormAddOrChange(id: string): Promise<void> {
    try {
      this.questionssAddOrUpdate.id = id;
      this.questionssAddOrUpdate.onGet();
      $('#questions-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
