import React, { Component } from "react";
import FilesActions from "../actions/FilesActions";
import { Icon } from "react-fa";
import PropTypes from "prop-types";
import axios from "axios";

class File extends Component {
  static propTypes = {
    extension: PropTypes.string,
    icon: PropTypes.string,
    isDirectory: PropTypes.bool,
    private: PropTypes.private,
    mime: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string
  };

  changeDirectory = event => {
    event.preventDefault();
    FilesActions.changeDirectory(this.props.path);
  };

  getViewLink = path => {
    return `/view/${encodeURIComponent(path)}`;
  };

  getDownloadLink = path => {
    window.open(
      `/download?path=${encodeURIComponent(path)}&pass=${encodeURIComponent(
        this.props.password || ""
      )}`,
      "_blank"
    );
  };

  // retu;

  getIconByMime = type => {
    if (type.startsWith("video/")) return "film";
    if (type.startsWith("image/")) return "picture-o";
    if (type.endsWith("/pdf")) return "file-pdf-o";
    if (type.startsWith("audio/")) return "file-audio-o";
    if (type.startsWith("text/")) return "file-text-o";
    return "file-o";
  };

  render = () => {
    const { path, pathName, name, mime, isDirectory, privateData } = this.props;
    const icon =
      typeof this.props.icon !== "undefined" ? (
        <Icon
          name={this.props.icon}
          style={{ color: this.props.checked ? "#ffffff" : "" }}
        />
      ) : (
        <Icon
          name="folder-o"
          style={{ color: this.props.checked ? "#ffffff" : "" }}
        />
      );
    const linkProps = {
      target: "_blank"
    };

    let link = (
      <a
        {...linkProps}
        style={{ color: this.props.checked ? "#ffffff" : "#000000" }}
        onClick={() => {
          this.getDownloadLink("uploads/" + pathName);
        }}
        // href={}
      >
        <Icon
          style={{ color: this.props.checked ? "#ffffff" : "#000000" }}
          Component="i"
          name={this.getIconByMime(mime)}
        />

        {name}

        {privateData ? (
          <Icon
            style={{
              float: "right",
              color: this.props.checked ? "#ffffff" : "#000000"
            }}
            Component="i"
            name={"lock"}
          />
        ) : (
          ""
        )}
      </a>
    );
    if (isDirectory) {
      link = (
        <a
          style={{ color: this.props.checked ? "#ffffff" : "#000000" }}
          {...linkProps}
          onClick={this.changeDirectory}
        >
          {icon}
          {name}
        </a>
      );
    }
    return <li>{link}</li>;
  };
}

export default File;
