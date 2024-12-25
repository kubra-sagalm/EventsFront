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

      {/* Ana İçerik */}
      <div className="main-content">
        {/* Üstteki Arama Çubuğu */}
        <div className="search-section">
          <Searchbar />
        </div>

        {/* Liste ve Ayrıntı Paneli */}
        <div className="content-wrapper">
          <div className="listings">
            <Listing />
          </div>
          <div className="details">
            <DetailPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
