import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SeoDetailModel } from 'src/app/models/marketing/seo-detail/seo-detail-model';
import { KeyValueModel, FileUploadModel } from 'src/app/models/upload/result-model';
import { BlogCategoryModel } from 'src/app/models/blog/category/blog-category-model';
import { SeoDetailService } from 'src/app/services/marketing/seo-detail/seo-detail.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { MultipleFileUploadComponent } from 'src/app/components/multiple-file-upload/multiple-file-upload.component';
import { SlugifyPipe } from 'src/app/common/slugify-pipe';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-seo-detail-add-or-update',
  templateUrl: './seo-detail-add-or-update.component.html',
  styleUrls: ['./seo-detail-add-or-update.component.css']
})
export class SeoDetailAddOrUpdateComponent implements OnInit {
  @Output() reloadSeoDetail = new EventEmitter<boolean>();
  @ViewChild(MultipleFileUploadComponent, {static: false}) multipleFileUpload: MultipleFileUploadComponent;
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  seoDetail: SeoDetailModel;
  formValid = true;
  targetTypes: KeyValueModel[];
  categories: BlogCategoryModel[];
  uploadedFiles: FileUploadModel[] = [];

  constructor(
    private seoDetailService: SeoDetailService,
    private slugifyPipe: SlugifyPipe
  ) {
  }
  async createSlug() {
    // if (this.seoDetail.targetType === 3) {
    //   this.seoDetail.targetName
    // }
    this.seoDetail.slugUrl = this.slugifyPipe.transform(this.seoDetail.targetName);
  }

  async ngOnInit() {
    this.formValid = true;
    this.seoDetail = new SeoDetailModel();
    //this.uploadedFiles = this.multipleFileUpload.uploadedFiles;
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.seoDetailService.get(this.id);
      if (response.status) {
        this.seoDetail = response.seoDetail;
        this.categories = response.categories;
        this.targetTypes = response.targetTypes;
        this.onChange(this.seoDetail.targetType);
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onGetStatus = false;
      App.unblockUI();
    }
  }

  async onSave(form: any) {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSaveStatus = true;
      App.blockUI();
      // if (this.uploadedFiles.length > 0) {
      //   this.seoDetail.facebookShareImage = this.uploadedFiles[0].imagePath;
      // }
      const response = await this.seoDetailService.addOrChange(this.seoDetail);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadSeoDetail.emit();
        $('#seoDetail-addOrChange').modal('hide');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onSaveStatus = false;
      App.unblockUI();
    }
  }

  ngDeletePhoto(index: any) {
    if (this.uploadedFiles.length > 0) {
      // Xóa element by index
      this.uploadedFiles.splice(index, 1);
    } 
    else {
      ConfigSetting.ShowError('Không tồn tại ảnh nào để xóa');
    }
  }

  async onChange(targetType) {
    if (targetType === 2) {
      setTimeout(() => {
        this.registerParentsTree();
      }, 200);
    }
    if (targetType === 3) {
      setTimeout(() => {
        this.onRegisterPosts();
        if (this.seoDetail.targetId.length > 0) {
          $('#postsAutocomplete').find('option').remove();
          $('#postsAutocomplete').append(`<option value="${this.seoDetail.targetId}" selected="selected">${this.seoDetail.targetName}</option>`);
        }
      }, 200);
    }
    if (targetType === 4 || targetType === 5) {
      setTimeout(() => {
        this.onRegisterJob();
        if (this.seoDetail.targetId.length > 0) {
          $('#jobIdAutocomplete').find('option').remove();
          $('#jobIdAutocomplete').append(`<option value="${this.seoDetail.targetId}" selected="selected">${this.seoDetail.targetName}</option>`);
        }
      }, 200);
    }
    if (targetType === 6) {
      setTimeout(() => {
        this.onRegisterRecuiter();
        if (this.seoDetail.targetId.length > 0) {
          $('#recuiterIdAutocomplete').find('option').remove();
          $('#recuiterIdAutocomplete').append(`<option value="${this.seoDetail.targetId}" selected="selected">${this.seoDetail.targetName}</option>`);
        }
      }, 200);
    }
  }

  registerParentsTree(): void {
    const categories = {
      'core': {
        'data': []
      }
    };
    if (this.categories != null && this.categories !== undefined) {
      for (let i = 0; i < this.categories.length; i++) {
        const menu = this.categories[i];
        const menuItem = {
          'id': menu.id,
          'parent': menu.parentId === '' ? '#' : menu.parentId,
          'text': menu.name,
          'data': menu
        };
        categories.core.data.push(menuItem);
      }
    }
    try {
      $('.categories').jstree(true).settings.core.data = categories.core.data;
    } catch (ex) {
      $('.categories').jstree(categories);
    }
    const $that = this;
    $('.categories').on('select_node.jstree', function (event, node) {
      const selectedNode = node.node;
      $that.seoDetail.targetId = selectedNode.data.id;
    });
    if (this.seoDetail.targetId != null && this.seoDetail.targetId !== undefined && this.seoDetail.targetId.length > 0) {
      $('.categories').one('refresh.jstree', function () { $('.categories').jstree(true).select_node($that.seoDetail.targetId); });
    } else {
      $('.categories').one('refresh.jstree', function () { $('.categories').jstree('deselect_all'); });
    }
    $('.categories').jstree(true).refresh();
  }

  async onRegisterPosts(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#postsAutocomplete',
        ConfigSetting.UrlPathPostsAutocomplete,
        this.createParametersFun,
        $this,
        'Search posts',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectEvent,
        null,
        0,
        250,
        false,
        $('#seoDetail-addOrChange')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  createParametersFun(params, $this) {
    const query = {
      title: params.term
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
      results: data.posts
    };
  }
  selectEvent(e, $this) {
    const id = e.params.data.id;
    $this.seoDetail.targetId = id;
  }

  // region Job
  async onRegisterJob(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#jobIdAutocomplete',
        ConfigSetting.UrlPathCanaviCommisstionFeeGetJobs,
        this.createParametersFunJob,
        $this,
        'Search job',
        this.processResultsJob,
        this.formatRepoJob,
        this.formatRepoSelectionJob,
        this.selectJobEvent,
        null,
        0,
        250,
        false,
        $('#seoDetail-addOrChange')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunJob(params, $this) {
    const query = {
      title: params.term
    };
    return query;
  }
  processResultsJob(data, params) {
    return {
      results: data.jobs
    };
  }
  formatRepoJob(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionJob(repo) {
    return repo.text;
  }
  selectJobEvent(e, $this) {
    const id = e.params.data.id;
    $this.seoDetail.targetId = id;
  }
  // endregion Job

  // region Recuiter
  async onRegisterRecuiter(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#recuiterIdAutocomplete',
        ConfigSetting.UrlPathCanaviCommisstionFeeGetRecuiters,
        this.createParametersFunRecuiter,
        $this,
        'Search recuiter',
        this.processResultsRecuiter,
        this.formatRepoRecuiter,
        this.formatRepoSelectionRecuiter,
        this.selectRecuiterEvent,
        null,
        0,
        250,
        false,
        $('#seoDetail-addOrChange')
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunRecuiter(params, $this) {
    const query = {
      keyword: params.term
    };
    return query;
  }
  processResultsRecuiter(data, params) {
    return {
      results: data.recuiters
    };
  }
  formatRepoRecuiter(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelectionRecuiter(repo) {
    return repo.text;
  }
  selectRecuiterEvent(e, $this) {
    const id = e.params.data.id;
    $this.seoDetail.targetId = id;
  }
  // endregion Recuiter
}
