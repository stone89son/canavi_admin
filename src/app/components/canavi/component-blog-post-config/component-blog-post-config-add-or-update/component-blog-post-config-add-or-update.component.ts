import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { ComponentBlogPostConfigService } from 'src/app/services/canavi/component-group/component-blog-post-config-service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ComponentBlogPostConfigModel } from 'src/app/models/canavi/component-group/component-blog-post-config-request';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-component-blog-post-config-add-or-update',
  templateUrl: './component-blog-post-config-add-or-update.component.html',
  styleUrls: ['./component-blog-post-config-add-or-update.component.css']
})
export class ComponentBlogPostConfigAddOrUpdateComponent implements OnInit {
  @Output() reloadComponentBlogPost = new EventEmitter<boolean>();
  id: string;
  componentGroupId: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  componentBlogPost: ComponentBlogPostConfigModel;
  formValid = true;
  statuses: KeyValueModel[];

  constructor(
    private componentBlogPostConfigService: ComponentBlogPostConfigService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.componentBlogPost = new ComponentBlogPostConfigModel();
    this.onRegisterPosts();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.componentBlogPostConfigService.get(this.id);
      if (response.status) {
        this.componentBlogPost = response.componentBlogPost;
        this.statuses = response.statuses;
        if (this.id.length > 0) {
          $('#postsAutocomplete').find('option').remove();
          $('#postsAutocomplete').append(`<option value="${this.componentBlogPost.targetId}" selected="selected">${this.componentBlogPost.postTitle}</option>`);
        } else {
          $('#postsAutocomplete').find('option').remove();
        }
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

  async onSave() {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSaveStatus = true;
      App.blockUI();
      this.componentBlogPost.componentGroupId = this.componentGroupId;
      const response = await this.componentBlogPostConfigService.addOrUpdate(this.componentBlogPost);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadComponentBlogPost.emit();
        $('#component-blog-post-add-or-update').modal('hide');
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
        $('#component-blog-post-add-or-update')
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
    $this.componentBlogPost.targetId = id;
  }
}
