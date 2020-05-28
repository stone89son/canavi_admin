import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FooterGroupService } from 'src/app/services/canavi/footer/footer-group.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';
import { FooterGroupItemGetAll, FooterGroupItem } from 'src/app/models/canavi/footer/footer-group';
import { FooterGroupItemAddOrChangeComponent } from '../footer-group-item-add-or-change-modal/footer-group-item-add-or-change-modal.component';

declare var App: any;
declare var $: any;

@Component({
    selector: 'app-footer-group-item',
    templateUrl: './footer-group-item.component.html',
    styleUrls: ['./footer-group-item.component.css']
  })

  export class FooterGroupItemComponent implements OnInit {
    footerGroupItems: FooterGroupItem[] = [];
    footerGroupItem: FooterGroupItemGetAll = new FooterGroupItemGetAll();
    currentId: string = "";
    currentFooterGroupItemId: string = "";
    @ViewChild(FooterGroupItemAddOrChangeComponent, {
        static: false
      }) footerGroupItemAddOrChange: FooterGroupItemAddOrChangeComponent;

    constructor(
        private footerGroupService: FooterGroupService,
        private router: ActivatedRoute) { }
    
      ngOnInit() {

      }

      async getAllFooterGroupItem(): Promise<void>{
        App.blockUI();
        try{
          var request = new FooterGroupItemGetAll();
          request.groupId = this.currentFooterGroupItemId;
          const response = await this.footerGroupService.getAllFooterGroupItem(request);
          this.footerGroupItems = response.footerGroupItems;
          this.currentId = request.groupId;
        }
        catch (ex){
          ConfigSetting.ShowErrorException(ex);
        }
        App.unblockUI();
      }

      async onShowFooterGroupItemAddOrChangeForm(id: string): Promise<void>{
        try{
            this.footerGroupItemAddOrChange.currentId = id;
            this.footerGroupItemAddOrChange.onGetById();
            this.footerGroupItemAddOrChange.currentFooterGroupItemId = this.currentId;
            $('#footer-group-item-add-or-change-modal').modal('show');
          }
          catch(ex){
            ConfigSetting.ShowErrorException(ex);
          }
      }
  }