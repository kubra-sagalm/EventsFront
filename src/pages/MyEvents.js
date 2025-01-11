import React from "react";
import Sidebar from "../components/Sidebar";
import "./MyEvents.css";

const MyEvents = () => {
  return (
    <div className="my-events-container">
      {/* Sol Menü */}
      <Sidebar />

      {/* İçerik */}
      <div className="my-events-content">
        <h1>Benim Oluşturduğum Etkinlikler</h1>
        <p>Burada oluşturduğunuz etkinliklerin listesi gözükecek.</p>
      </div>
    </div>
  );
};

export default MyEvents;
