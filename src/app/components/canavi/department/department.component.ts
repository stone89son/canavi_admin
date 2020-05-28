import { Component, OnInit, ViewChild } from '@angular/core';
import { KeyValueModel } from 'src/app/models/result-model';
import { DepartmentSearchRequest } from 'src/app/models/canavi/department/department-search-request';
import { DepartmentModel } from 'src/app/models/canavi/department/department-model';
import { Dictionary } from 'src/app/models/dictionary';
import { RoleService } from 'src/app/services/canavi/role/role.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  searchParams: DepartmentSearchRequest;
  statuses: KeyValueModel[];
  departments: DepartmentModel[];
  departmentAdnew: DepartmentModel;
  departmentEdit: DepartmentModel;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  showAddNew = false;
  rowEdits: Dictionary<boolean>;

  @ViewChild('addForm', {static: false}) form1: any;
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.searchParams = new DepartmentSearchRequest();
    this.searchParams.status = 0;
    this.departments = [];
    this.departmentAdnew = new DepartmentModel();
    this.departmentEdit = new DepartmentModel();
    this.statuses = [];
    this.rowEdits = new Dictionary<boolean>();
    this.onSearch();
  }
  async onSearch(): Promise<void> {
    try {
      const response = await this.roleService.departmentSearch(this.searchParams);
      this.statuses = response.statuses;
      this.departments = response.departments as DepartmentModel[];
      this.totalRow = response.totalRow;
      this.rowEdits = new Dictionary<boolean>();
      for (let i = 0; i < this.departments.length; i++) {
        const department = this.departments[i];
        this.rowEdits.Add(department.id, false);
      }

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNew(): Promise<void> {
    try {
      this.showAddNew = !this.showAddNew;
      this.departmentAdnew = new DepartmentModel();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onChange(departmentId: string): Promise<void> {
    this.onAddNewCancel();
    for (let i = 0; i < this.departments.length; i++) {
      if (this.rowEdits.Item(this.departments[i].id)) {
        this.onChangeCancel(this.departments[i].id);
      }
    }
    const department = this.departments.find(x => x.id === departmentId);
    this.departmentEdit = JSON.parse(JSON.stringify(department));
    const state = this.rowEdits.Item(departmentId);
    this.rowEdits.Change(departmentId, !state);
  }
  async onChangeCancel(departmentId: string): Promise<void> {
    this.rowEdits.Change(departmentId, false);
    const index = this.departments.findIndex(x => x.id === departmentId);
    this.departments[index] = this.departmentEdit;
  }
  async onSave(departmentId: string): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        let department: DepartmentModel = null;
        if (departmentId === '') {
          department = this.departmentAdnew;
        } else {
          for (let i = 0; i <= this.departments.length; i++) {
            if (this.departments[i].id === departmentId) {
              department = this.departments[i];
              break;
            }
          }
        }
        if (department == null) {
          ConfigSetting.ShowSuccess('Department not null.');
        } else {
          const response = await this.roleService.departmentSave(department);
          if (response.status) {
            ConfigSetting.ShowSuccess('Save success.');
            await this.onSearch();
            if (departmentId === '') {
              await this.onAddNewCancel();
            } else {
              await this.rowEdits.Change(departmentId, false);
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

}
