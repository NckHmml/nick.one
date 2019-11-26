// tslint:disable:no-any
// tslint:disable:interface-name

declare namespace NodeJS {
  interface Global {
    BROWSER: boolean;
    DEBUG: boolean;
    INSIGHTS_KEY: string;
  }
}

interface Window {
  [key: string]: any;
  Three: typeof import("three");
}