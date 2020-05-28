import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { PostModel, PostContentModel } from 'src/app/models/blog/posts/blog-post-model';
import { ConfigSetting } from '../../../../../common/configSetting';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { BlogPostService } from 'src/app/services/blog/blog-post.service';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { SeoDetailService } from 'src/app/services/marketing/seo-detail/seo-detail.service';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {
  @ViewChild('thumnailUpload', {static: false}) thumnailUpload: FileUploadComponent;
  @ViewChild('featureThumnailUpload', {static: false}) featureThumnailUpload: FileUploadComponent;
  @Input() model: PostModel;
  @Output() setTab = new EventEmitter<string>();
  postContentModel: PostContentModel;
  formValid = true;
  productId: string;
  categoryId: string;
  config = {
    height: '500px',
    allowedContent: true,
    extraPlugins: 'divarea',
    filebrowserBrowseUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload),
    filebrowserUploadUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload)
  };
  statuses: KeyValueModel[];
  authors: KeyValueModel[];
  tagsSelect: KeyValueModel[];

  constructor(
    private router: ActivatedRoute,
    private postService: BlogPostService,
    private seoDetailService: SeoDetailService,
  ) { }

  async ngOnInit() {
    this.postContentModel = this.model.postContentModel;
    await this.ngInitData();
    this.model.isInitData = true;
  }

  async ngInitData(): Promise<void> {
    this.onRegisterRelatedAttribute();
    await this.ngGetModel();
  }

  async ngGetModel(): Promise<void> {
    this.router.paramMap.subscribe(async (param: ParamMap) => {
      this.categoryId = param.get('categoryId');
      this.productId = param.get('id');
    });
    if (this.model.isInitData == null || this.model.isInitData === undefined || this.model.isInitData === false) {
      const response = await this.postService.getPostToChange(this.productId, this.categoryId);
      if (response.status) {
        this.model.id = this.productId;
        this.model.postContentModel = response.postContent;
        this.model.postCategoryModel = response.postCategoryModel;
        if (this.model.postContentModel.tagSelecteds !== null) {
          setTimeout(() => {
            $('#tagsAutocomplete').empty();
            this.model.postContentModel.tagSelecteds.forEach(element => {
              $('#tagsAutocomplete').select2('trigger', 'select', {
                data: element
              });
            });
          }, 200);
        }
        if (this.categoryId != null) {
          this.model.postCategoryModel.mainCategory = response.category.name;
          this.model.postCategoryModel.mainCategoryId = this.categoryId;
        }
        this.postContentModel = this.model.postContentModel;
        this.authors = response.authors;
        this.statuses = response.statuses;
        this.tagsSelect = response.tags;

        // get seo detail
        const responseSeo = await this.seoDetailService.getByTargetId(this.model.id, 3);
      if (responseSeo.status) {
        this.model.seoDetail = responseSeo.seoDetail;
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
  }

  onSubmit(form: any) {
    App.blockUI();
    this.formValid = form.valid;
    if (this.formValid) {
      const thumnail = this.thumnailUpload.imagePath;
      const featureThumnail = this.featureThumnailUpload.imagePath;
      if (thumnail !== '') { this.postContentModel.thumnail = thumnail; }
      if (featureThumnail !== '') { this.postContentModel.featureThumnail = featureThumnail; }
      const tagsSelected = $('#tagsAutocomplete').select2('data');
      const tagIds = [];
      tagsSelected.forEach(element => {
        tagIds.push(element.id);
      });
      this.postContentModel.tags = tagIds;
      this.model.postContentModel = this.postContentModel;
      console.log(this.model);
      // Chuyển tab
      this.setTab.emit('tab-2');
      App.unblockUI();
    } else {
      App.unblockUI();
    }
  }

  async onRegisterRelatedAttribute(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#tagsAutocomplete',
        ConfigSetting.UrlPathTagsAutocomplete,
        this.createParametersFun,
        $this,
        'Search tags',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectEvent,
        null,
        0,
        250,
        false
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  createParametersFun(params, $this) {
    const query = {
      name: params.term
    };
    return query;
  }
  formatRepo(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelection(repo) {
    return repo.text;
  }
  processResults(data, params) {
    return {
      results: data.tags
    };
  }
  selectEvent(e, $this) {
    const id = e.params.data.id;
  }
}
