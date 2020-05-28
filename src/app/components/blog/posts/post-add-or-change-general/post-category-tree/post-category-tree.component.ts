import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostModel, PostCategoryModel } from 'src/app/models/blog/posts/blog-post-model';
import { BlogCategoryModel } from 'src/app/models/blog/category/blog-category-model';
import { BlogCategoryService } from 'src/app/services/blog/blog-category.service';
import { BlogPostService } from 'src/app/services/blog/blog-post.service';
import { Router } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';
import { KeyValueModel } from 'src/app/models/upload/result-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-post-category-tree',
  templateUrl: './post-category-tree.component.html',
  styleUrls: ['./post-category-tree.component.css']
})
export class PostCategoryTreeComponent implements OnInit {
  @Input() model: PostModel;
  @Output() setTab = new EventEmitter<string>();

  postCategory: PostCategoryModel;
  categories: BlogCategoryModel[];
  formValid = true;
  onSubmitStatus: boolean;
  constructor(
    private categoryService: BlogCategoryService,
    private postService: BlogPostService,
    private routerUrl: Router,
  ) { }

  ngOnInit() {
    // Khởi tạo dữ liệu ban đầu
    this.ngInitData();

    if (this.model.postCategoryModel !== undefined) {
      this.postCategory = this.model.postCategoryModel;
    } else {
      this.postCategory = new PostCategoryModel();
      this.postCategory.subCategories = [];
    }
  }

  async ngInitData(): Promise<void> {
    try {
      App.blockUI();
      const resCategories = await this.categoryService.gets(1);
      this.categories = resCategories.categories;
      this.registerJsTree();
      setTimeout(() => {
        const mainCategoryId = this.postCategory.mainCategoryId;
        if (mainCategoryId != null) {
          const categoriesTree = $('#jsCategoryTree');
          categoriesTree.jstree(true).select_node(mainCategoryId);
        }
      }, 300);

      App.unblockUI();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  registerJsTree() {
    const $this = this;
    const categoriesTree = $('#jsCategoryTree');
    const configTree = {
      'core': {
        'data': []
      },
      'plugins': [
        'search',
        'checkbox',
        'wholerow',
        'contextmenu'
      ],
      'checkbox': {
        'keep_selected_style': false
      },
      'search': {
        'show_only_matches': true,
        'show_only_matches_children': true
      },
    };

    for (let i = 0; i < this.categories.length; i++) {
      const category = this.categories[i];
      const categoryItem = {
        'id': category.id,
        'parent': category.parentId === '' ? '#' : category.parentId,
        'text': category.name,
        'data': category
      };
      configTree.core.data.push(categoryItem);
    }

    try {
      categoriesTree.jstree(true).settings.core.data = configTree.core.data;
      categoriesTree.jstree(true).refresh();
    } catch (ex) {
      categoriesTree.jstree(configTree);
      categoriesTree.on('changed.jstree', function (e, data) {
        const selectedArray = $this.postCategory;

        // Kiểm tra nếu bỏ chọn danh mục chính thì thông báo không hợp lệ
        if (data.action === 'deselect_node') {
          if (selectedArray.mainCategoryId === data.node.id) {
            categoriesTree.jstree(true).select_node(selectedArray.mainCategoryId);
            ConfigSetting.ShowError('Không bỏ chọn danh mục chính được');
          }
        }

        selectedArray.subCategories = [];
        const objects = data.instance.get_selected(true);
        const leaves = $.grep(objects, function (o) { return data.instance.is_leaf(o); });
        $.each(leaves, function (i, o) {
          const keyValue = new KeyValueModel();
          keyValue.text = o.text;
          keyValue.value = o.id;
          selectedArray.subCategories.push(keyValue);
        });

        // Lọc dữ liệu trùng với Category chính
        for (let i = 0; i < selectedArray.subCategories.length; i++) {
          const item = selectedArray.subCategories[i];
          if (item.value === selectedArray.mainCategoryId) {
            selectedArray.subCategories.splice(i, 1);
          }
        }
      });

      categoriesTree.on('loaded.jstree', function () {
        $.each($this.postCategory.subCategories, function (i, category) {
          categoriesTree.jstree(true).select_node(category.value);
        });
      });
    }

    $('#search').on('keyup change', function () {
      categoriesTree.jstree(true).search($(this).val());
    });

    $('#clear').click(function (e) {
      $('#search').val('').change().focus();
    });
  }

  async onSubmit(form: any, model: PostCategoryModel) {
    this.formValid = form.valid;
    if (this.formValid) {
      try {
        if (this.onSubmitStatus) {
          ConfigSetting.ShowWaiting();
          return;
        }
        this.onSubmitStatus = true;
        App.blockUI();
        this.model.postCategoryModel = this.postCategory;
        this.setTab.emit('tab-3');
        App.unblockUI();
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
