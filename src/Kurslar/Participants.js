import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Table, Button, Spin, message } from "antd";
import "./Participants.css";

const Participants = () => {
  const location = useLocation();
  const course = location.state;
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        console.log("Fetching participants for course:", course);
        const response = await fetch(`http://localhost:5287/api/CourseParticipation/courses/${course.id}/participation-requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          console.error("Response Status:", response.status);
          console.error("Response Body:", await response.text());
          throw new Error("Katılımcılar yüklenirken bir hata oluştu.");
        }

        const data = await response.json();
        console.log("Fetched Participants Data:", data);
        setParticipants(data);
      } catch (error) {
        console.error("API Hatası:", error.message);
        message.error("Katılımcılar yüklenemedi. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [course.id]);

  const handleApprove = async (participantId) => {
    try {
      console.log("Approving participant with ID:", participantId);
      const response = await fetch(`http://localhost:5287/api/CourseParticipation/Approve?courseParticipationId=${participantId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Katılımcı onaylanırken bir hata oluştu.");
      }
  
      message.success("Katılımcı başarıyla onaylandı.");
      setParticipants(participants.map((p) =>
        p.id === participantId ? { ...p, status: "Onaylandı" } : p
      ));
    } catch (error) {
      console.error(error);
      message.error("Katılımcı onaylanamadı. Lütfen tekrar deneyin.");
    }
  };
  

  const handleReject = async (participantId) => {
    try {
      console.log("Rejecting participant with ID:", participantId);
      const response = await fetch(`http://localhost:5287/api/CourseParticipation/Reject?courseParticipationId=${participantId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Katılımcı reddedilirken bir hata oluştu.");
      }
  
      message.success("Katılımcı başarıyla reddedildi.");
      setParticipants(participants.map((p) =>
        p.id === participantId ? { ...p, status: "Reddedildi" } : p
      ));
    } catch (error) {
      console.error(error);
      message.error("Katılımcı reddedilemedi. Lütfen tekrar deneyin.");
    }
  };
  

  const columns = [
    {
      title: "Ad Soyad",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => `${record.firstName || "Ad Yok"} ${record.lastName || "Soyad Yok"}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefon",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
    },
    {
        title: "Aksiyon",
        key: "action",
        render: (_, record) => (
          <>
            <Button
              type="primary"
              onClick={() => handleApprove(record.id)}
              style={{ marginRight: "8px", backgroundColor: "green", borderColor: "green" }}
            >
              Onayla
            </Button>
            <Button
              danger
              onClick={() => handleReject(record.id)}
              style={{ backgroundColor: "red", borderColor: "red", color: "white" }}
            >
              Reddet
            </Button>
          </>
        ),
      },
      
      
  ];

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div className="participants-container">
      <Button 
        className="back-button"
        type="link" 
        onClick={() => window.history.back()}
        style={{ marginBottom: "20px", color: "#1890ff", fontWeight: "bold" }}
      >
        ← Geri
      </Button>
      <h2>{course.courseName} - Katılım İstekleri</h2>
      <Table 
        dataSource={participants} 
        columns={columns} 
        rowKey="id" 
        bordered 
      />
    </div>
  );
};

export default Participants;
