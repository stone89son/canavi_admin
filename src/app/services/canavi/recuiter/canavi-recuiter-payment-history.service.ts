import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CanaviRecuiterPaymentHistorySearchRequest } from '../../../models/canavi/recuiter/recuiter-payment-history-search';


@Injectable()
export class CanaviRecuiterPaymentHistoryService {

  constructor(private httpClient: HttpClientService) { }

  async getByRecuiterId(request: CanaviRecuiterPaymentHistorySearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviRecuiterPaymentHistoryGetByRecuiterId, request);
    const result = response as any;
    return result;
  }
}

