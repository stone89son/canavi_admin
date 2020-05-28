import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorsAddOrUpdateComponent } from './authors-add-or-update/authors-add-or-update.component';
import { BlogAuthorsSearchRequest, BlogAuthorsModel } from '../../../models/blog/authors/blog-authors-model';
import { BlogAuthorsService } from '../../../services/blog/blog-authors.service';
import { ConfigSetting } from '../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  @ViewChild(AuthorsAddOrUpdateComponent, {static: false}) authorsAddOrUpdate: AuthorsAddOrUpdateComponent;
  pageIndex = 0;
  pageSize = 10;
  totalRow = 0;
  searchParams: BlogAuthorsSearchRequest;
  canvaviAttributeId = '';
  authors: BlogAuthorsModel[];

  constructor(
    private authorsService: BlogAuthorsService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new BlogAuthorsSearchRequest();
    this.onGets();
  }

  async onGets(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.authorsService.search(this.searchParams);
      if (response.status) {
        this.authors = response.authors;
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
      this.authorsAddOrUpdate.id = id;
      this.authorsAddOrUpdate.onGet();
      $('#authors-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
