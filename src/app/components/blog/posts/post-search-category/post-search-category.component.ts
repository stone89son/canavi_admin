import { Component, OnInit } from '@angular/core';
import { BlogCategoryManagerModel, BlogCategoryModel } from 'src/app/models/blog/category/blog-category-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogCategoryService } from 'src/app/services/blog/blog-category.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-post-search-category',
  templateUrl: './post-search-category.component.html',
  styleUrls: ['./post-search-category.component.css']
})
export class PostSearchCategoryComponent implements OnInit {
  model: BlogCategoryManagerModel;
  module: number;
  ngOnInitStatus: boolean;
  categoryId = '';
  categoryName = '';
  categoryBreadCrumb = '';

  constructor(
    private router: ActivatedRoute,
    private categoryService: BlogCategoryService
  ) { }

  async ngOnInit() {
    if (this.ngOnInitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.router.paramMap.subscribe(async (param: ParamMap) => {
        this.module = +param.get('module');
      });

      this.model = new BlogCategoryManagerModel();
      this.model.category = new BlogCategoryModel();
      this.model.category.name = '';

      const response = await this.categoryService.gets(1);
      this.model.categories = response.categories;
      this.jsTreeCategory();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.ngOnInitStatus = false;
    }
  }

  jsTreeCategory() {
    const $this = this;
    const categoriesTree = $('#jsCategoryTree');
    const menus = {
      'core': {
        'data': []
      },
      'plugins': [
        'search',
        'wholerow'
      ],
      'search': {
        'show_only_matches': true,
        'show_only_matches_children': true
      }
    };

    for (let i = 0; i < this.model.categories.length; i++) {
      const category = this.model.categories[i];
      const categoryItem = {
        'id': category.id,
        'parent': category.parentId === '' ? '#' : category.parentId,
        'text': category.name,
        'data': category
      };
      menus.core.data.push(categoryItem);
    }

    try {
      categoriesTree.jstree(true).settings.core.data = menus.core.data;
      categoriesTree.jstree(true).refresh();
    } catch (ex) {
      categoriesTree.jstree(menus);
      categoriesTree.on('changed.jstree', function (e, data) {
        if (data.selected.length > 0) {
          if (data.selected.length === 1) {
            const id = data.selected[0];
            const li = $('#' + id);
            if (li.hasClass('jstree-leaf')) {
              const selectedNode = data.instance.get_node(data.selected[0]);
              $this.categoryId = selectedNode.id;
              $this.categoryName = selectedNode.text;
              // BreadCrumb
              let breadCrumb = $this.categoryName;
              $.each(data.node.parents, function (key, parentId) {
                if (parentId !== '#') {
                  const parent = categoriesTree.jstree().get_node(parentId);
                  breadCrumb = categoriesTree.jstree().get_text(parent) + ' -> ' + breadCrumb;
                }
              });
              $this.categoryBreadCrumb = breadCrumb;
            } else {
              ConfigSetting.ShowError('Bạn phải chọn mức ngành hàng thấp nhất!');
            }
          } else {
            ConfigSetting.ShowError('Bạn chỉ được lựa chọn 1 ngành hàng duy nhất!');
          }
        }
      });
    }

    $('#search').on('keyup change', function () {
      categoriesTree.jstree(true).search($(this).val());
    });

    $('#clear').click(function (e) {
      $('#search').val('').change().focus();
    });


  }
}
