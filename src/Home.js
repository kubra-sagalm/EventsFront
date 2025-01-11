import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/SearchBar";
import Listing from "./components/Listing";
import DetailPanel from "./components/DetailPanel";
import "./Home.css";

const Home = () => {
  const [selectedListing, setSelectedListing] = useState(null); // Seçilen öğeyi tutar
  const [isDetailPanelVisible, setDetailPanelVisible] = useState(false); // Detay panelinin görünürlüğünü kontrol eder

  const handleListingClick = (listing) => {
    if (selectedListing === listing) {
      // Aynı öğeye tıklandığında detay panelini kapat
      setSelectedListing(null);
      setDetailPanelVisible(false);
    } else {
      // Farklı bir öğeye tıklandığında detay panelini aç
      setSelectedListing(listing);
      setDetailPanelVisible(true);
    }
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
          {/* Listeleme Kısmı */}
          <Listing onListingClick={handleListingClick} />

          {/* Details kısmı sadece bir öğe seçildiğinde aktif olacak */}
          <div className={`details ${isDetailPanelVisible ? "active" : ""}`}>
            {isDetailPanelVisible && selectedListing && (
              <DetailPanel selectedListing={selectedListing} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
