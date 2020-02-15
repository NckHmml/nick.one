import * as React from "react";
import { Helmet } from "react-helmet";
import { I18N } from "~/components/i18n";

export class AboutPage extends React.Component {
  public render() {
    return (
      <>
        <Helmet>
          <title>About</title>
        </Helmet>

        <div className="about safe-area">
          <div className="g-24 g-md-20">
            <h1><I18N parent="about" children="intro_title" /></h1>
            <p><I18N parent="about" children="intro_text" /></p>
            <br />
            <h2><I18N parent="about" children="ssr_title" /></h2>
            <p><I18N parent="about" children="ssr_text" /></p>
            <br />
            <h2><I18N parent="about" children="code_title" /></h2>
            <p><I18N parent="about" children="code_text" /></p>
            <br />
            <h2><I18N parent="about" children="i18n_title" /></h2>
            <p><I18N parent="about" children="i18n_text" /></p>
          </div>
        </div>
      </>
    );
  }
}

export default AboutPage;