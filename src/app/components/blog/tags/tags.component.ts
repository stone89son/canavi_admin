import { Component, OnInit, ViewChild } from '@angular/core';
import { TagsAddOrUpdateComponent } from './tags-add-or-update/tags-add-or-update.component';
import { BlogTagsSearchRequest, BlogTagsModel } from '../../../models/blog/tags/blog-tags-model';
import { BlogTagsService } from '../../../services/blog/blog-tags.service';
import { ConfigSetting } from '../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @ViewChild(TagsAddOrUpdateComponent, {static: false}) tagsAddOrUpdate: TagsAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: BlogTagsSearchRequest;
  tags: BlogTagsModel[];

  constructor(
    private tagsService: BlogTagsService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new BlogTagsSearchRequest();
    this.onGets();
  }

  async onGets(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.tagsService.search(this.searchParams);
      if (response.status) {
        this.tags = response.tags;
        this.totalRow = response.totalRow;
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
      this.tagsAddOrUpdate.id = id;
      this.tagsAddOrUpdate.onGet();
      $('#tags-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
