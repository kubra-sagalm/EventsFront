import React, { useState } from "react";
import "./KayitOldugumEtkinlikler.css";

const KayitOldugumEtkinlikler = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailPanelVisible, setDetailPanelVisible] = useState(false);

  // Fake etkinlik verileri
  const events = [
    {
      id: 1,
      title: "Yapay Zeka Konferansı 2023",
      organizer: "Teknoloji Akademisi",
      date: "2023-03-15",
      location: "İstanbul, Türkiye",
      participants: "200+ Katılımcı",
      status: "Onaylı",
      image: "https://www.deryauluduz.com/wp-content/uploads/2024/05/yapay-zeka-ile-insan-beyni-arasindaki-cilgin-benzerlikler.jpg", // Web'den bir resim URL'si
    },
    {
      id: 2,
      title: "Girişimcilik Zirvesi",
      organizer: "Startup Türkiye",
      date: "2023-05-20",
      location: "Ankara, Türkiye",
      participants: "150+ Katılımcı",
      status: "Onaylı",
      image: "https://ia.tmgrup.com.tr/3fd6a8/666/400/81/0/1307/736?u=https://i.tmgrup.com.tr/prdrg/2024/03/05/yapay-zeka-caginda-girisimcilik-konusuldu-1709637176059.jpg", // Web'den bir resim URL'si
    },
  ];

  const handleLearnMore = (event) => {
    setSelectedEvent(event);
    setDetailPanelVisible(true);
  };

  const handleClosePanel = () => {
    setDetailPanelVisible(false);
  };

  return (
    <div className="kayit-oldugum-etkinlikler-container">
      <div className="header">
        <h3>KAYIT OLUNAN ETKİNLİKLER</h3>
        <p>   </p>
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            {/* Web'den alınan resmi burada görüntülüyoruz */}
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h4>{event.title}</h4>
              <p>
                <strong>Düzenleyen:</strong> {event.organizer}
              </p>
              <p>
                <strong>Tarih:</strong> {event.date}
              </p>
              <p>
                <strong>Yer:</strong> {event.location}
              </p>
              <p>
                <strong>Katılımcılar:</strong> {event.participants}
              </p>
              <button
                className="learn-more-btn"
                onClick={() => handleLearnMore(event)}
              >
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`detail-panel ${isDetailPanelVisible ? "visible" : ""}`}>
        {selectedEvent && (
          <div className="detail-content">
            <button className="close-btn" onClick={handleClosePanel}>
              ✖
            </button>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Düzenleyen:</strong> {selectedEvent.organizer}
            </p>
            <p>
              <strong>Tarih:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Yer:</strong> {selectedEvent.location}
            </p>
            <p>
              <strong>Katılımcılar:</strong> {selectedEvent.participants}
            </p>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="detail-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default KayitOldugumEtkinlikler;
