// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://admin-api-dev.canavi.vn/api/',
  baseUrl: 'http://localhost:5005/api/',
  cdnUrl: 'http://125.212.238.119:5000',
  /* SSO */
  ssoUrl: 'http://localhost:5000',
  // ssoUrl: 'http://id-dev.canavi.vn',
  ssoClientId: 'js',
  ssoScope: 'openid profile cms',
  adminUIUrl: 'http://localhost:4200',
  silentRefreshUrl: 'http://localhost:4200/silent-refresh.html',
  feDomain: 'http://localhost:5002'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
