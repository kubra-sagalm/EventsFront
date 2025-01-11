import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/SearchBar";
import Listing from "./components/Listing";
import DetailPanel from "./components/DetailPanel";
import "./Home.css";

const Home = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Sidebar görünürlüğü
  const [selectedListing, setSelectedListing] = useState(null); // Seçilen öğeyi tutar
  const [isDetailPanelVisible, setDetailPanelVisible] = useState(false); // Detay paneli kontrolü

  const handleListingClick = (listing) => {
    if (selectedListing === listing) {
      setSelectedListing(null);
      setDetailPanelVisible(false);
    } else {
      setSelectedListing(listing);
      setDetailPanelVisible(true);
    }
  };

  const handleMouseMove = (event) => {
    const { clientX } = event; // Farenin X pozisyonu
    if (clientX < 50) {
      // Fare sol sınıra yakınsa Sidebar'ı göster
      setSidebarVisible(true);
    } else if (isSidebarVisible && clientX > 250) {
      // Fare Sidebar'ın genişliği dışına çıkarsa Sidebar'ı gizle
      setSidebarVisible(false);
    }
  };

  return (
    <div
      className="home-container"
      onMouseMove={handleMouseMove} // Fare hareketi ile Sidebar kontrolü
    >
      {/* Sol Menü */}
      <Sidebar isVisible={isSidebarVisible} />

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
