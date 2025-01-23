import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./KendiEtkinlikDetayi.css";

const KendiEtkinlikDetayi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  const handleEditEvent = () => {
    navigate("/event-edit", { state: { ...event } }); // Düzenleme sayfasına yönlendirme
  };

  const handleCancelEvent = async () => {
    const confirmCancel = window.confirm("Bu etkinliği iptal etmek istediğinize emin misiniz?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token bulunamadı.");
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:5287/api/Event/cancel?eventId=${event.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Etkinlik başarıyla iptal edildi.");
      navigate("/benim-etkinliklerim");
    } catch (error) {
      console.error("Etkinlik iptal edilirken bir hata oluştu:", error.response || error);
      alert(error.response?.data?.message || "Etkinlik iptal edilirken bir hata oluştu.");
    }
  };

  const handleViewParticipants = () => {
    if (!event?.id) {
      alert("Etkinlik bilgisi eksik! Lütfen tekrar deneyin.");
      return;
    }
    navigate("/participants", { state: { eventId: event.id } });
  };

  if (!event) {
    return <div>Etkinlik bilgisi yüklenemedi. Lütfen geri dönüp tekrar deneyin.</div>;
  }

  return (
    <div className="kendi-etkinlik-detayi-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Geri</button>
      <div className="detail-card">
        <img
          src={event.photoUrl || "https://dummyimage.com/800x600/cccccc/ffffff&text=No+Image"}
          alt={event.eventName || "Etkinlik Görseli"}
          className="detail-image"
        />
        <h2>{event.eventName || "Etkinlik Adı Bilinmiyor"}</h2>
        <p><strong>Açıklama:</strong> {event.description || "Açıklama mevcut değil."}</p>
        <p><strong>Başlangıç Tarihi:</strong> {new Date(event.startEventTime).toLocaleString()}</p>
        <p><strong>Bitiş Tarihi:</strong> {event.endEventTime ? new Date(event.endEventTime).toLocaleString() : "Bilinmiyor"}</p>
        <p><strong>Adres:</strong> {event.adress || "Adres bilgisi yok."}</p>
        <p><strong>Şehir:</strong> {event.city || "Şehir bilgisi yok."}</p>
        <p><strong>Kategori:</strong> {event.category || "Kategori bilgisi yok."}</p>
        <p><strong>Katılımcı Sayısı:</strong> {event.eventParticipantNumber}/{event.maxEventParticipantNumber}</p>
        <p><strong>Durum:</strong> {event.eventStatus || "Durum bilgisi yok."}</p>
        <div className="buttons-container horizontal-buttons">
          <button className="edit-event-btn" onClick={handleEditEvent}>Etkinliği Düzenle</button>
          <button className="cancel-event-btn" onClick={handleCancelEvent}>Etkinliği İptal Et</button>
          <button className="edit-event-btn" onClick={handleViewParticipants}>Katılımcılar</button>
        </div>
      </div>
    </div>
  );
};

export default KendiEtkinlikDetayi;
