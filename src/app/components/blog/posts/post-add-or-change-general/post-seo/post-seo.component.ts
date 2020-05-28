import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PostModel, PostCategoryModel } from 'src/app/models/blog/posts/blog-post-model';
import { BlogCategoryModel } from 'src/app/models/blog/category/blog-category-model';
import { BlogCategoryService } from 'src/app/services/blog/blog-category.service';
import { BlogPostService } from 'src/app/services/blog/blog-post.service';
import { Router } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel, FileUploadModel } from 'src/app/models/upload/result-model';
import { SeoDetailModel } from 'src/app/models/marketing/seo-detail/seo-detail-model';
import { MultipleFileUploadComponent } from 'src/app/components/multiple-file-upload/multiple-file-upload.component';
import { SeoDetailService } from 'src/app/services/marketing/seo-detail/seo-detail.service';
import { SlugifyPipe } from 'src/app/common/slugify-pipe';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-post-seo',
  templateUrl: './post-seo.component.html',
  styleUrls: ['./post-seo.component.css']
})
export class PostSeoComponent implements OnInit {

  @Input() model: PostModel;
  @Output() setTab = new EventEmitter<string>();
  @ViewChild(MultipleFileUploadComponent, {static: false}) multipleFileUpload: MultipleFileUploadComponent;

  seoDetail: SeoDetailModel;
  formValid = true;
  onSubmitStatus: boolean;
  uploadedFiles: FileUploadModel[];

  constructor(
    private categoryService: BlogCategoryService,
    private postService: BlogPostService,
    private seoDetailService: SeoDetailService,
    private routerUrl: Router,
    private slugifyPipe: SlugifyPipe
  ) { }

  ngOnInit() {
    this.uploadedFiles = this.multipleFileUpload.files;
    if (this.model.seoDetail !== undefined) {
      this.seoDetail = this.model.seoDetail;
      if (this.seoDetail.id === null) {
        this.seoDetail.metaRobotsIndex = true;
        this.seoDetail.metaRobotsFollow = true;
      }
    } else {
      this.seoDetail = new SeoDetailModel();
      this.seoDetail.metaRobotsIndex = true;
      this.seoDetail.metaRobotsFollow = true;
    }
  }

  async createSlug() {
    // if (this.seoDetail.targetType === 3) {
    //   this.seoDetail.targetName
    // }
    this.seoDetail.slugUrl = this.slugifyPipe.transform(this.model.postContentModel.title);
  }

  async onSubmit(form: any, model: SeoDetailModel) {
    this.formValid = form.valid;
    if (this.formValid) {
      try {
        if (this.onSubmitStatus) {
          ConfigSetting.ShowWaiting();
          return;
        }
        this.onSubmitStatus = true;
        App.blockUI();
        this.model.seoDetail = this.seoDetail;
        const response = await this.postService.addOrChange(this.model);
        if (response.status) {
          // if (this.uploadedFiles.length > 0) {
          //   this.seoDetail.facebookShareImage = this.uploadedFiles[0].imagePath;
          // }
          this.seoDetail.targetId = response.objectId;
          this.seoDetail.targetType = 3;
          const responseAddSeo = await this.seoDetailService.addOrChange(this.seoDetail);
          if (responseAddSeo.status) {
            ConfigSetting.ShowSuccess('Save success.');
            this.routerUrl.navigate(['g/blog-posts']);
          } else {
            ConfigSetting.ShowErrores(response.messages);
          }
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      } catch (error) {
        ConfigSetting.ShowErrorException(error);
      }
      finally {
        App.unblockUI();
        this.onSubmitStatus = false;
      }

    }
  }

}
