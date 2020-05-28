import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ConfigSetting } from '../../common/configSetting';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {
  permissions: Dictionary<boolean>;
  constructor() {

  }
  async onInit(actionIds: string[]): Promise<void> {
    try {
      // this.permissions = ConfigSetting.CheckPermission(actionIds);
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
