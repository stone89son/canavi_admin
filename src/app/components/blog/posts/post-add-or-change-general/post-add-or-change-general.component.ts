import { Component, OnInit, ViewChild } from '@angular/core';
import { PostContentComponent } from './post-content/post-content.component';
import { PostContentModel, PostModel } from 'src/app/models/blog/posts/blog-post-model';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-add-or-change-general',
  templateUrl: './post-add-or-change-general.component.html',
  styleUrls: ['./post-add-or-change-general.component.css']
})
export class PostAddOrChangeGeneralComponent implements OnInit {
  @ViewChild('tabs', {static: false}) tabs: NgbTabset;
  @ViewChild(PostContentComponent, {static: false}) postContent: PostContentComponent;
  module: number;
  postModel: PostModel;
  constructor() { }

  ngOnInit() {
    this.postModel = new PostModel();
    this.postModel.postContentModel = new PostContentModel();
  }

  setTab(activeId: string) {
    this.tabs.activeId = activeId;
    this.tabs.select(activeId);
  }

  public beforeChange($event: NgbTabChangeEvent) {
    const currentTab = $event.nextId;
    switch (currentTab) {
      case 'tab-1':
        {
          // if (this.productModel.isInitData) {
          //   setTimeout(() => {
          //     // Thương hiệu
          //     this.productContent.onRegisterManufacturers();
          //     // Nhóm thuộc tính tạo biến thể
          //     this.productContent.onRegisterGroupAttribute();
          //   }, 300);
          // }
        }
        break;
      case 'tab-2':
        break;
        case 'tab-3':
        break;
    }

    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }
}
