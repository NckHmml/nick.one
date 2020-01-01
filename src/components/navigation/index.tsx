import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { observer } from "mobx-react";

import { App } from "~/app";
import { ClassNames } from "~/helpers/global";
import { Checkbox } from "~/components/checkbox";
import { I18N } from "~/components/i18n";

interface INavigationState {
  open: boolean;
  pristine: boolean;
}

@observer
class Navigation extends React.Component<RouteComponentProps<{}>, INavigationState> {
  public state: INavigationState = {
    open: true,
    pristine: true,
  };

  private collapse = () => this.setState({ open: !this.state.open, pristine: false });

  private isMobile = () => document.body.clientWidth <= 780;

  private toggleDarkmode = () => {
    App.globalStore.darkmodeStored = true;
    App.globalStore.darkmode = !App.globalStore.darkmode;
  }

  public componentDidUpdate(prevProps: RouteComponentProps<{}>) {
    const { open } = this.state;
    if (open && this.isMobile() && this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ open: false });
    }
  }

  public componentDidMount() {
    this.setState({ open: !this.isMobile() });
  }

  public render() {
    const { open, pristine } = this.state;
    const rootClass = ClassNames({
      "nav": true,
      "open": open,
      "pristine": pristine
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
                  <img src="https://res.cloudinary.com/nhum/image/upload/c_thumb,f_auto,h_60,q_auto:best,r_30,w_60/v1556979029/linkedin_avatar_l4hhzf.png" alt="Profile picture" />
                </picture>
                <figcaption>nick <span>hummel</span></figcaption>
              </figure>
            </div>
            <div className="nav-items group">
              <div className="nav-item g-24"><Link to="/"><I18N parent="navigation">home</I18N></Link></div>
              <div className="nav-item g-24"><Link to="/kana"><I18N parent="navigation">kana</I18N></Link></div>
              <div className="nav-item g-24"><Link to="/about"><I18N parent="navigation">about</I18N></Link></div>
              <div className="nav-item g-24">
                <div className="nav-item-checkbox">
                  <Checkbox
                    title={<I18N parent="navigation" children="toggle" />}
                    className="left"
                    defaultValue={App.globalStore.darkmode}
                    onChange={this.toggleDarkmode}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="nav-collapse"
            onClick={this.collapse}
            title={open ? "collapse navigation" : "expand navigation"}
          ><span>&lt;</span></div>
        </div>
      </nav>
    );
  }
}


export const NavigationComponent = withRouter(Navigation);