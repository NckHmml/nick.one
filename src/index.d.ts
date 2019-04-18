// tslint:disable:no-any
// tslint:disable:interface-name

declare var DEBUG: boolean;
declare var BROWSER: boolean;

declare namespace NodeJS {
  interface Global {
    BROWSER: boolean;
  }
}