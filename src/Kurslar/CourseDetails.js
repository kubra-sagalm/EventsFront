import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Rate, Modal, message } from "antd";
import "./CourseDetails.css";

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state;

  if (!course) {
    return <div>Kurs bilgisi bulunamadı.</div>;
  }

  const handleEditCourse = () => {
    navigate(`/edit-course/${course.id}`, { state: course });
  };

  const handleCancelCourse = async () => {
    Modal.confirm({
      title: "Etkinliği iptal etmek istediğinizden emin misiniz?",
      okText: "Evet",
      cancelText: "Hayır",
      okButtonProps: {
        style: {
          backgroundColor: "red",
          color: "white",
          borderColor: "red",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "blue",
          color: "white",
          borderColor: "blue",
        },
      },
      onOk: async () => {
        try {
          const response = await fetch(`http://localhost:5287/api/Course/${course.id}/cancel`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Etkinlik iptal edilirken bir hata oluştu.");
          }
  
          const result = await response.json();
          message.success("Etkinlik başarıyla iptal edildi.");
          navigate(-1);
        } catch (error) {
          console.error(error);
          message.error("Etkinlik iptal edilemedi. Lütfen tekrar deneyin.");
        }
      },
    });
  };

  const handleViewParticipants = () => {
    navigate(`/course/${course.id}/participants`, { state: course });
  };

  return (
    <div className="course-details-container">
      <Button className="back-button" type="link" onClick={() => navigate(-1)}>
        ← Geri
      </Button>
      <div className="detail-card">
        <img
          src={
            course.photoUrl || "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image"
          }
          alt={course.courseName}
          className="detail-image"
        />
        <h2 className="detail-title">{course.courseName || "Kurs Adı Yok"}</h2>
        <div className="detail-section">
          <strong>Açıklama:</strong> <span>{course.courseDescription || "Açıklama Yok"}</span>
        </div>
        <div className="detail-section">
          <strong>Kategori:</strong> <span>{course.courseCategory || "Kategori Yok"}</span>
        </div>
        <div className="detail-section">
          <strong>Başlangıç Tarihi:</strong> <span>{
            course.startCourseTime
              ? new Date(course.startCourseTime).toLocaleString()
              : "Tarih Yok"
          }</span>
        </div>
        <div className="detail-section">
          <strong>Bitiş Tarihi:</strong> <span>{
            course.endCourseDateTime
              ? new Date(course.endCourseDateTime).toLocaleString()
              : "Tarih Yok"
          }</span>
        </div>
        <div className="detail-section">
          <strong>Adres:</strong> <span>{course.courseAdress || "Adres Yok"}</span>
        </div>
        <div className="detail-section">
          <strong>Durum:</strong> <span>{course.courseStatus || "Durum Bilgisi Yok"}</span>
        </div>
        <div className="detail-section">
          <strong>Derecelendirme:</strong> <Rate disabled defaultValue={course.rating || 0} />
        </div>
        <div className="action-buttons">
          <Button type="primary" onClick={handleEditCourse}>
            Kursu Düzenle
          </Button>
          <Button
            danger
            className="cancel-button"
            style={{
              backgroundColor: "red",
              borderColor: "red",
              color: "white",
            }}
            onClick={handleCancelCourse}
          >
            Etkinliği İptal Et
          </Button>
          <Button
            className="participants-button"
            type="default"
            onClick={handleViewParticipants}
          >
            Katılımcılar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
