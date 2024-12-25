import React from "react";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/SearchBar";
import Listing from "./components/Listing";
import DetailPanel from "./components/DetailPanel";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Sol Menü */}
      <Sidebar />

      {/* Ana İçerik ve Sağ Panel */}
      <div className="main-content">
        {/* Üstteki Arama Çubuğu */}
        <Searchbar />

        {/* Liste ve Ayrıntı Paneli */}
        <div className="content-wrapper">
          <Listing />
          <DetailPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
