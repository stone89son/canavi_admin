import { Component, OnInit } from '@angular/core';
import { BlogSearchRequestModel, BlogSearchResponse } from 'src/app/models/blog/posts/blog-post-search-model';
import { BlogPostService } from 'src/app/services/blog/blog-post.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel } from '../../../models/upload/result-model';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: BlogSearchRequestModel;
  posts: BlogSearchResponse[];
  statuses: KeyValueModel[];
  categories: KeyValueModel[];
  status: number;
  feDomain: string;
  constructor(
    private postService: BlogPostService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new BlogSearchRequestModel();
    this.onSearch();
  }
  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      this.searchParams.status = this.status ? [this.status] : [];
      const response = await this.postService.search(this.searchParams);
      if (response.status) {
        const realPost = [];
        response.posts.forEach(element => {
          element.url = ConfigSetting.FE_DOMAIN + element.url;
          realPost.push(element);
        });

        this.posts = realPost;
        this.statuses = response.statuses;
        this.categories = response.categories;
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
}
