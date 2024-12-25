import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">Logo</div>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Listings</li>
          <li>Messages</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
