import { Injectable } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { ConfigSetting } from './configSetting';

@Injectable()
export class HttpClientService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  cantNotConnectObject = {
    json: function () {
      return {
        status: false,
        messages: ['Can\'t connect to server']
      };
    }
  };

  unauthorizedObject = {
    json: function () {
      return {
        status: false,
        messages: ['Unauthorized']
      };
    }
  };

  private extractData(res: Response) {
    return res || {};
  }

  private handleError(error: any): Promise<any> {
    let errObject;
    switch (error.status) {
      case 0:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: ['Can\'t connect to server']
              };
            }
          };
          ConfigSetting.ShowError('Can\'t connect to server');
        }
        break;
      case 401:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: ['Unauthorized'],
                responseStatus: error.status,
              };
            }
          };
          ConfigSetting.ShowError('Unauthorized');
        }
        break;
      case 403:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: ['Permission denied'],
                responseStatus: error.status,
              };
            }
          };
          ConfigSetting.ShowError('Permission denied');
        }
        break;
      default:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: error.status + ':' + error.statusText
              };
            }
          };
          ConfigSetting.ShowError(error.status + ':' + error.statusText);
        }
        break;
    }
    return Promise.resolve(errObject);
  }
  async postJson(absolutePath: string, obj): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const headers = ConfigSetting.Headers;
    try {
      let isError = false;
      const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
        .catch(err => {
          isError = true;
          return this.handleError(err);
        });
      if (isError) {
        const result = response as any;
        if (result.responseStatus === 401) {
          await this.CheckLogin();
        }
      }
      return response || {};
    } catch (error) {
      ConfigSetting.ShowError('Can\'t connect to server');
    }
    return this.cantNotConnectObject;
  }
  async postJsonWithAuthen(absolutePath: string, obj): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const token: string = ConfigSetting.GetAuthenToken;
    const headers = ConfigSetting.Headers;
    headers.set('Authorization', `Bearer ${token}`);
    let isError = false;
    const response = await this.http.post(url, obj, { headers: headers })
      .toPromise().then(this.extractData)
      .catch(err => {
        isError = true;
        return this.handleError(err);
      });
    // .subscribe(
    //   data  => {
    //     return data || {};
    //   },
    //   error  => {
    //     isError = true;
    //     return this.handleError(error);
    //   });
    // toPromise().then(this.extractData)
    //   .catch(err => {
    //     isError = true;
    //     return this.handleError(err);
    //   });
    if (isError) {
      const result = response as any;
      if (result.responseStatus === 401) {
        await this.CheckLogin();
      }
    }
    return response || {};
  }
  async postJsonWithAuthenResponseBlob(absolutePath: string, obj): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const token: string = ConfigSetting.GetAuthenToken;
    const headers = ConfigSetting.Headers;
    headers.set('Authorization', `Bearer ${token}`);
    let isError = false;
    const response = await this.http.post(url, obj, { headers: headers, responseType: 'blob' }).toPromise()
      .catch(err => {
        isError = true;
        return this.handleError(err);
      });
    if (isError) {
      const result = response as any;
      if (result.responseStatus === 401 || result.responseStatus === 403) {
        await this.CheckLogin();
      }
    }

    return response || {};
  }
  async postJsonWithAuthenAndHeaders(absolutePath: string, obj, headers): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const token: string = ConfigSetting.GetAuthenToken;
    headers.set('Authorization', `Bearer ${token}`);
    const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
      .catch(err => {
        return this.handleError(err);
      });
    return response || {};
  }
  async CheckLogin(): Promise<any> {
    const response = await this.postJsonWithAuthen(ConfigSetting.UrlPathCheckLogin, {});
    const result = response as any;
    if (result.status) {
      ConfigSetting.ShowError('Permission deny.');
    } else {
      ConfigSetting.Logout();
      const currentUrl = this.router.url;
      this.router.navigate([ConfigSetting.LoginPage, currentUrl]);
    }
  }
}
