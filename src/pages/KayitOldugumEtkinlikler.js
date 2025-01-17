import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./KayitOldugumEtkinlikler.css";

const KayitOldugumEtkinlikler = () => {
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

        const response = await axios.get("http://localhost:5287/api/Event/MyEventParticipations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (err) {
        console.error("Etkinlikler alınırken hata oluştu:", err);
        setError(err.response?.data?.message || "Etkinlikler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleLeaveEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      // Eğer endpoint JSON body yerine raw text veya query string bekliyorsa:
      await axios.post(
        `http://localhost:5287/api/EventParticipation/leave`,
        null, // Body boş gönderiliyor
        {
          params: { eventId }, // eventId query parametre olarak gönderiliyor
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Başarılı bir şekilde çıkıldığında listeyi güncelle
      setEvents((prevEvents) => prevEvents.filter(({ event }) => event.id !== eventId));
    } catch (err) {
      console.error("Etkinlikten çıkarken hata oluştu:", err);
      alert(err.response?.data?.message || "Etkinlikten çıkarken bir hata oluştu.");
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (events.length === 0) {
    return (
      <div className="no-events-container">
        <h3>Henüz kayıt olunan etkinlik bulunmamakta.</h3>
        <p>İsterseniz etkinliklere kayıt olabilirsiniz!</p>
      </div>
    );
  }

  return (
    <div className="kayit-oldugum-etkinlikler-container">
      <div className="header">
        <h3>KAYIT OLUNAN ETKİNLİKLER</h3>
      </div>
      <div className="events-grid">
        {events.map(({ event, status }) => (
          <div key={event?.id} className="event-card">
            <img
              src={event?.photoUrl || "https://via.placeholder.com/150"}
              alt={event?.eventName || "Etkinlik Görseli"}
              className="event-image"
            />
            <div className="event-details">
              <h4>Etkinlik Adı: {event?.eventName || "Bilinmiyor"}</h4>
              <p>Açıklama: {event?.description || "Açıklama mevcut değil."}</p>
              <p>
                Başlangıç Tarihi: {event?.startEventTime ? new Date(event.startEventTime).toLocaleString() : "Bilinmiyor"}
              </p>
              <p>
                Bitiş Tarihi: {event?.endventDateTime ? new Date(event.endventDateTime).toLocaleString() : "Bilinmiyor"}
              </p>
              <p>Adres: {event?.adress || "Adres bilgisi yok."}</p>
              <p>Şehir: {event?.city || "Şehir bilgisi yok."}</p>
              <p>Kategori: {event?.category || "Kategori bilgisi yok."}</p>
              <p>
                Katılımcı Sayısı: {event?.eventParticipantNumber}/{event?.maxEventParticipantNumber}
              </p>
              <p>Oluşturan Kişi: {event?.creatorName || "Bilinmiyor"}</p>
              <p>Etkinlik Durumu: {event?.eventStatus || "Bilinmiyor"}</p>
              <p>Katılım Durumu: {status || "Durum bilgisi yok."}</p>
              <button
                className="leave-event-button"
                onClick={() => handleLeaveEvent(event.id)}
              >
                Etkinlikten Çık
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KayitOldugumEtkinlikler;
