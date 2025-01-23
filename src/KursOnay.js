import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KursOnay = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5287/PendingCourses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Gelen Kurs Verileri:", response.data); // Gelen verileri konsola yazdır
      setCourses(response.data); // Veriyi doğrudan tabloya aktar
    } catch (error) {
      console.error("Kurs istekleri alınamadı:", error);
      message.error("Kurs istekleri alınamadı!");
    } finally {
      setLoading(false);
    }
  };

  const approveCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5287/ApproveCourse/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Kurs onaylandı!");
      fetchCourses(); // Listeyi güncelle
    } catch (error) {
      console.error("Kurs onaylanırken hata oluştu:", error);
      message.error("Kurs onaylanamadı!");
    }
  };

  const rejectCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5287/RejectCourse/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Kurs reddedildi!");
      fetchCourses(); // Listeyi güncelle
    } catch (error) {
      console.error("Kurs reddedilirken hata oluştu:", error);
      message.error("Kurs reddedilemedi!");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const columns = [
    {
      title: "Detay",
      key: "details",
      render: (text, record) => (
        <Button
          type="default"
          style={{ color: "purple", backgroundColor: "purple", border: "none" }}
          onClick={() => navigate(`/course-details/${record.id}`)}
        >
        Detay
        </Button>
      ),
    },
    {
      title: "Kurs Adı",
      dataIndex: "courseName", // Backend'den gelen 'courseName' kullanılıyor
      key: "courseName",
    },
    {
      title: "Kurs Sahibinin Adı",
      dataIndex: "ownerName", // Backend'den gelen 'ownerName' kullanılıyor
      key: "ownerName",
    },
    {
      title: "Kurs Sahibinin Bilgileri",
      dataIndex: "ownerInfo", // Backend'den gelen 'ownerInfo' kullanılıyor
      key: "ownerInfo",
      render: (ownerInfo) => (
        <div>
          <div>Email: {ownerInfo?.email || "Bilinmiyor"}</div>
          <div>Telefon: {ownerInfo?.phone || "Bilinmiyor"}</div>
        </div>
      ),
    },
    
    {
      title: "Aksiyonlar",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => approveCourse(record.id)}>
            Onayla
          </Button>
          <Button
            danger
            style={{ backgroundColor: "red", borderColor: "red" }}
            onClick={() => rejectCourse(record.id)}
          >
            Reddet
          </Button>
        </div>
      ),
    },
  ];
  

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Button
        type="default"
        onClick={() => navigate(-1)}
        style={{backgroundColor:"purple", position: "absolute", top: "10px", left: "10px", zIndex: 1000, width: "60px" }}
      >
        Geri
      </Button>
      <h1 style={{ textAlign: "center" }}>Kurs Onay Paneli</h1>
      <Table dataSource={courses} columns={columns} rowKey={(record) => record.id} loading={loading} />
    </div>
  );
};

export default KursOnay;
