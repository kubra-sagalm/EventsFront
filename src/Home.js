import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/SearchBar";
import Listing from "./components/Listing";
import DetailPanel from "./components/DetailPanel";
import "./Home.css";

const Home = () => {
  const [selectedListing, setSelectedListing] = useState(null);

  const handleListingClick = (listing) => {
    setSelectedListing(listing); // Tıklanan öğeyi güncelle
  };

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
          <Listing onListingClick={handleListingClick} />

          {/* Details kısmı sadece bir öğe seçildiğinde aktif olacak */}
          <div className={`details ${selectedListing ? "active" : ""}`}>
            {selectedListing && <DetailPanel selectedListing={selectedListing} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
