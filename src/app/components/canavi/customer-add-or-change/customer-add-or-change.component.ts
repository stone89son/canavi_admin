import { Component, OnInit, ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CustomerAddOrChangeModel } from 'src/app/models/canavi/customer/customer-add-or-change-model';
import { KeyValueModel } from 'src/app/models/result-model';
import { CustomerService } from 'src/app/services/canavi/customer/customer.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-customer-add-or-change',
  templateUrl: './customer-add-or-change.component.html',
  styleUrls: ['./customer-add-or-change.component.css']
})
export class CustomerAddOrChangeComponent implements OnInit {
  @Output() reloadGrid = new EventEmitter<boolean>();
  customer: CustomerAddOrChangeModel;
  types: KeyValueModel[];
  statuses: KeyValueModel[];
  genders: KeyValueModel[];
  languages: KeyValueModel[];
  twoFactorEnableds: KeyValueModel[];
  submited: boolean;
  _type: number;
  _typeDirty: boolean;
  @ViewChild('customerAddOrChange', {static: false}) form1: any;
  onSaveStatus: boolean;
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customer = new CustomerAddOrChangeModel();
    this.submited = false;
    this._type = 0;
    if (jQuery().datepicker) {
      $('.date-picker').datepicker({
        rtl: App.isRTL(),
        orientation: 'left',
        autoclose: true
      });
    }
  }

  async onGet(): Promise<void> {
    App.blockUI();
    try {
      const response = await this.customerService.get(this.customer.id);
      this.customer = response.customer;
      this.types = response.types;
      this.statuses = response.statuses;
      this.genders = response.genders;
      this.languages = response.languages;
      this.twoFactorEnableds = response.twoFactorEnableds;
      if (this.customer.id !== '') { this._type = response.customer.type; }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  async onAddOrChange(form): Promise<void> {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSaveStatus = true;
      App.blockUI();
      this.submited = true;
      let type = 0;
      this.types.forEach(element => {
        if (element.checked) {
          // tslint:disable-next-line:radix
          type += parseInt(element.value);
        }
      });
      this.customer.birthday = $('#customer-add-or-change input[name=\'birthday\']').val();
      this.customer.type = type;
      if (form.valid && type !== 0) {
        const requestModel = this.customer;
        const response = await this.customerService.save(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save success.');
          this.reloadGrid.emit();
          $('#customer-add-or-change').modal('hide');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onSaveStatus = false;
    }
  }

  checkedType(event) {
    this._typeDirty = true;
    if (event.checked) {
      // tslint:disable-next-line:radix
      this._type -= parseInt(event.value);
    } else {
      // tslint:disable-next-line:radix
      this._type += parseInt(event.value);
    }
  }
}
