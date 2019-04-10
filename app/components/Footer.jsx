import React, { Component } from "react";
import { Icon } from "react-fa";
import Switch from "react-switch";
// import { threadId } from "worker_threads";

class Footer extends Component {
  render = () => {
    return (
      <footer>
        <p
          style={{
            display: "inline",
            color: this.props.checked ? "#ffffff" : "#000000",
            marginLeft: "21px",
            marginRight: "10px"
          }}
        >
          Dark Mode
        </p>
        <Switch
          onChange={this.props.handleChange}
          checked={this.props.checked}
        />
        <p
          style={{
            display: "inline",
            color: this.props.checked ? "#ffffff" : "#000000",
            marginLeft: "21px",
            marginRight: "10px"
          }}
        >
          Private
        </p>
        <Switch
          onChange={this.props.handlePrivateChange}
          checked={this.props.private}
        />
        <div style={{ display: !this.props.private ? "none" : "inline" }}>
          <p
            style={{
              display: "inline",
              color: this.props.checked ? "#ffffff" : "#000000",
              marginLeft: "21px",
              marginRight: "10px"
            }}
          >
            Password
          </p>
          <input
            style={{ display: "inline", width: "20vw" }}
            type="password"
            value={this.props.password}
            onChange={this.props.passwordChange}
            name="name"
          />
        </div>

        <p className="teal-text center">
          <Icon Component="i" name="copyright" /> 2017&nbsp;
          <a href="https://github.com/nit-dgp/PiZilla">NITDgpOS</a>
        </p>
      </footer>
    );
  };
}

export default Footer;
