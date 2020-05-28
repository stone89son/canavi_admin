import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListCustomerComponent } from './list-customer.component';
import { CustomerRoleGetsRequest, CustomerRoleModel, CustomerRoleResponse } from 'src/app/models/canavi/customer/customer-role-request-model';
import { RoleService } from 'src/app/services/canavi/role/role.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-role-customer',
  templateUrl: './role-customer.component.html',
  styleUrls: ['./role-customer.component.css']
})
export class RoleCustomerComponent implements OnInit {
  @ViewChild(ListCustomerComponent, {static: false}) listCustomer: ListCustomerComponent;
  roleId: string;
  private departmentId: string;
  searchParams: CustomerRoleGetsRequest;
  customerRoles: CustomerRoleModel[];
  searchResponse: CustomerRoleResponse;
  onGetStatus: boolean;
  onAddStatus: boolean;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  customerIds: string[];
  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
  ) {
    this.route.params.subscribe(params => {
      this.roleId = params.roleid;
      this.departmentId = params.departmentId;
    });
  }

  ngOnInit() {
    this.searchParams = new CustomerRoleGetsRequest();
    this.searchResponse = new CustomerRoleResponse();
    this.searchParams.roleId = this.roleId;
    this.searchParams.departmentId = this.departmentId;
    this.onSearch();
  }

  async onSearch(): Promise<void> {
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetStatus = true;
    try {
      const response = await this.roleService.customerRoleGets(this.searchParams);
      this.customerRoles = response.customerRoles;
      this.searchResponse.departments = response.departments;
      this.searchResponse.roles = response.roles;
      this.totalRow = response.totalRow;
      this.customerIds = this.customerRoles.map(x => x.id);
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetStatus = false;
      App.unblockUI();
    }
  }

  async onChange(departmentId) {
    this.searchParams.departmentId = departmentId;
    const response = await this.roleService.roleGetSelectByDepartmentId(this.searchParams.departmentId);
    this.searchResponse.roles = response.roles;
    if (this.searchResponse.roles.length > 0) {
      this.searchParams.roleId = this.searchResponse.roles[0].value;
    } else {
      this.searchParams.roleId = null;
    }
  }

  async onChangeRole(roleId) {
    this.searchParams.roleId = roleId;
  }

  async onRemove(customerId: string): Promise<void> {
    if (this.onAddStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onAddStatus = true;
    try {
      const response = await this.roleService.customerRoleRemove(this.roleId, customerId);
      if (response.status) {
        this.onSearch();
        ConfigSetting.ShowSuccess('Remove success.');
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

  async onShowFormCustomer(): Promise<void> {
    try {
      await this.listCustomer.onGets();
      $('#formListCustomer').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
