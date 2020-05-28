import { Component, OnInit, ViewChild } from '@angular/core';
import { SeoDetailSearchRequest, SeoDetailModel } from 'src/app/models/marketing/seo-detail/seo-detail-model';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { SeoDetailService } from 'src/app/services/marketing/seo-detail/seo-detail.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { SeoDetailAddOrUpdateComponent } from './seo-detail-add-or-update/seo-detail-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-seo-detail',
  templateUrl: './seo-detail.component.html',
  styleUrls: ['./seo-detail.component.css']
})
export class SeoDetailComponent implements OnInit {
  @ViewChild(SeoDetailAddOrUpdateComponent, {static: false}) seoDetailAddOrUpdate: SeoDetailAddOrUpdateComponent;
  pageIndex = 1;
  pageSize = 10;
  totalRow = 0;
  searchParams: SeoDetailSearchRequest;
  seoDetails: SeoDetailModel[];
  targetTypes: KeyValueModel[];
  constructor(
    private seoDetailService: SeoDetailService,
  ) {
  }

  ngOnInit() {
    this.searchParams = new SeoDetailSearchRequest();
    this.onSearch();
  }

  async onSearch(pIndex: number = 0): Promise<void> {
    try {
      App.blockUI();
      this.pageIndex = pIndex;
      this.searchParams.pageIndex = pIndex;
      this.searchParams.pageSize = this.pageSize;
      const response = await this.seoDetailService.search(this.searchParams);
      console.log(response);
      if (response.status) {
        this.seoDetails = response.seoDetails;
        this.targetTypes = response.targetTypes;
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
      this.seoDetailAddOrUpdate.id = id;
      this.seoDetailAddOrUpdate.onGet();
      $('#seoDetail-addOrChange').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
