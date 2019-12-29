import * as React from "react";
import * as defaultLang from "~/languages/en.json";

interface I18NProps {
  parent: keyof I18NJSON;
  children: string;
}

interface I18NState {
  text: string;
}

export class I18N extends React.Component<I18NProps, I18NState> {
  public state: I18NState = {
    text: defaultLang[this.props.parent][this.props.children]
  };

  private loadText() {
    // import("~/languages/nl.json").then((json) => {
    //   const { parent, children } = this.props;
    //   const text = json[parent][children];
    //   this.setState({ text });
    // });
  }

  public componentDidUpdate(prevProps: I18NProps) {
    const { parent, children } = this.props;
    if (parent !== prevProps.parent || children !== prevProps.children) {
      this.loadText();
    }
  }

  public componentDidMount() {
    this.loadText();
  }

  public render() {
    return this.state.text;
  }
}