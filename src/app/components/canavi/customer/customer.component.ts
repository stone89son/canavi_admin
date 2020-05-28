import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAddOrChangeComponent } from '../customer-add-or-change/customer-add-or-change.component';
import { KeyValueModel } from 'src/app/models/result-model';
import { CustomerSearchRequest } from 'src/app/models/canavi/customer/customer-search-request';
import { CustomerModel } from 'src/app/models/canavi/customer/customer-model';
import { CustomerService } from 'src/app/services/canavi/customer/customer.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild(CustomerAddOrChangeComponent, {static: false}) customerAddOrChange: CustomerAddOrChangeComponent;
  @ViewChild('f', {static: false}) form: any;
  searchParams: CustomerSearchRequest;
  types: KeyValueModel[];
  statuses: KeyValueModel[];
  customers: CustomerModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  onActiveStatus: boolean;
  onLockStatus: boolean;

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.searchParams = new CustomerSearchRequest();
    this.searchParams.status = 0;
    this.searchParams.type = 0;
    this.customers = [];

    this.types = [];
    this.statuses = [];
    this.getCustomers();
    if (jQuery().datepicker) {
      $('.date-picker').datepicker({
        rtl: App.isRTL(),
        orientation: 'left',
        autoclose: true
      });
    }
  }
  async getCustomers(): Promise<void> {
    if (this.form.valid) {
      try {
        this.searchParams.fromBirthday = $('input[name=\'fromBirthday\']').val();
        this.searchParams.toBirthDay = $('input[name=\'toBirthDay\']').val();
        const response = await this.customerService.search(this.searchParams);
        this.types = response.types;
        this.statuses = response.statuses;
        this.customers = response.customers;
        this.totalRow = response.totalRow;
        setTimeout(() => {
          this.onRegisterActive();
          this.onRegisterLock();
        }, 300);
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
  }

  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      this.customerAddOrChange.customer.id = id;
      this.customerAddOrChange.onGet();
      $('#customer-add-or-change').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onGetDetail(id: string): Promise<void> {
    App.blockUI();
    try {
      if (id !== '') {
        this.router.navigateByUrl(ConfigSetting.CustomerDetailPage + id);
      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }

  onRegisterActive() {
    const $that = this;
    const obj = $('.bs_active');
    const register = obj.attr('confirmation_register');
    if (register === '1') {
      return;
    }
    obj.attr('confirmation_register', '1');
    obj.confirmation({
      rootSelector: '[data-toggle=active]'
    });
    obj.on('confirmed.bs.confirmation', function () {
      const id = $(this).attr('id');
      $that.onActive(id);
    });
  }

  async onActive(customerId: string): Promise<void> {
    if (this.onActiveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onActiveStatus = true;
      App.blockUI();
      const response = await this.customerService.active(customerId);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        await this.getCustomers();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onActiveStatus = false;
    }
  }

  onRegisterLock() {
    const $that = this;
    const obj = $('.bs_lock');
    const register = obj.attr('confirmation_register');
    if (register === '1') {
      return;
    }
    obj.attr('confirmation_register', '1');
    obj.confirmation({
      rootSelector: '[data-toggle=lock]'
    });
    obj.on('confirmed.bs.confirmation', function () {
      const id = $(this).attr('id');
      $that.onLock(id);
    });
  }

  async onLock(customerId: string): Promise<void> {
    if (this.onLockStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onLockStatus = true;
      App.blockUI();
      const response = await this.customerService.lock(customerId);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        await this.getCustomers();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onLockStatus = false;
    }
  }
}
