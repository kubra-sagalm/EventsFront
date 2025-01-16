import React, { useState, useEffect } from "react";
import { Card, Button, Spin, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BenimKurslarım.css";

const BenimKurslarım = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("API çağrısı başlatılıyor...");
        const response = await axios.get(
          "http://localhost:5287/AllCourse",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        console.log("API'den Gelen Veriler:", response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Kendi oluşturduğunuz kurslar çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div
      className="benim-kurslarım-container"
      style={{ textAlign: "left", paddingLeft: "20px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
        <h3 style={{ textAlign: "left", marginBottom: "0" }}>Benim Kurslarım</h3>
        <Button  type="primary" className="custom-purple-button" onClick={() => navigate("/course-creation")}>
          Kurs Oluştur
        </Button>
      </div>
      <div
        className="courses-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card
              key={course.id}
              hoverable
              cover={
                <img
                  alt={course.courseName || "No Title"}
                  src={
                    course.photoUrl ||
                    "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image"
                  }
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              }
              className="course-card"
              style={{ width: "300px" }}
            >
              <Card.Meta
                title={course.courseName || "Kurs Adı Yok"}
                description={
                  <>
                    <p><strong>Açıklama:</strong> {course.courseDescription || "Açıklama Yok"}</p>
                    <p><strong>Kategori:</strong> {course.courseCategory || "Kategori Yok"}</p>
                    <p><strong>Başlangıç:</strong> 
                      {course.startCourseTime 
                        ? new Date(course.startCourseTime).toLocaleString() 
                        : "Tarih Yok"}
                    </p>
                    <p><strong>Bitiş:</strong> 
                      {course.endCourseDateTime 
                        ? new Date(course.endCourseDateTime).toLocaleString() 
                        : "Tarih Yok"}
                    </p>
                    <p><strong>Adres:</strong> {course.courseAdress || "Adres Yok"}</p>
                    <p><strong>Durum:</strong> {course.courseStatus || "Durum Bilgisi Yok"}</p>
                  </>
                }
              />
              <Button type="link" onClick={() => navigate(`/course-details/${course.id}`)}>
                Daha Fazla Bilgi
              </Button>
            </Card>
          ))
        ) : (
          <Empty description="Henüz bir kurs oluşturmadınız" />
        )}
      </div>
    </div>
  );
};

export default BenimKurslarım;
