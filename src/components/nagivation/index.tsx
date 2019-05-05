import * as React from "react";
import { Link } from "react-router-dom";
import { ClassNames } from "~/helpers/global";

interface INavigationState {
  open: boolean;
}

export class Navigation extends React.Component<{}, INavigationState> {
  public state: INavigationState = {
    open: true
  };

  private collapse = () => this.setState({ open: !this.state.open });

  public componentDidMount() {
    this.setState({ open: document.body.clientWidth > 780 });
  }

  public render() {
    const { open } = this.state;
    const rootClass = ClassNames({
      "nav": true,
      "open": open
    });

    return (
      <nav
        className={rootClass}
        aria-label="Primary"
        aria-expanded={open}
      >
        <div className="nav-fixed">
          <div className="nav-content">
            <div className="nav-figure g-24">
              <figure>
                <picture>
                  <source srcSet="https://res.cloudinary.com/nhum/image/upload/c_thumb,dpr_2.0,f_auto,h_60,q_auto:best,r_30,w_60/v1556979029/linkedin_avatar_l4hhzf.png 2x" />
                  <source srcSet="https://res.cloudinary.com/nhum/image/upload/c_thumb,dpr_1.0,f_auto,h_60,q_auto:best,r_30,w_60/v1556979029/linkedin_avatar_l4hhzf.png 1x" />
                  <img src="https://res.cloudinary.com/nhum/image/upload/c_thumb,f_auto,h_60,q_auto:best,r_30,w_60/v1556979029/linkedin_avatar_l4hhzf.png" />
                </picture>
                <figcaption>nick <span>hummel</span></figcaption>
              </figure>
            </div>
            <div className="nav-items group">
              <div className="nav-item g-24"><Link to="/">Home</Link></div>
              <div className="nav-item g-24"><Link to="/kana">Kana</Link></div>
              <div className="nav-item g-24"><Link to="/test">About</Link></div>
            </div>
          </div>
          <div
            className="nav-collapse"
            onClick={this.collapse}
            title={open ? "collapse navigation" : "expand navigation"}
          >{open ? "<" : ">"}</div>
        </div>
      </nav>
    );
  }
}