import React, { useState } from "react";
import { Row, Col, Card, Button, message, Modal } from "antd";
import axios from "axios";
import "./EventsTab.css";

const EventsTab = ({ events }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleRegisterEvent = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5287/api/EventParticipation/participate?eventId=${selectedEventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        message.success("Etkinlik kaydı başarılı!");
        window.location.reload(); // Sayfayı yeniler
      } else {
        message.error("Etkinlik kaydı başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Etkinlik kaydı sırasında hata oluştu:", error);
      message.error("Bir hata meydana geldi. Lütfen tekrar deneyin.");
    } finally {
      setIsModalVisible(false); // Modalı kapat
    }
  };

  const showConfirmModal = (eventId) => {
    setSelectedEventId(eventId); // Seçilen etkinlik ID'sini kaydet
    setIsModalVisible(true); // Modalı aç
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Modalı kapat
  };

  return (
    <div>
      <h2 className="section-title">Aktif Etkinlikler</h2>
      <Row gutter={[16, 16]}>
        {events.map((event) => (
          <Col span={8} key={event.id}>
            <Card
              className="nearby-card"
              hoverable
              cover={<img alt={event.eventName || "Etkinlik Resmi"} src={event.photoUrl} />}
            >
              <h3>{event.eventName || "Belirtilmemiş"}</h3>
              <p>Kategori: {event.category || "Belirtilmemiş"}</p>
              <p>Adres: {event.adress || "Belirtilmemiş"}</p>
              <p>Şehir: {event.city || "Belirtilmemiş"}</p>
              <p>
                Tarih: {`${new Date(event.startEventTime).toLocaleDateString()} - ${new Date(
                  event.endventDateTime
                ).toLocaleDateString()}`}
              </p>
              <Button
                className="subscribe-button"
                onClick={() => showConfirmModal(event.id)}
              >
                Kayıt Ol
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Bileşeni */}
      <Modal
  title="Onay Gerekli"
  visible={isModalVisible}
  footer={[
    <Button
      key="cancel"
      style={{
        backgroundColor: "blue",
        borderColor: "blue",
        color: "white",
        width: "100px", // Buton genişliği
        marginRight: "10px", // Butonlar arasında boşluk
      }}
      onClick={handleCancel}
    >
      Hayır
    </Button>,
    <Button
      key="ok"
      style={{
        backgroundColor: "red",
        borderColor: "red",
        color: "white",
        width: "100px", // Buton genişliği
      }}
      onClick={handleRegisterEvent}
    >
      Evet
    </Button>,
  ]}
>
  <p>Bu etkinliğe kaydolmak istediğinize emin misiniz?</p>
</Modal>

    </div>
  );
};

export default EventsTab;
