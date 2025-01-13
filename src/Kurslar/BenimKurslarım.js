import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Rate, Spin, Empty } from "antd";
import axios from "axios";
import "./BenimKurslarım.css";
import { Color } from "antd/es/color-picker";

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
        image: "https://www.indyturk.com/sites/default/files/styles/1368x911/public/article/main_image/2019/10/24/194256-82855996.jpg?itok=aWnWkU0t",
      },
      {
        id: 2,
        title: "Advanced CSS Techniques",
        category: "Design",
        lessons: "15 Ders",
        students: "100+ Öğrenci",
        rating: 4.5,
        image: "https://blog.rehberlik.online/wp-content/uploads/2020/02/ders-çalışma-scaled.jpg",
      },
      {
        id: 3,
        title: "JavaScript Essentials",
        category: "Programming",
        lessons: "12 Ders",
        students: "120+ Öğrenci",
        rating: 4.6,
        image: "https://abaegitim.com/wp-content/uploads/ders-calisma.jpeg",
      },
      {
        id: 4,
        title: "Python for Data Science",
        category: "Data Science",
        lessons: "18 Ders",
        students: "200+ Öğrenci",
        rating: 4.7,
        image: "https://i.tmgrup.com.tr/fikriyat/album/2020/02/05/verimli-ders-calisma-teknikleri-hakkinda-ornekler-verimli-ders-calisma-programi-nasil-hazirlanir-1580905241182.jpg",
      },
      {
        id: 5,
        title: "Machine Learning Basics",
        category: "AI",
        lessons: "22 Ders",
        students: "170+ Öğrenci",
        rating: 4.9,
        image: "https://nerminahmethasogluortaokulu.meb.k12.tr/meb_iys_dosyalar/34/40/739670/resimler/2018_12/k_14083942_IMG_20150610_174114.jpg",
      },
    ];
    setCourses(fakeCourses);
    setLoading(false);
  }, []);

  const handleLearnMore = (course) => {
    navigate("/course-details", { state: course }); // Kurs detay sayfasına yönlendirme
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
      <div
  className="course-count"
  style={{
    display: "flex",
    justifyContent: "center", // Yatayda ortalamak için
    alignItems: "center",    // Dikeyde ortalamak için
    marginBottom: "20px",
    textAlign: "center",
    width: "100%",           // Genişliği tamamen kaplaması için
  }}
>
  <h3 style={{ margin: 0,fontSize: "24px",color: "black" }}>BENİM KURSLARIM</h3>
</div>




        <Button
          type="primary"
          onClick={() => navigate("/course-creation")}
        >
          Kurs Oluştur
        </Button>
      </div>
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
