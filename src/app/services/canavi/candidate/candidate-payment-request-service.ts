import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { HttpClientService } from '../../../common/http-client.service';
import { CandidatePaymentRequestSearchRequest } from 'src/app/models/canavi/candidate/candidate-payment-request-model';

@Injectable()
export class CandidatePaymentRequestService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: CandidatePaymentRequestSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCandidatePaymentRequestSearch, request);
    const result = response as any;
    return result;
  }

  async accepted(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCandidatePaymentRequestAccepted, request);
    const result = response as any;
    return result;
  }

  async reject(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCandidatePaymentRequestReject, request);
    const result = response as any;
    return result;
  }

  async cancel(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCanaviCandidatePaymentRequestCancel, request);
    const result = response as any;
    return result;
  }
}

