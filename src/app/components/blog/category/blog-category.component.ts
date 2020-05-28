import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogCategoryManagerModel, BlogCategoryModel } from '../../../models/blog/category/blog-category-model';
import { BlogCategoryService } from '../../../services/blog/blog-category.service';
import { ConfigSetting } from '../../../common/configSetting';
import { FileUploadComponent } from '../../file-upload/file-upload.component';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent implements OnInit {
  @ViewChild(FileUploadComponent, {static: false}) fileUpload: FileUploadComponent;
  model: BlogCategoryManagerModel;
  onGetStatus: boolean;
  onAddOrChangeStatus: boolean;
  formValid: boolean;
  onInitStatus: boolean;
  showFormCategory: boolean;
  onChangeMenuEditPositionStatus: boolean;
  typeSearchParam = 0;
  constructor(
    private categoryService: BlogCategoryService
  ) { }

  ngOnInit() {
    this.model = new BlogCategoryManagerModel();
    this.model.category = new BlogCategoryModel();
    this.formValid = true;
    this.onInit();
  }
  async onInit(): Promise<void> {
    this.showFormCategory = false;
    if (this.onInitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onInitStatus = true;
    try {
      const type = this.typeSearchParam;
      const response = await this.categoryService.gets(type);
      this.model.categories = response.categories;
      this.model.types = response.types;
      this.typeSearchParam = response.typeSelected;
      this.registerMenusTree();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onInitStatus = false;
      App.unblockUI();
    }
  }

  async onGet(id: string): Promise<void> {
    this.showFormCategory = true;
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetStatus = true;
    try {
      const type = this.typeSearchParam;
      const response = await this.categoryService.get(id, type);
      this.model.types = response.types;
      this.model.statuses = response.statuses;
      this.model.parents = response.parents;
      this.model.category = response.category;
      this.registerParentsTree();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetStatus = false;
      App.unblockUI();
    }
  }

  registerParentsTree(): void {
    const categories = {
      'core': {
        'data': []
      }
    };
    if (this.model.parents != null && this.model.parents !== undefined) {
      for (let i = 0; i < this.model.parents.length; i++) {
        const menu = this.model.parents[i];
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
      $('.parents').jstree(true).settings.core.data = categories.core.data;
    } catch (ex) {
      $('.parents').jstree(categories);
    }
    const $that = this;
    $('.parents').on('select_node.jstree', function (event, node) {
      const selectedNode = node.node;
      $that.model.category.parentId = selectedNode.data.id;
    });
    if (this.model.category.parentId != null && this.model.category.parentId !== undefined && this.model.category.parentId.length > 0) {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree(true).select_node($that.model.category.parentId); });
    } else {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree('deselect_all'); });
    }
    $('.parents').jstree(true).refresh();
  }

  registerMenusTree(): void {
    const categories = {
      'core': {
        'data': []
      }
    };
    if (this.model.categories == null || this.model.categories === undefined || this.model.categories.length <= 0) {
      categories.core.data = [];
    } else {
      for (let i = 0; i < this.model.categories.length; i++) {
        const menu = this.model.categories[i];
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
      $('#categories').jstree(true).settings.core.data = categories.core.data;
      $('#categories').jstree(true).refresh();
    } catch (ex) {
      $('#categories').jstree(categories);
      const $that = this;
      $('#categories').on('select_node.jstree', function (event, node) {
        const selectedNode = node.node;
        $that.onGet(selectedNode.data.id);
      });
    }
  }

  async onAddOrChange(form): Promise<void> {
    if (this.onAddOrChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onAddOrChangeStatus = true;
    try {
      this.formValid = form.valid && this.model.category.type > 0;
      if (this.formValid) {
        const img = this.fileUpload.imagePath;
        if (img !== '') { this.model.category.logo = img; }
        const requestModel = this.model.category;
        const response = await this.categoryService.addOrChange(requestModel);
        if (response.status) {
          this.onInit();
          ConfigSetting.ShowSuccess('Lưu thành công.');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onAddOrChangeStatus = false;
      App.unblockUI();
    }
  }

  async onClearSelected(): Promise<void> {
    $('.parents').jstree('deselect_all');
    this.model.category.parentId = '';
  }

  async onChangeMenuEditPosition(): Promise<void> {
    if (this.onChangeMenuEditPositionStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onChangeMenuEditPositionStatus = true;
      App.blockUI();
      const type = this.model.category.type;
      const response = await this.categoryService.gets(type);
      if (response.status) {
        this.model.parents = response.menus;
        this.registerParentsTree();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onChangeMenuEditPositionStatus = false;
      App.unblockUI();
    }
  }

}
