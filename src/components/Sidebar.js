import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true); // Fare sol kenara geldiğinde Sidebar'ı göster
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Fare sol kenardan ayrıldığında Sidebar'ı gizle
  };

  return (
    <>
      {/* Görünmez geniş bir alan sol kenarda fareyi algılamak için */}
      <div
        className="hover-zone"
        onMouseEnter={handleMouseEnter}
      ></div>

      {/* Sidebar */}
      <div
        className={`sidebar-container ${isHovered ? "visible" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        <h1>Logo</h1>
        <button>Dashboard</button>
        <button>Listings</button>
        <button>Kayıt Olunan Etkinlikler</button>
        <button>Benim Oluşturduğum Etkinlikler</button>
        <button>Kayıt Olunan Kurslar</button>
        <button>Benim Oluşturduğum Kurslar</button>
        <button>Profil</button>
      </div>
    </>
  );
};

export default Sidebar;
