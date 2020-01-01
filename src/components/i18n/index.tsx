import * as React from "react";
import { App } from "~/app";

interface I18NProps {
  parent: keyof I18NJSON;
  children: string;
}

export class I18N extends React.Component<I18NProps> {
  private getText() {
    const { parent, children } = this.props;
    const fallback = <b className="text-red">{parent}.{children}</b>
    try {
      return App.I18N[parent][children] || fallback;
    } catch {
      return fallback;
    }
  }

  public render() {
    return this.getText();
  }
}