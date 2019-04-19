import * as React from "react";
import { Link } from "react-router-dom";

interface INavigationState {
  open: boolean;
}

export class Navigation extends React.Component<{}, INavigationState> {
  public render() {
    return (
      <nav className="nav">
        <div className="nav-fixed">
          <div className="nav-content">
            <div className="nav-figure g-24">
              <figure>
                <img src="/static/linkedin_avatar.png" />
                <figcaption>nick <span>hummel</span></figcaption>
              </figure>
            </div>
            <div className="group">
              <div className="nav-item g-24"><Link to="/">Home</Link></div>
              <div className="nav-item g-24"><Link to="/test">Test</Link></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}