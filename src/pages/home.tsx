import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export class HomePage extends React.Component {
  public render() {
    return (
      <>
        <Helmet>
          <title>HomePage</title>
        </Helmet>

        <div className="home-banner">
          <picture>
            <source media="(min-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_2.0,f_auto,g_north,h_400,w_1600/v1556980093/main_background.heic 2x" />
            <source media="(min-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_1600/v1556980093/main_background.heic 1x" />
            <source media="(max-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_2.0,f_auto,g_north,h_400,w_1300/v1556980093/main_background.heic 2x" />
            <source media="(max-width: 1300px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_1300/v1556980093/main_background.heic 1x" />
            <source media="(max-width: 800px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_2.0,f_auto,g_north,h_400,w_800/v1556980093/main_background.heic 2x" />
            <source media="(max-width: 800px)" srcSet="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_800/v1556980093/main_background.heic 1x" />
            <img src="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_1600/v1556980093/main_background.heic" />
          </picture>
        </div>

        <div className="g-24">
          <h1>Hello World!</h1>
          <h2>This is the HomePage</h2>
          <Link to="/">Home</Link>
          <br />
          <Link to="/test">Test</Link>
        </div>
      </>
    );
  }
}