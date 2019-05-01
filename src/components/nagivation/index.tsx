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
                <img src="/static/linkedin_avatar.png" />
                <figcaption>nick <span>hummel</span></figcaption>
              </figure>
            </div>
            <div className="nav-items group">
              <div className="nav-item g-24"><Link to="/">Home</Link></div>
              <div className="nav-item g-24"><Link to="/test">Test</Link></div>
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