import React, { useState, useEffect } from "react";
import { Card, Spin, Empty } from "antd";
import axios from "axios";
import "./KayitOldugumKurslar.css";

const KayitOldugumKurslar = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend'den veri çekme
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/registered-courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Kayıt olunan kurslar çekilirken hata oluştu:", error);
        // Fake veri
        setCourses([
          {
            id: 1,
            title: "React Başlangıç",
            category: "Development",
            lessons: "10 Ders",
            students: "200+ Öğrenci",
            rating: 4.5,
            image: "https://nerminahmethasogluortaokulu.meb.k12.tr/meb_iys_dosyalar/34/40/739670/resimler/2018_12/k_14083942_IMG_20150610_174114.jpg",
          },
          {
            id: 2,
            title: "UI/UX Design Fundamentals",
            category: "Design",
            lessons: "15 Ders",
            students: "150+ Öğrenci",
            rating: 4.7,
            image: "https://nerminahmethasogluortaokulu.meb.k12.tr/meb_iys_dosyalar/34/40/739670/resimler/2018_12/k_14083942_IMG_20150610_174114.jpg",
          },
        ]);
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
    <div className="kayit-oldugum-kurslar-container" style={{ textAlign: "left", paddingLeft: "20px" }}>
      <h3 style={{ textAlign: "left", marginBottom: "20px" }}>Kayıt Olduğum Kurslar</h3>
      <div className="courses-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card
              key={course.id}
              hoverable
              cover={<img alt={course.title} src={course.image} />}
              className="course-card"
              style={{ width: "300px" }}
            >
              <Card.Meta
                title={course.title}
                description={
                  <>
                    <p>{course.lessons} Ders</p>
                    <p>{course.category}</p>
                    <p>Öğrenciler: {course.students}</p>
                  </>
                }
              />
            </Card>
          ))
        ) : (
          <Empty description="Henüz bir kursa kayıt olmadınız" />
        )}
      </div>
    </div>
  );
};

export default KayitOldugumKurslar;
