import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isVisible, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`sidebar-container ${isVisible ? "visible" : ""}`}
      onMouseEnter={onMouseEnter} // Fare sidebar'a girdiğinde
      onMouseLeave={onMouseLeave} // Fare sidebar'dan çıktığında
    >
      <div className="sidebar-header">
        <h1 className="logo">EtkinliX</h1>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h2>Etkinlikler</h2>
          <ul className="sidebar-list">
            <li>
              <Link to="/kayit-olunan-etkinlikler" className="sidebar-link">
                Kayıt olunan etkinlikler
              </Link>
            </li>
            <li>
              <Link to="/benim-etkinliklerim" className="sidebar-link">
                Benim oluşturduğum etkinlikler
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h2>Kurslar</h2>
          <ul className="sidebar-list">
            <li>
              <Link to="/kayit-olunan-kurslar" className="sidebar-link">
                Kayıt olunan kurslar
              </Link>
            </li>
            <li>
              <Link to="/benim-kurslarim" className="sidebar-link">
                Benim oluşturduğum kurslar
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h2>
            <Link to="/home" className="sidebar-link">
              Anasayfa
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
