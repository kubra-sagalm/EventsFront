import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventEdit.css";

const EventEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  const [updatedEvent, setUpdatedEvent] = useState({ ...event });
  const [newPhoto, setNewPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewPhoto(file);
  };

  const formatDateForBackend = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("EventId", updatedEvent.id);
    formData.append("EventName", updatedEvent.eventName);
    formData.append("Description", updatedEvent.description);
    formData.append("StartEventTime", formatDateForBackend(updatedEvent.startEventTime));
    formData.append("EndventDateTime", formatDateForBackend(updatedEvent.endEventTime));
    formData.append("adress", updatedEvent.adress);
    formData.append("Category", updatedEvent.category);
    formData.append("MaxEventParticipantNumber", updatedEvent.maxEventParticipantNumber);
    formData.append("City", updatedEvent.city);

    // Eğer yeni bir fotoğraf seçildiyse, form-data'ya ekle
    if (newPhoto) {
      formData.append("Photo", newPhoto);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Oturum geçerli değil. Lütfen yeniden giriş yapın.");
        navigate("/login");
        return;
      }

      const response = await axios.post(`http://localhost:5287/api/Event`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Etkinlik başarıyla güncellendi.");
        navigate("/benim-etkinliklerim");
      } else {
        alert("Etkinlik güncellenemedi. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Etkinlik güncellenirken hata oluştu:", error.response || error);
      alert(error.response?.data?.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="event-edit-container">
      <h2>Etkinlik Düzenle</h2>
      <form onSubmit={handleSubmit}>
        <label>Etkinlik Adı:</label>
        <input
          type="text"
          name="eventName"
          value={updatedEvent.eventName || ""}
          onChange={handleInputChange}
        />

        <label>Açıklama:</label>
        <textarea
          name="description"
          value={updatedEvent.description || ""}
          onChange={handleInputChange}
        />

        <label>Adres:</label>
        <input
          type="text"
          name="adress"
          value={updatedEvent.adress || ""}
          onChange={handleInputChange}
        />

        <label>Şehir:</label>
        <input
          type="text"
          name="city"
          value={updatedEvent.city || ""}
          onChange={handleInputChange}
        />

        <label>Kategori:</label>
        <input
          type="text"
          name="category"
          value={updatedEvent.category || ""}
          onChange={handleInputChange}
        />

        <label>Başlangıç Tarihi:</label>
        <input
          type="datetime-local"
          name="startEventTime"
          value={updatedEvent.startEventTime || ""}
          onChange={handleInputChange}
        />

        <label>Bitiş Tarihi:</label>
        <input
          type="datetime-local"
          name="endEventTime"
          value={updatedEvent.endEventTime || ""}
          onChange={handleInputChange}
        />

        <label>Maksimum Katılımcı Sayısı:</label>
        <input
          type="number"
          name="maxEventParticipantNumber"
          value={updatedEvent.maxEventParticipantNumber || ""}
          onChange={handleInputChange}
        />

        <label>Mevcut Fotoğraf:</label>
        <img
          src={updatedEvent.photoUrl || "https://dummyimage.com/800x600/cccccc/ffffff&text=No+Image"}
          alt="Etkinlik Fotoğrafı"
        />

        <label>Yeni Fotoğraf:</label>
        <input type="file" onChange={handlePhotoChange} />

        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default EventEdit;
