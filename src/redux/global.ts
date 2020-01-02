import localforage from "localforage";
import { observable, observe, IValueDidChange } from "mobx";

import { PreferrsDarkmode } from "~/helpers/global";

export class GlobalStore {
  @observable
  public darkmode: boolean = PreferrsDarkmode();
  public darkmodeStored: boolean;

  constructor() {
    if (!process.env.BROWSER) return; // Don't need this on the server side

    observe(this, "darkmode", this.darkmodeChange);
    localforage
      .getItem("darkmode")
      .then((value) => {
        if (typeof value === "boolean") {
          this.darkmodeStored = true;
          this.darkmode = value;
        }
      })
      .catch(console.error);
    this.listenDarkmodePreferrence();
  }

  private listenDarkmodePreferrence() {
    if (!process.env.BROWSER) return;
    if (!window.matchMedia) return;
    window.matchMedia("(prefers-color-scheme: dark)").addListener((result) => {
      if (this.darkmodeStored) return;
      this.darkmode = result.matches;
    });
  }

  private darkmodeChange = (change: IValueDidChange<boolean>) => {
    if (this.darkmodeStored)
      localforage.setItem("darkmode", change.newValue);
  }
}