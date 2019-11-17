import { observable, observe, IValueDidChange } from "mobx";
import * as storage from "localforage";

import { PreferrsDarkmode } from "~/helpers/global";

export class GlobalStore {
  @observable
  public darkmode: boolean = PreferrsDarkmode();
  public darkmodeStored: boolean;

  constructor() {
    if (!global.BROWSER) return; // Don't need this on the server side

    observe(this, "darkmode", this.darkmodeChange);
    storage
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
    if (!global.BROWSER) return;
    if (!window.matchMedia) return;
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (result) => {
      if (this.darkmodeStored) return;
      this.darkmode = result.matches;
    });
  }

  private darkmodeChange = (change: IValueDidChange<boolean>) => {
    if (this.darkmodeStored)
      storage.setItem("darkmode", change.newValue);
  }
}