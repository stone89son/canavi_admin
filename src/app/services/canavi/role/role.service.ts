import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/common/http-client.service';
import { DepartmentSearchRequest } from 'src/app/models/canavi/department/department-search-request';
import { ConfigSetting } from 'src/app/common/configSetting';
import { DepartmentModel } from 'src/app/models/canavi/department/department-model';
import { RoleSearchRequestModel } from 'src/app/models/canavi/role/role-search-request-model';
import { RoleModel } from 'src/app/models/canavi/role/role-model';
import { CustomerRoleGetsRequest } from 'src/app/models/canavi/customer/customer-role-request-model';
import { ActionDefineSearchRequestModel } from 'src/app/models/canavi/role/action-define-search-request-model';

@Injectable()
export class RoleService {
  constructor(private httpClient: HttpClientService) { }

  async departmentSearch(request: DepartmentSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathDepartmentSearch, request);
    const result = response as any;
    return result;
  }

  async departmentGet(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathDepartmentGet, request);
    const result = response as any;
    return result;
  }

  async departmentSave(department: DepartmentModel): Promise<any> {
    const request = department;
    let url = '';
    if (department.id !== undefined && department.id != null && department.id !== '') {
      url = ConfigSetting.UrlPathDepartmentChange;
    } else {
      url = ConfigSetting.UrlPathDepartmentAdd;
    }
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response as any;
    return result;
  }

  async roleSearch(request: RoleSearchRequestModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRoleSearch, request);
    const result = response as any;
    return result;
  }

  async roleSave(role: RoleModel): Promise<any> {
    const request = role;
    let url = '';
    if (role.id !== undefined && role.id != null && role.id !== '') {
      url = ConfigSetting.UrlPathRoleChange;
    } else {
      url = ConfigSetting.UrlPathRoleAdd;
    }
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response as any;
    return result;
  }

  async roleChangeIsAdministrator(roleId: string, isAdministrator: boolean): Promise<any> {
    const request = {
      id: roleId, isAdministrator
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRoleChangeIsAdministrator, request);
    const result = response as any;
    return result;
  }

  async actiondefineSearch(request: ActionDefineSearchRequestModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathActionDefineSearch, request);
    const result = response as any;
    return result;
  }

  async permissionChangeByRole(roleId: string, actionIdsAdd: string[], actionIdsRemove: string[]): Promise<any> {
    const request = {
      roleId, actionIdsAdd, actionIdsRemove
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathPermissionChangeByRole, request);
    const result = response as any;
    return result;
  }

  async permissionGetAll(): Promise<any> {
    const request = {};
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathPermissionPermissionGet, request);
    const result = response as any;
    return result;
  }

  async customerRoleGets(request: CustomerRoleGetsRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerRoleGets, request);
    const result = response as any;
    return result;
  }

  async customerRoleAdd(roleId: string, customerId: string): Promise<any> {
    const request = {
      roleId,
      customerId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerRoleMappingAdd, request);
    const result = response as any;
    return result;
  }

  async customerRoleRemove(roleId: string, customerId: string): Promise<any> {
    const request = {
      roleId,
      customerId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerRoleMappingRemove, request);
    const result = response as any;
    return result;
  }

  async roleGetSelectByDepartmentId(departmentId: string): Promise<any> {
    const request = {
      departmentId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRoleGetSelectByDepratmentId, request);
    const result = response as any;
    return result;
  }
}
