import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleSearchRequestModel } from 'src/app/models/canavi/role/role-search-request-model';
import { KeyValueModel } from 'src/app/models/result-model';
import { RoleModel } from 'src/app/models/canavi/role/role-model';
import { Dictionary } from 'src/app/models/dictionary';
import { RoleService } from 'src/app/services/canavi/role/role.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  private departmentId: string;
  private customerId: string;
  searchParams: RoleSearchRequestModel;
  statuses: KeyValueModel[];
  searchParamDepartments: KeyValueModel[];
  roles: RoleModel[];
  showAddNew = false;
  rowEdits: Dictionary<boolean>;
  roleAdnew: RoleModel;
  roleEdit: RoleModel;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  onChangeAdministratorStatus: boolean;
  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    this.route.params.subscribe(params => {
      this.departmentId = params.departmentid;
      this.customerId = params.customerid;
    });
  }

  @ViewChild('addRole', {static: false}) form1: any;

  ngOnInit() {
    this.searchParams = new RoleSearchRequestModel();
    this.searchParams.status = 0;
    if (this.departmentId !== '-') {
      this.searchParams.departmentId = this.departmentId;
    }
    this.rowEdits = new Dictionary<boolean>();
    this.roles = [];
    this.roleAdnew = new RoleModel();
    this.roleEdit = new RoleModel();
    this.roleAdnew.departmentId = this.departmentId;
    this.onSearch();

    $.fn.select2.defaults.set('theme', 'bootstrap');
    const placeholder = 'Select a State';
    $('#departmentId').select2({
      allowClear: true,
      placeholder: placeholder,
      width: null
    });
    const $searchParams = this.searchParams;
    $(this.newMethod()).on('select2:select', function (e) {
      const data = e.params.data;
      $searchParams.departmentId = data.id;
    });
    $('#departmentId').on('select2:unselect', function (e) {
      $searchParams.departmentId = '';
    });
  }
  private newMethod(): any {
    return '#departmentId';
  }

  async onAddNew(): Promise<void> {
    try {
      this.showAddNew = !this.showAddNew;
      this.roleAdnew = new RoleModel();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;
      this.roleAdnew = new RoleModel();
      this.roleAdnew.departmentId = this.departmentId;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onChange(roleId: string): Promise<void> {
    this.onAddNewCancel();
    for (let i = 0; i < this.roles.length; i++) {
      if (this.rowEdits.Item(this.roles[i].id)) {
        this.onChangeCancel(this.roles[i].id);
      }
    }
    const role = this.roles.find(x => x.id === roleId);
    this.roleEdit = JSON.parse(JSON.stringify(role));
    const state = this.rowEdits.Item(roleId);
    this.rowEdits.Change(roleId, !state);
  }
  async onChangeCancel(roleId: string): Promise<void> {
    this.rowEdits.Change(roleId, false);
    const index = this.roles.findIndex(x => x.id === roleId);
    this.roles[index] = this.roleEdit;
  }
  async onSearch(): Promise<void> {
    try {
      const response = await this.roleService.roleSearch(this.searchParams);
      this.statuses = response.statuses;
      this.roles = response.roles;
      this.searchParamDepartments = response.departments as KeyValueModel[];
      this.rowEdits = new Dictionary<boolean>();
      for (let i = 0; i < this.roles.length; i++) {
        const role = this.roles[i];
        this.rowEdits.Add(role.id, false);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onSave(roleId: string): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        let role: RoleModel = null;
        if (roleId === '') {
          role = this.roleAdnew;
        } else {
          for (let i = 0; i <= this.roles.length; i++) {
            if (this.roles[i].id === roleId) {
              role = this.roles[i];
              break;
            }
          }
        }
        if (role == null) {
          ConfigSetting.ShowSuccess('Role not null.');
        } else {
          const response = await this.roleService.roleSave(role);
          if (response.status) {
            ConfigSetting.ShowSuccess('Save success.');
            await this.onSearch();
            if (roleId === '') {
              await this.onAddNewCancel();
            } else {
              await this.rowEdits.Change(roleId, false);
            }
          } else {
            ConfigSetting.ShowErrores(response.messages);
          }
        }
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
    App.unblockUI();

  }

  async onChangeIsAdministrator(role: RoleModel): Promise<void> {
    if (this.onChangeAdministratorStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onChangeAdministratorStatus = true;
      App.blockUI();
      if (this.form1.valid) {
        const roleId = role.id;
        const response = await this.roleService.roleChangeIsAdministrator(role.id, !role.isAdministrator);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save success.');
          await this.onSearch();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }

      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    } finally {
      App.unblockUI();
      this.onChangeAdministratorStatus = false;
    }
  }
}


