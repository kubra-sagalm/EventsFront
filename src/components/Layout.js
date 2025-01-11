import React from "react";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children, isSidebarVisible, onMouseMove }) => {
  return (
    <div className="layout-container" onMouseMove={onMouseMove}>
      <Sidebar isVisible={isSidebarVisible} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
