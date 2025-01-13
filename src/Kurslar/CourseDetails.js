import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Rate } from "antd";
import "./CourseDetails.css";

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state;

  const handleEditCourse = () => {
    navigate("/course-edit", { state: course }); // Kurs bilgilerini düzenleme sayfasına taşı
  };

  return (
    <div className="course-details-container">
      <Button className="back-button" type="link" onClick={() => navigate(-1)}>
        ← Geri
      </Button>
      <div className="detail-card">
        <img src={course.image} alt={course.title} className="detail-image" />
        <h2>{course.title}</h2>
        <p>
          <strong>Kategori:</strong> {course.category}
        </p>
        <p>
          <strong>Dersler:</strong> {course.lessons}
        </p>
        <p>
          <strong>Öğrenciler:</strong> {course.students}
        </p>
        <p>
          <strong>Derecelendirme:</strong> <Rate disabled defaultValue={course.rating} />
        </p>
        <Button type="primary" onClick={handleEditCourse}>
          Kursu Düzenle
        </Button>
      </div>
    </div>
  );
};

export default CourseDetails;
