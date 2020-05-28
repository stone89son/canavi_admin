import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ConfigSetting } from '../../common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit {
  actionIds: string[] = ['Home/About', 'Home/Index'];
  onGetsStatus: boolean;
  constructor() {
    super();
  }

  ngOnInit() {
    // super.onInit(this.actionIds);
    // this.onGets();
    const $that = this;
    $(document).ready(function () {
      $that.fnActiveMenu();
    });
  }

  fnActiveMenu() {
    const $that = this;
    const $selector = $('.sub-menu li.active a');
    const $selectorParent = $('.page-sidebar-menu .parent');
    const currentUrl = $selector.attr('href');

    // Set LocalStorageRedirectKey
    localStorage.setItem(ConfigSetting.LocalStorageRedirectKey, currentUrl);
    if (localStorage.getItem(ConfigSetting.LocalStorageRedirectKey) !== '') {
      // Active Menu
      $selector.closest('.sub-menu').parent().addClass('active');
      $selector.closest('.sub-menu').parent().find('.arrow').addClass('open');
    }

    $('.nav-item').unbind('click').on('click', function () {
      $selectorParent.removeClass('active open');
      $selectorParent.find('a span.arrow').removeClass('open');
      $selectorParent.find('.sub-menu').removeClass('open');
      $selectorParent.find('.sub-menu').css('display', 'none');

      const act = $(this).closest('li');
      act.addClass('open');
      act.find('.sub-menu').css('display', 'block');
      act.find('.arrow').addClass('open');

      $that.fnActiveMenu();
    });
  }

  // async onGets(): Promise<any> {
  //   if (this.onGetsStatus) {
  //     ConfigSetting.ShowWaiting();
  //     return;
  //   }
  //   try {
  //     this.onGetsStatus = true;
  //     App.blockUI();
  //     const response = await this.adminMenuService.getMenus(ConfigSetting.AdminMenuPositionCMS);
  //     if (response.status) {
  //       this.adminMenus = response.menus;
  //     } else {
  //       ConfigSetting.ShowErrores(response.messages);
  //     }
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   finally {
  //     App.unblockUI();
  //     this.onGetsStatus = false;
  //   }
  // }
}
