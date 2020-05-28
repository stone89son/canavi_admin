import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentBlogPostConfigAddOrUpdateComponent } from './component-blog-post-config-add-or-update/component-blog-post-config-add-or-update.component';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ComponentBlogPostConfigService } from 'src/app/services/canavi/component-group/component-blog-post-config-service';
import { ComponentBlogPostConfigSearchRequest, ComponentBlogPostConfigModel } from 'src/app/models/canavi/component-group/component-blog-post-config-request';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-blog-post-config',
  templateUrl: './component-blog-post-config.component.html',
  styleUrls: ['./component-blog-post-config.component.css']
})
export class ComponentBlogPostConfigComponent implements OnInit {
  @ViewChild(ComponentBlogPostConfigAddOrUpdateComponent, {static: false}) componentBlogPostConfigAddOrUpdate: ComponentBlogPostConfigAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: ComponentBlogPostConfigSearchRequest;
  componentBlogPosts: ComponentBlogPostConfigModel[];
  statuses: KeyValueModel[];

  constructor(
    private componentBlogPostConfigService: ComponentBlogPostConfigService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new ComponentBlogPostConfigSearchRequest();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.searchParams.componentGroupId = param.get('componentGroupId');
      this.onSearch();
    });
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.componentBlogPostConfigService.search(this.searchParams);
      if (response.status) {
        this.componentBlogPosts = response.componentBlogPosts;
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
      this.componentBlogPostConfigAddOrUpdate.id = id;
      this.componentBlogPostConfigAddOrUpdate.componentGroupId = this.searchParams.componentGroupId;
      this.componentBlogPostConfigAddOrUpdate.onGet();
      $('#component-blog-post-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
