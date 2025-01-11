import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2 className="logo">Logo</h2>

      {/* Etkinlikler Bölümü */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Etkinlikler</h3>
        <button className="sidebar-button">Kayıt Olunan Etkinlikler</button>
        <button className="sidebar-button">Benim Oluşturduğum Etkinlikler</button>
      </div>

      {/* Kurslar Bölümü */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Kurslar</h3>
        <button className="sidebar-button">Kayıt Olunan Kurslar</button>
        <button className="sidebar-button">Benim Oluşturduğum Kurslar</button>
      </div>

      {/* Profil Bölümü */}
      <div className="sidebar-footer">
        <button className="sidebar-button profile-button">Profil</button>
      </div>
    </div>
  );
};

export default Sidebar;
