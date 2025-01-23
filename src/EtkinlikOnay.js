import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate'i import edin

const EtkinlikOnay = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate kancasını kullanın

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5287/PendingEvents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Gelen Etkinlik Verileri:", response.data); // Verileri konsolda göster
      setEvents(response.data);
    } catch (error) {
      console.error("Etkinlik istekleri alınamadı:", error);
      message.error("Etkinlik istekleri alınamadı!");
    } finally {
      setLoading(false);
    }
  };

  const approveEvent = async (eventId) => {
    try {
      await axios.post(
        `http://localhost:5287/ApproveEvent/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Etkinlik onaylandı!");
      fetchEvents(); // Listeyi güncelle
    } catch (error) {
      console.error("Etkinlik onaylanırken hata oluştu:", error);
      message.error("Etkinlik onaylanamadı!");
    }
  };

  const rejectEvent = async (eventId) => {
    try {
      await axios.post(
        `http://localhost:5287/RejectEvent/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Etkinlik reddedildi!");
      fetchEvents(); 
    } catch (error) {
      console.error("Etkinlik reddedilirken hata oluştu:", error);
      message.error("Etkinlik reddedilemedi!");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const columns = [
    {
      title: "Detay",
      key: "details",
      render: (text, record) => (
        <Button type="default" style={{ backgroundColor: "purple", borderColor: "purple" }}  onClick={() => navigate(`/event-details/${record.id}`)}>
        Detay
        </Button>
      ),
    },
    {
      title: "Etkinlik Adı",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Etkinlik Tarihi",
      dataIndex: "endventDateTime",
      key: "endventDateTime",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Etkinlik Sahibinin Adı",
      dataIndex: "eventOwner",
      key: "eventOwner",
      render: (eventOwner) => `${eventOwner?.firstName || "Bilinmiyor"} ${eventOwner?.lastName || ""}`,
    },
    {
      title: "Etkinlik Sahibinin(MAİL-TELEFON)",
      dataIndex: "user",
      key: "user",
      render: (user) => `(${user?.email || "Bilinmiyor"}) - ${user?.phoneNumber || "Bilinmiyor"}`,
    },
    {
      title: "Aksiyonlar",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => approveEvent(record.id)}>
            Onayla
          </Button>
          <Button danger style={{ backgroundColor: "red", borderColor: "red" }} onClick={() => rejectEvent(record.id)}>
            Reddet
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}> {/* Ortalamak için textAlign eklendi */}
      <Button
        type="default"
        onClick={() => navigate(-1)} // useNavigate kullanımı
        style={{  backgroundColor: "purple",borderColor: "purple" ,position: "absolute", top: "10px", left: "10px", zIndex: 1000, width: "60px" }}
      >
        Geri
      </Button>
      <h1 style={{ textAlign: "center" }}>Etkinlik Onay Paneli</h1> {/* Ortalamak için textAlign eklendi */}
      <Table
        dataSource={events}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default EtkinlikOnay;
