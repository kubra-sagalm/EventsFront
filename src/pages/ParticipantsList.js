import React, { useEffect, useState } from "react";
import { Table, Button, Tag, message, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ParticipantsList.css";

const ParticipantsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = location.state || {};

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Gelen Event ID:", eventId);
    if (!eventId) {
      message.error(
        "Etkinlik bilgisi bulunamadı. Lütfen etkinlik detaylarından erişim sağlayın."
      );
      return;
    }
    fetchParticipants();
  }, [eventId]);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5287/api/EventParticipation/event-participations/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Katılımcı Verisi:", response.data);

      const processedParticipants = response.data.map((participant) => ({
        ...participant,
        name: participant.user
          ? `${participant.user.firstName} ${participant.user.lastName}`
          : "Bilinmiyor",
        email: participant.user?.email || "Bilinmiyor",
        phoneNumber: participant.user?.phoneNumber || "Bilinmiyor",
        status: participant.status || "Bekliyor",
      }));

      setParticipants(processedParticipants);
    } catch (error) {
      console.error("API Hatası:", error.response || error.message);
      message.error(
        error.response?.data?.message ||
          "Katılımcılar yüklenirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (participantId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(
        "Approve URL:",
        `http://localhost:5287/api/EventParticipation/approve-participation/${participantId}`
      );
      await axios.patch(
        `http://localhost:5287/api/EventParticipation/approve-participation/${participantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Katılımcı onaylandı.");
      fetchParticipants();
    } catch (error) {
      console.error("Approve Error:", error.response || error.message);
      message.error("Katılımcı onaylanırken bir hata oluştu.");
    }
  };

  const handleReject = async (participantId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(
        "Reject URL:",
        `http://localhost:5287/api/EventParticipation/reject-participation/${participantId}`
      );

      await axios.patch(
        `http://localhost:5287/api/EventParticipation/reject-participation/${participantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Katılımcı reddedildi.");
      fetchParticipants();
    } catch (error) {
      console.error("Reject Error:", error.response || error.message);
      message.error("Katılımcı reddedilirken bir hata oluştu.");
    }
  };

  const columns = [
    {
      title: "Ad Soyad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-posta",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Onaylı"
              ? "green"
              : status === "Reddedildi"
              ? "red"
              : "blue"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => handleApprove(record.id)}
            disabled={record.status === "Onaylı"}
          >
            Onayla
          </Button>
          <Button
            type="danger"
            onClick={() => handleReject(record.id)}
            disabled={
              record.status === "Onaylı" || record.status === "Reddedildi"
            }
          >
            Reddet
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="participants-list-container">

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>KATILIMCI İSTEKLERİ</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={participants}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
};

export default ParticipantsList;
