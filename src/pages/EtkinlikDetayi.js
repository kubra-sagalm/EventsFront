import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EtkinlikDetayi.css";

const EtkinlikDetayi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  const handleLeaveEvent = () => {
    alert(`${event.title} etkinliğinden çıkıldı.`);
    navigate(-1); // Geri gider
  };

  return (
    <div className="etkinlik-detayi-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Geri
      </button>
      <div className="detail-card">
        <img src={event.image} alt={event.title} className="detail-image" />
        <h2>{event.title}</h2>
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
        <p>
          <strong>Açıklama:</strong> {event.description}
        </p>
        <button className="leave-event-btn" onClick={handleLeaveEvent}>
          Etkinlikten Çık
        </button>
      </div>
    </div>
  );
};

export default EtkinlikDetayi;
