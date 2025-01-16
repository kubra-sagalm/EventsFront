import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BenimEtkinliklerim.css";

const BenimEtkinliklerim = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Backend'den etkinlikleri al
        const response = await axios.get("http://localhost:5287/AllEvents", {
          headers: {
            Authorization: `Bearer ${token}`, // Kullanıcı token'ı gönderiliyor
          },
        });

        console.log("Event Data:", response.data); // Gelen veriyi kontrol ediyoruz
        setEvents(response.data); // Gelen etkinlikleri state'e kaydediyoruz
      } catch (err) {
        console.error("Hata Detayı:", err); // Hata detaylarını yazdır
        setError("Etkinlikler alınırken bir hata oluştu."); // Hata durumunu ayarla
      } finally {
        setLoading(false); // Yükleme durumunu kapatıyoruz
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleEditEvent = (event) => {
    navigate(`/kendi-etkinlik-detayi/${event.id}`, { state: event });
  };

  const handleCreateEvent = () => {
    navigate("/event-creation");
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="no-events-container">
        <h3>Bir hata oluştu: {error}</h3>
        <button className="create-event-btn" onClick={handleCreateEvent}>
          Etkinlik Oluştur
        </button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="no-events-container">
        <h3>Kayıt olunan etkinlik bulunmamaktadır.</h3>
        <p>Yeni bir etkinlik oluşturmak için aşağıdaki butonu kullanabilirsiniz.</p>
        <button className="create-event-btn" onClick={handleCreateEvent}>
          Etkinlik Oluştur
        </button>
      </div>
    );
  }

  return (
    <div className="benim-etkinliklerim-container">
      <button className="create-event-btn" onClick={handleCreateEvent}>
        Etkinlik Oluştur
      </button>
      <h3 className="header-title">Toplam {events.length} etkinlik bulundu</h3>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img
              src={
                event.photoUrl
                  ? event.photoUrl // Backend'den tam URL geliyor, doğrudan kullanılıyor
                  : "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image" // Varsayılan görsel
              }
              alt={event.eventName || "Etkinlik Görseli"}
              className="event-image"
              onError={(e) => {
                e.target.src = "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image"; // Görsel yüklenemezse varsayılan görsele geç
              }}
            />
            <div className="event-details">
              <h4>Etkinlik Adı: {event.eventName}</h4>
              <p>Açıklama: {event.description}</p>
              <p>Başlangıç Tarihi: {new Date(event.startEventTime).toLocaleString()}</p>
              <p>Bitiş Tarihi: {event.endEventTime ? new Date(event.endEventTime).toLocaleString() : "Bilinmiyor"}</p>
              <p>Adres: {event.adress}</p>
              <p>Şehir: {event.city}</p>
              <p>Kategori: {event.category}</p>
              <p>
                Katılımcı Sayısı: {event.eventParticipantNumber}/{event.maxEventParticipantNumber}
              </p>
              <p>Durum: {event.eventStatus}</p>
              <button
  className="edit-event-btn"
  onClick={() => handleEditEvent(event)}
>
  Düzenle
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenimEtkinliklerim;
