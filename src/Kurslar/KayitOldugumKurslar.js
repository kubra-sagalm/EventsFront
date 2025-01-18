import React, { useState, useEffect } from "react";
import { Card, Spin, Empty, Button, message } from "antd";
import axios from "axios";
import "./KayitOldugumKurslar.css";
import { Color } from "antd/es/color-picker";

const KayitOldugumKurslar = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend'den veri çekme
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5287/api/Course/MyCourseParticipations",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Kayıt olunan kurslar çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleLeaveCourse = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:5287/api/CourseParticipation?courseId=${courseId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      message.success("Kurs katılımı başarıyla silindi.");
      // Kurs listesini güncelle
      setCourses(courses.filter((course) => course.course.id !== courseId));
    } catch (error) {
      console.error("Kurs katılımı silinirken hata oluştu:", error);
      message.error("Kurs katılımı silinirken bir hata oluştu.");
    }
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div
      className="kayit-oldugum-kurslar-container"
      style={{ textAlign: "left", paddingLeft: "20px" }}
    >
      <h3 style={{ textAlign: "left", marginBottom: "20px" }}>
        Kayıt Olduğum Kurslar
      </h3>
      <div
        className="courses-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {courses.length > 0 ? (
          courses.map((courseParticipation) => {
            const course = courseParticipation?.course || {};
            const status = courseParticipation?.status || "Bilinmiyor";

            return (
              <Card
                key={course.id}
                hoverable
                cover={<img alt={course.courseName || "No Title"} src={course.photoUrl || "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image"} />}
                className="course-card"
                style={{ width: "300px" }}
              >
                <Card.Meta
                  title={course.courseName || "Kurs Adı Yok"}
                  description={
                    <>
                      <p>Açıklama: {course.description || "Açıklama Yok"}</p>
                      <p>Kategori: {course.category || "Kategori Yok"}</p>
                      <p>Eğitmen: {course.instructor || "Eğitmen Bilgisi Yok"}</p>
                      <p>
                        Başlangıç:{" "}
                        {course.startCourseTime
                          ? new Date(course.startCourseTime).toLocaleString()
                          : "Tarih Yok"}
                      </p>
                      <p>
                        Bitiş:{" "}
                        {course.endCourseTime
                          ? new Date(course.endCourseTime).toLocaleString()
                          : "Tarih Yok"}
                      </p>
                      <p>Durum: {status}</p>
                    </>
                  }
                />
                <Button
                  type="primary"
                  danger
                  onClick={() => handleLeaveCourse(course.id)}
                  style={{ marginTop: "10px"}}
                >
                  Etkinlikten Çık
                </Button>
              </Card>
            );
          })
        ) : (
          <Empty description="Henüz bir kursa kayıt olmadınız" />
        )}
      </div>
    </div>
  );
};

export default KayitOldugumKurslar;
