import React from "react";
import { Dropdown, Menu } from "antd";
import "./Header.css";

const Header = () => {
  return (
    <div className="avatar-container">
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="profile">
              <a href="/profile">Profil</a>
            </Menu.Item>
            <Menu.Item
              key="logout"
              onClick={() => {
                localStorage.removeItem("userToken");
                window.location.href = "/login";
              }}
            >
              Çıkış Yap
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <img
          src="/assets/cute-avatar.png"
          alt="Avatar"
          className="avatar"
        />
      </Dropdown>
    </div>
  );
};

export default Header;