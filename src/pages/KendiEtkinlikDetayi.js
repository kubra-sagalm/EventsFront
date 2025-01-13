import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./KendiEtkinlikDetayi.css";

const KendiEtkinlikDetayi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state;

  const handleEditEvent = () => {
    navigate("/event-creation", { state: course }); // Etkinlik bilgilerini event-creation sayfasına taşıyoruz
  };

  return (
    <div className="kendi-etkinlik-detayi-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Geri
      </button>
      <div className="detail-card">
        <img src={course.image} alt={course.title} className="detail-image" />
        <h2>{course.title}</h2>
        <p>
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p>
          <strong>Lessons:</strong> {course.lessons}
        </p>
        <p>
          <strong>Category:</strong> {course.category}
        </p>
        <p>
          <strong>Students:</strong> {course.students}
        </p>
        <p>
          <strong>Description:</strong> {course.description}
        </p>
        <button className="edit-event-btn" onClick={handleEditEvent}>
          Etkinliği Düzenle
        </button>
      </div>
    </div>
  );
};

export default KendiEtkinlikDetayi;
