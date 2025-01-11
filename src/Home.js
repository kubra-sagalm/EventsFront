import React, { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/SearchBar";
import Listing from "./components/Listing";
import DetailPanel from "./components/DetailPanel";
import "./Home.css";

const Home = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Sidebar görünürlüğü
  const [selectedListing, setSelectedListing] = useState(null); // Seçilen öğeyi tutar
  const [isDetailPanelVisible, setDetailPanelVisible] = useState(false); // Detay paneli kontrolü

  // Fare hareketlerini daha az işlem için throttle ile sınırlayan yardımcı işlev
  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  };

  // Fare hareketini işle ve sidebar'ı kontrol et
  const handleMouseMove = useCallback(
    throttle((event) => {
      const { clientX } = event; // Farenin X pozisyonu
      if (clientX < 50 && !isSidebarVisible) {
        setSidebarVisible(true);
      } else if (clientX > 250 && isSidebarVisible) {
        setSidebarVisible(false);
      }
    }, 100), // 100ms gecikme
    [isSidebarVisible]
  );

  // Sidebar fare olayları (manuel kontrol için)
  const handleMouseEnterSidebar = () => {
    setSidebarVisible(true);
  };

  const handleMouseLeaveSidebar = () => {
    setSidebarVisible(false);
  };

  // Liste elemanına tıklama işlemi
  const handleListingClick = (listing) => {
    if (selectedListing === listing) {
      setSelectedListing(null);
      setDetailPanelVisible(false);
    } else {
      setSelectedListing(listing);
      setDetailPanelVisible(true);
    }
  };

  return (
    <div
      className="home-container"
      onMouseMove={handleMouseMove} // Fare hareketi ile Sidebar kontrolü
    >
      {/* Sol Menü */}
      <Sidebar
        isVisible={isSidebarVisible}
        onMouseEnter={handleMouseEnterSidebar}
        onMouseLeave={handleMouseLeaveSidebar}
      />

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
