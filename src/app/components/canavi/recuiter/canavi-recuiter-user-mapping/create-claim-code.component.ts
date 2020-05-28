import { Component, OnInit } from '@angular/core';
import { CanaviRecuiterUserMappingService } from 'src/app/services/canavi/recuiter/canavi-recuiter-user-mapping.service';
import { ConfigSetting } from 'src/app/common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-create-claim-code',
  templateUrl: './create-claim-code.component.html',
  styleUrls: ['./create-claim-code.component.css']
})
export class CreateClaimCodeComponent implements OnInit {
  id: string;
  claimCode: string;
  onSaveStatus: boolean;
  constructor(
    private recuiterUserMappingService: CanaviRecuiterUserMappingService,
  ) { }

  ngOnInit() {
    this.claimCode = '';
  }

  async onSave() {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSaveStatus = true;
      App.blockUI();
      const response = await this.recuiterUserMappingService.update(this.id, this.claimCode);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save success.');
        $('#create-claim-code').modal('hide');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onSaveStatus = false;
      App.unblockUI();
    }
  }
}
