import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { I18N } from "~/components/i18n";

export class HomePage extends React.Component {
  public render() {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className="home-banner">
          <picture>
            <source media="(min-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_2.0,f_auto,g_north,h_400,w_1600/v1556980093/main_background.heic 2x" />
            <source media="(min-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_1600/v1556980093/main_background.heic 1x" />
            <source media="(max-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_2.0,f_auto,g_north,h_400,w_1300/v1556980093/main_background.heic 2x" />
            <source media="(max-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_1300/v1556980093/main_background.heic 1x" />
            <source media="(max-width: 800px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_2.0,f_auto,g_north,h_400,w_800/v1556980093/main_background.heic 2x" />
            <source media="(max-width: 800px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_800/v1556980093/main_background.heic 1x" />
            <img alt="Banner image of a mountain view" src="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_1600/v1556980093/main_background.heic" />
          </picture>
        </div>

        <div className="home safe-area">
          <div className="g-24">
            <div className="g-24 g-md-16 g-lg-12">
              <div className="home-item ">
                <h1><I18N parent="home">intro_title</I18N></h1>
                <p><I18N parent="home">intro_text</I18N></p>
              </div>
            </div>
          </div>

          <div className="g-24">
            <div className="g-24 g-md-p-8 g-md-16 g-lg-p-12 g-lg-12">
              <div className="home-item">
                <h2 className="text-right">
                  <Link to="/about"><I18N parent="about">intro_title</I18N></Link>
                </h2>
                <p><I18N parent="about">intro_text</I18N></p>
                <Link to="/about"><I18N parent="generic">read_more</I18N></Link>
              </div>
            </div>
          </div>

          <div className="g-24">
            <div className="g-24 g-md-16 g-lg-12">
              <div className="home-item ">
                <h2 className="text-left">
                  <Link to="/kana"><I18N parent="kana">intro_title</I18N></Link>
                </h2>
                <p><I18N parent="kana">intro_text</I18N></p>
                <Link to="/kana"><I18N parent="generic">read_more</I18N></Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;