import { Component, OnInit, NgModule, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FooterGroup, FooterGroupAddOrChange, FooterGroupItem, FooterGroupItemAddOrChange, FooterGroupItemGetAll } from 'src/app/models/canavi/footer/footer-group';
import { FooterGroupService } from 'src/app/services/canavi/footer/footer-group.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var App: any;
declare var $: any;

@Component({
  selector: 'app-footer-group-item-add-or-change-modal',
  templateUrl: './footer-group-item-add-or-change-modal.component.html',
  styleUrls: ['./footer-group-item-add-or-change-modal.component.css']
})

export class FooterGroupItemAddOrChangeComponent implements OnInit {
  footerGroupItem: FooterGroupItem = new FooterGroupItem();
  footerGroupItemAddOrChange : FooterGroupItemAddOrChange = new FooterGroupItemAddOrChange();
  footerGroupItemGetAll: FooterGroupItemGetAll = new FooterGroupItemGetAll();
  currentId: string = "";
  currentFooterGroupItemId: string = "";
  submitted: boolean = false;
  @Output() reloadItemEvent = new EventEmitter();
  
  constructor(
    private footerGroupService: FooterGroupService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    
  }

  async onGetById(): Promise<void>{
    App.blockUI();
    try{
      const response = await this.footerGroupService.getFooterGroupItemById(this.currentId);

      if(response.status){
        this.footerGroupItemAddOrChange = response.footerGroupItem;
      }
    }
    catch(ex){
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onAddOrChange(form): Promise<void>{
    App.blockUI();
    try{
      const request = this.footerGroupItemAddOrChange;
      if(this.currentFooterGroupItemId != null && this.currentFooterGroupItemId != undefined && this.currentFooterGroupItemId != ""){
        request.groupId = this.currentFooterGroupItemId;
      }
      const response = await this.footerGroupService.addOrChangeFooterGroupItem(request);
      if(response.status){
        this.submitted = true;
        ConfigSetting.ShowSuccess("Lưu thành công!");
        $('#footer-group-item-add-or-change-modal').modal('hide');
        this.reloadItemEvent.emit();
      }
      else{
        ConfigSetting.ShowError("Đã xảy ra lỗi!");
      }
      if(this.submitted){
        form.resetForm();
      }
    }
    catch (ex){
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}