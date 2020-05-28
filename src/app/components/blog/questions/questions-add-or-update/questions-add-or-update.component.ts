import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionsModel } from 'src/app/models/blog/questions/questions-model';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { BlogQuestionsService } from 'src/app/services/blog/blog-questions.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { BlogCategoryModel } from 'src/app/models/blog/category/blog-category-model';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-questions-add-or-update',
  templateUrl: './questions-add-or-update.component.html',
  styleUrls: ['./questions-add-or-update.component.css']
})
export class QuestionsAddOrUpdateComponent implements OnInit {
  @Output() reloadQuestions = new EventEmitter<boolean>();
  id: string;
  onGetStatus: boolean;
  onSaveStatus: boolean;
  question: QuestionsModel;
  formValid = true;
  statuses: KeyValueModel[];
  categories: BlogCategoryModel[];
  config = {
    height: '500px',
    allowedContent: true,
    extraPlugins: 'divarea',
    filebrowserBrowseUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload),
    filebrowserUploadUrl: ConfigSetting.CreateUrl(ConfigSetting.UrlPathFileUpload)
  };

  constructor(
    private questionsService: BlogQuestionsService,
  ) {
  }

  async ngOnInit() {
    this.formValid = true;
    this.question = new QuestionsModel();
    this.onRegisterTags();
  }

  async onGet() {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetStatus = true;
      App.blockUI();
      const response = await this.questionsService.get(this.id);
      if (response.status) {
        this.question = response.question;
        this.categories = response.categories;
        if (this.question.tagSelecteds !== null) {
          setTimeout(() => {
            $('#tagsAutocomplete').empty();
            this.question.tagSelecteds.forEach(element => {
              $('#tagsAutocomplete').select2('trigger', 'select', {
                data: element
              });
            });
          }, 200);
        }
        this.statuses = response.statuses;
        this.registerParentsTree();
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
      const tagsSelected = $('#tagsAutocomplete').select2('data');
      const tagIds = [];
      tagsSelected.forEach(element => {
        tagIds.push(element.id);
      });
      this.question.tags = tagIds;
      const response = await this.questionsService.addOrChange(this.question);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        this.reloadQuestions.emit();
        $('#questions-addOrChange').modal('hide');
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
      $that.question.categoryId = selectedNode.data.id;
    });
    if (this.question.categoryId != null && this.question.categoryId !== undefined && this.question.categoryId.length > 0) {
      $('.categories').one('refresh.jstree', function () { $('.categories').jstree(true).select_node($that.question.categoryId); });
    } else {
      $('.categories').one('refresh.jstree', function () { $('.categories').jstree('deselect_all'); });
    }
    $('.categories').jstree(true).refresh();
  }

  async onRegisterTags(): Promise<void> {
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
        false,
        $('#questions-addOrChange')
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
