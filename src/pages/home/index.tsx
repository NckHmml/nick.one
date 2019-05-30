import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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
            <img src="https://res.cloudinary.com/nhum/image/upload/c_fill,dpr_1.0,f_auto,g_north,h_400,w_1600/v1556980093/main_background.heic" />
          </picture>
        </div>

        <div className="home safe-area">
          <div className="g-24">
            <div className="g-24 g-md-16 g-lg-12">
              <div className="home-item ">
                <h1>About me</h1>
                <p>
                  I'm Nick Hummel, I have a passion for coding and solving problems.
                  I am a creative, abstract and theoretical thinker and have the ability to turn ideas into solutions.
                  I have extensive development experience with .NET technology and NodeJS be it either MVC or RESTful, I can also find my way around in Java, Scala and PHP.
                  For frontend development I specialize in React with Typescript and also have some experience with Angular, but I find it easy to adapt myself to any other framework.
                </p>
              </div>
            </div>
          </div>

          <div className="g-24">
            <div className="g-24 g-md-p-8 g-md-16 g-lg-p-12 g-lg-12">
              <div className="home-item">
                <h2 className="text-right">About this website</h2>
                <p>
                  This website is a single page application (SPA) created with React, Typescript and server-sided rendering through NodeJS.
                  The server-sided rendering is implemented for SEO optimization as the only search engine which can crawl a SPA without any problems, is Google.
                  And as we don't want to limit our exposure to just Google, we want our SPA to display content before the Javascript is executed on the browser.
                  To reduce loading times, all pages are generated once, and then cached by Nginx.
                </p>
                <Link to="/about">Read more</Link>
              </div>
            </div>
          </div>

          <div className="g-24">
            <div className="g-24 g-md-16 g-lg-12">
              <div className="home-item ">
                <h2 className="text-left">Kana learning tool</h2>
                <p>
                  Before I left to Tokyo for an internship, I wanted at least to be able to read some of the basic Japanese characters.
                  After a bit of research, I found that Hiragana and Katakana are the most common and easiest to learn.
                  Sadly, I couldn't find any tools that could help me in the exact way as I wanted, which is by repeating them so often that you can't forget them even if you wanted to.
                </p>
                <Link to="/kana">Read more</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}