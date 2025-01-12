import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Rate, Spin, Empty } from "antd";
import axios from "axios";
import "./BenimKurslarım.css";

const BenimKurslarım = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailPanelVisible, setDetailPanelVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fake veri atama
    const fakeCourses = [
      {
        id: 1,
        title: "React Masterclass",
        category: "Development",
        lessons: "20 Ders",
        students: "150+ Öğrenci",
        rating: 4.8,
        image: "https://miro.medium.com/v2/resize:fit:1400/0*ECzYttBdIGxUbhOW.png",
      },
      {
        id: 2,
        title: "Advanced CSS Techniques",
        category: "Design",
        lessons: "15 Ders",
        students: "100+ Öğrenci",
        rating: 4.5,
        image: "https://kinsta.com/wp-content/uploads/2024/01/wp-advanced-css-techniques-1024x536.jpg",
      },
    ];
    setCourses(fakeCourses);
    setLoading(false);
  }, []);

  const handleLearnMore = (course) => {
    setSelectedCourse(course);
    setDetailPanelVisible(true);
  };

  const handleClosePanel = () => {
    setDetailPanelVisible(false);
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div className="benim-kurslarım-container">
      <div className="benim-kurslarım-header">
        <div className="course-count">
        <div className="header">
        <h3> BENİM KURSLARIM </h3>
        <p>   </p>
      </div>
        </div>
        <Button
          type="primary"
          onClick={() => navigate("/course-creation")}
        >
          Kurs Oluştur
        </Button>
      </div>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card
              key={course.id}
              hoverable
              cover={<img alt={course.title} src={course.image} />}
              className="course-card"
            >
              <Card.Meta
                title={course.title}
                description={
                  <>
                    <p>{course.lessons} Ders</p>
                    <p>{course.category}</p>
                    <p>Öğrenciler: {course.students}</p>
                    <Rate disabled defaultValue={course.rating} />
                  </>
                }
              />
              <Button type="link" onClick={() => handleLearnMore(course)}>
                Daha Fazla Bilgi
              </Button>
            </Card>
          ))
        ) : (
          <Empty description="Henüz kurs oluşturulmadı" />
        )}
      </div>

      {isDetailPanelVisible && selectedCourse && (
        <div className="detail-panel">
          <div className="detail-content">
            <Button className="close-btn" onClick={handleClosePanel}>
              ✖
            </Button>
            <h2>{selectedCourse.title}</h2>
            <p>
              <strong>Kategori:</strong> {selectedCourse.category}
            </p>
            <p>
              <strong>Dersler:</strong> {selectedCourse.lessons}
            </p>
            <p>
              <strong>Öğrenciler:</strong> {selectedCourse.students}
            </p>
            <p>
              <strong>Derecelendirme:</strong>{" "}
              <Rate disabled defaultValue={selectedCourse.rating} />
            </p>
            <img src={selectedCourse.image} alt={selectedCourse.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BenimKurslarım;
