import { Component, OnInit, NgModule, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FooterGroup, FooterGroupAddOrChange } from 'src/app/models/canavi/footer/footer-group';
import { FooterGroupService } from 'src/app/services/canavi/footer/footer-group.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ActivatedRoute, Router } from '@angular/router';

declare var App: any;
declare var $: any;

@Component({
  selector: 'app-footer-group-add-or-change-modal',
  templateUrl: './footer-group-add-or-change-modal.component.html',
  styleUrls: ['./footer-group-add-or-change-modal.component.css']
})

export class FooterGroupAddOrChangeComponent implements OnInit {
  footerGroup: FooterGroup = new FooterGroup();
  footerGroupAddOrChange : FooterGroupAddOrChange = new FooterGroupAddOrChange();
  currentId: string = "";
  submitted: boolean = false;
  @Output() reloadEvent = new EventEmitter();
  
  constructor(
    private footerGroupService: FooterGroupService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit() {
    
  }

  async onGetById(): Promise<void>{
    App.blockUI();
    try{
      const response = await this.footerGroupService.getFooterGroupById(this.currentId);
      if(response.status){
        this.footerGroup = response.footerGroup;
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
      const request = this.footerGroup;
      if(this.currentId != null && this.currentId != undefined && this.currentId != ""){
        request.id = this.currentId;
      }
      const response = await this.footerGroupService.addOrChange(request);
      if(response.status){
        this.submitted = true;
        ConfigSetting.ShowSuccess("Lưu thành công!");
        $('#footer-group-add-or-change-modal').modal('hide');
        this.reloadEvent.emit();
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