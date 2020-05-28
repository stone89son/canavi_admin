import { Component, OnInit, ViewChild } from '@angular/core';
import { AnswersAddOrUpdateComponent } from './answers-add-or-update/answers-add-or-update.component';
import { AnswersSearchRequest, AnswersModel } from 'src/app/models/blog/answers/answers-model';
import { BlogAnswersService } from 'src/app/services/blog/blog-answers.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel } from 'src/app/models/upload/result-model';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @ViewChild(AnswersAddOrUpdateComponent, {static: false}) answersAddOrUpdate: AnswersAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: AnswersSearchRequest;
  answers: AnswersModel[];
  statuses: KeyValueModel[];

  constructor(
    private answersService: BlogAnswersService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new AnswersSearchRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.questionId = param.get('questionId');
      this.onSearch();
    });
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.answersService.search(this.searchParams);
      if (response.status) {
        this.answers = response.answers;
        this.statuses = response.statuses;
        this.totalRow = response.totalRow;
      } else {
        this.totalRow = 0;
      }
    } catch (error) {
      ConfigSetting.ShowError(error);
    }
    finally {
      App.unblockUI();
    }
  }

  async onShowFormAddOrChange(id: string): Promise<void> {
    try {
      this.answersAddOrUpdate.id = id;
      this.answersAddOrUpdate.questionId = this.searchParams.questionId;
      this.answersAddOrUpdate.onGet();
      $('#answers-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
