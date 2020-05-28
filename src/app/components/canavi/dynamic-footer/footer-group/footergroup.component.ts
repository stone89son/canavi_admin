import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FooterGroup, FooterGroupGetAll, FooterGroupItemGetAll, ConfigFooterGroup } from 'src/app/models/canavi/footer/footer-group';
import { FooterGroupService } from 'src/app/services/canavi/footer/footer-group.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';
import { FooterGroupAddOrChangeComponent } from '../footer-group-add-or-change-modal/footer-group-add-or-change-modal.component';
import { FooterGroupItemComponent } from '../footer-group-item/footer-group-item.component';
import { ConfigFooterGroupComponent } from '../config-footer-group/config-footer-group.component';

declare var App: any;
declare var $: any;

@Component({
  selector: 'app-footer-group',
  templateUrl: './footergroup.component.html',
  styleUrls: ['./footergroup.component.css']
})

export class FooterGroupComponent implements OnInit {
  footerGroups: FooterGroup[] = [];
  configFooterGroup: ConfigFooterGroup = new ConfigFooterGroup();
  footerGroupGetAllRequest: FooterGroupGetAll = new FooterGroupGetAll();
  footerGroupItemGetAllRequest: FooterGroupItemGetAll = new FooterGroupItemGetAll();
  currentId: string = "";
  hasChanged: boolean = false;
  @ViewChild(FooterGroupAddOrChangeComponent, {
      static: false
    }) footerGroupAddOrChange: FooterGroupAddOrChangeComponent;
  @ViewChild(FooterGroupItemComponent, {
    static: false
  }) footerGroupItem: FooterGroupItemComponent;
  @ViewChild(ConfigFooterGroupComponent, {
    static: false
  }) configFooterGroupComponent: ConfigFooterGroupComponent;

  constructor(
    private footerGroupService: FooterGroupService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.getAllFooterGroup(this.footerGroupGetAllRequest);
  }

  async getAllFooterGroup(request: FooterGroupGetAll): Promise<void>{
    App.blockUI();
    try{
      const response = await this.footerGroupService.getAllFooterGroup(request);
      this.footerGroups = response.footerGroups;
    }
    catch (ex){
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onShowAddOrChangeForm(id: string): Promise<void>{
    try{
      this.currentId = id;
      this.footerGroupAddOrChange.currentId = id;
      this.footerGroupAddOrChange.onGetById();
      $('#footer-group-add-or-change-modal').modal('show');
    }
    catch(ex){
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowListFooterGroupItemForm(groupId: string): Promise<void>{
    App.blockUI();
    try{
      this.footerGroupItem.currentFooterGroupItemId = groupId;
      await this.footerGroupItem.getAllFooterGroupItem();
      $('#list-footer-group-item-modal').modal('show');
    }
    catch(ex){
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onShowUpdateConfigFooterGroupForm(id: string): Promise<void>{
    try{
      if(id != "" && id != null){
        await this.configFooterGroupComponent.getById(id);
      }
      $('#config-footer-group-modal').modal('show');
    }
    catch(ex){
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async reloadPage(event): Promise<void>{
    console.log(event);
  }
}