import React from "react";
import { Link } from "react-router-dom"; // Link ekliyoruz
import "./Sidebar.css";

const Sidebar = ({ isVisible, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
    className={`sidebar-container ${isVisible ? "visible" : ""}`}
    onMouseEnter={onMouseEnter} // Fare sidebar'a girdiğinde
    onMouseLeave={onMouseLeave} // Fare sidebar'dan çıktığında
    >
      <h1>Logo</h1>
      <div className="sidebar-section">
        <h2>Etkinlikler</h2>
        <ul>
          <li>
            <Link to="/kayit-olunan-etkinlikler">Kayıt olunan etkinlikler</Link>
          </li>
          <li>
            <Link to="/benim-etkinliklerim">Benim oluşturduğum etkinlikler</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h2>Kurslar</h2>
        <ul>
          <li>
            <Link to="/kayit-olunan-kurslar">Kayıt olunan kurslar</Link>
          </li>
          <li>
            <Link to="/benim-kurslarim">Benim oluşturduğum kurslar</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h2>
          <Link to="/profil">Profil</Link>
        </h2>
      </div>
      {/* Anasayfa Butonu */}
      <div className="sidebar-home-button">
        <Link to="/home" className="home-link">
          Anasayfa
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
