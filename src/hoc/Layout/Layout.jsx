import React, { PureComponent } from "react";
import classes from "./Layout.module.css";
import MenuToggle from "./../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "./../../components/Navigation/Drawer/Drawer";
import { connect } from "react-redux";

class Layout extends PureComponent {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    let { menu } = this.state;
    menu = !menu;

    this.setState({ menu });
  };

  menuCloseHandler = () => {
    let { menu } = this.state;
    menu = false;

    this.setState({ menu });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>{this.props.children}</main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}
export default connect(mapStateToProps)(Layout);