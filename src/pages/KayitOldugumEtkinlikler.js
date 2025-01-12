import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için
import "./KayitOldugumEtkinlikler.css";

const KayitOldugumEtkinlikler = () => {
  const navigate = useNavigate();

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
      description: "Bu etkinlik yapay zeka alanındaki en son gelişmeleri içerir.",
      image: "https://www.deryauluduz.com/wp-content/uploads/2024/05/yapay-zeka-ile-insan-beyni-arasindaki-cilgin-benzerlikler.jpg",
    },
    {
      id: 2,
      title: "Girişimcilik Zirvesi",
      organizer: "Startup Türkiye",
      date: "2023-05-20",
      location: "Ankara, Türkiye",
      participants: "150+ Katılımcı",
      status: "Onaylı",
      description: "Girişimciler ve yatırımcılar için özel bir etkinlik.",
      image: "https://ia.tmgrup.com.tr/3fd6a8/666/400/81/0/1307/736?u=https://i.tmgrup.com.tr/prdrg/2024/03/05/yapay-zeka-caginda-girisimcilik-konusuldu-1709637176059.jpg",
    },
  ];

  const handleLearnMore = (event) => {
    navigate(`/etkinlik-detayi/${event.id}`, { state: event });
  };

  return (
    <div className="kayit-oldugum-etkinlikler-container">
      <div className="header">
        <h3>KAYIT OLUNAN ETKİNLİKLER</h3>
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
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
    </div>
  );
};

export default KayitOldugumEtkinlikler;
