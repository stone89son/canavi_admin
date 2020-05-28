// import { Injectable } from '@angular/core';
// import { ConfigSetting } from '../common/configSetting';
// import { Dictionary } from '../models/dictionary';
// @Injectable()
// export class PermissionService {

//     permissions: Dictionary<boolean>;
//     CheckPermission(actionKey: string) {
//         if (this.permissions == null) {
//             this.permissions = new Dictionary<boolean>();
//             this.permissions = ConfigSetting.GetPermissions();
//         }
//         if (this.permissions.Item('IsAdministrator') || this.permissions.ContainsKey(actionKey)) {
//             return true;
//         } else {
//             return false;
//         }

//     }
// }
