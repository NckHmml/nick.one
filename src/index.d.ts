// tslint:disable:no-any
// tslint:disable:interface-name

declare namespace NodeJS {
  interface Global {
    BROWSER: boolean;
    DEBUG: boolean;
  }
}

interface Window {
  [key: string]: any
}