import * as React from "react";

interface I18NProps {
  parent: keyof I18NJSON;
  name: string;
}

export class I18N extends React.Component<I18NProps> {

  public render() {
    return "";
  }
}