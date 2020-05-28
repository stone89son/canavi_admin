import { Component, OnInit, ViewChild } from '@angular/core';
import { WikiAddOrUpdateComponent } from './wiki-add-or-update/wiki-add-or-update.component';
import { QuestionsSearchRequest, QuestionsSearchResponse } from 'src/app/models/blog/questions/questions-model';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { BlogWikiService } from 'src/app/services/blog/blog-wiki.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {
  @ViewChild(WikiAddOrUpdateComponent, {static: false}) wikiAddOrUpdate: WikiAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: QuestionsSearchRequest;
  wikis: QuestionsSearchResponse;
  statuses: KeyValueModel[];
  status: number;
  constructor(
    private wikiService: BlogWikiService,
  ) {}

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
      const response = await this.wikiService.search(this.searchParams);
      if (response.status) {
        this.wikis = response.wikis;
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
      this.wikiAddOrUpdate.id = id;
      this.wikiAddOrUpdate.onGet();
      $('#questions-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
