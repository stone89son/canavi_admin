import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerSearchRequest } from 'src/app/models/canavi/customer/customer-search-request';
import { CustomerModel } from 'src/app/models/canavi/customer/customer-model';
import { CustomerService } from 'src/app/services/canavi/customer/customer.service';
import { RoleService } from 'src/app/services/canavi/role/role.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  @Input() roleId: string;
  @Input() customerIds: string[];
  @Output() reloadGrid = new EventEmitter<boolean>();
  searchParams: CustomerSearchRequest;
  customers: CustomerModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  onGetsStatus: boolean;
  onAddStatus: boolean;
  constructor(
    private customerService: CustomerService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.searchParams = new CustomerSearchRequest();
  }

  async onGets(): Promise<void> {
    if (this.onGetsStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetsStatus = true;
    try {
      const response = await this.customerService.search(this.searchParams);
      this.customers = response.customers;
      this.customers = this.customers.filter(x => !this.customerIds.includes(x.id));
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetsStatus = false;
      App.unblockUI();
    }
  }

  async onAdd(customerId: string): Promise<void> {
    if (this.onAddStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onAddStatus = true;
    try {
      const response = await this.roleService.customerRoleAdd(this.roleId, customerId);
      if (response.status) {
        $('#formListCustomer').modal('hide');
        ConfigSetting.ShowSuccess('Add success.');
        this.reloadGrid.emit();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onAddStatus = false;
      App.unblockUI();
    }
  }
}
