import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FooterGroupService } from 'src/app/services/canavi/footer/footer-group.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigSetting } from 'src/app/common/configSetting';
import { ConfigFooterGroup } from 'src/app/models/canavi/footer/footer-group';

declare var App: any;
declare var $: any;

@Component({
  selector: 'app-config-footer-group',
  templateUrl: './config-footer-group.component.html',
  styleUrls: ['./config-footer-group.component.css']
})

export class ConfigFooterGroupComponent implements OnInit {
  configFooterGroup: ConfigFooterGroup = new ConfigFooterGroup();

  constructor(
      private footerGroupService: FooterGroupService,
      private router: ActivatedRoute) { }
  
    ngOnInit() {

    }

    async getById(id: string): Promise<void>{
      App.blockUI();
      try{
        const response = await this.footerGroupService.getConfigFooterGroupById(id);
        if(response.status){
          this.configFooterGroup = response.configFooterGroup;
        }
      }
      catch(ex){
        ConfigSetting.ShowErrorException(ex);
      }
      App.unblockUI();
    }

    async onAddOrChange(configFooterGroup: ConfigFooterGroup): Promise<void>{
      App.blockUI();
      try{
        const request = configFooterGroup;
        const response = await this.footerGroupService.changeConfigFooterGroup(request);
        if(response.status){
          ConfigSetting.ShowSuccess("Lưu thành công!");
          $('#config-footer-group-modal').modal('hide');
        }
        else{
          ConfigSetting.ShowError("Đã xảy ra lỗi!");
        }
      }
      catch (ex){
        ConfigSetting.ShowErrorException(ex);
      }
      App.unblockUI();
    }
}