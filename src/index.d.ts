// tslint:disable:no-any
// tslint:disable:interface-name

declare namespace NodeJS {
  interface ProcessEnv {
    BROWSER: string;
    DEBUG: string;
    INSIGHTS_KEY: string;
    I18N: typeof import("./languages/en.json"); // Use English as base
  }
}

interface Window {
  [key: string]: any;
  Three: typeof import("three");
}

type I18NJSON = typeof import("./languages/en.json");