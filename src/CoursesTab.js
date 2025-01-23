import React, { useState } from "react";
import { Row, Col, Card, Button, message, Modal } from "antd";
import axios from "axios";
import "./CoursesTab.css";

const CoursesTab = ({ courses }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleRegisterCourse = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5287/api/CourseParticipation?courseId=${selectedCourseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        message.success("Kurs kaydı başarılı!");
        window.location.reload(); // Sayfayı yeniler
      } else {
        message.error("Kurs kaydı başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Kurs kaydı sırasında hata oluştu:", error);
      message.error("Bir hata meydana geldi. Lütfen tekrar deneyin.");
    } finally {
      setIsModalVisible(false); // Modalı kapat
    }
  };

  const showConfirmModal = (courseId) => {
    setSelectedCourseId(courseId); // Seçilen kurs ID'sini kaydet
    setIsModalVisible(true); // Modalı aç
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Modalı kapat
  };

  return (
    <div>
      <h2 className="section-title">Aktif Kurslar</h2>
      <Row gutter={[16, 16]}>
        {courses.map((course) => (
          <Col span={8} key={course.id}>
            <Card
              className="popular-card"
              hoverable
              cover={<img alt={course.courseName || "Kurs Resmi"} src={course.photoUrl} />}
            >
              <h3>{course.courseName || "Belirtilmemiş"}</h3>
              <p>Kategori: {course.courseCategory || "Belirtilmemiş"}</p>
              <p>Adres: {course.courseAdress || "Belirtilmemiş"}</p>
              <p>Şehir: {course.courseCity || "Belirtilmemiş"}</p>
              <p>
                Tarih: {`${new Date(course.startCourseTime).toLocaleDateString()} - ${new Date(
                  course.endCourseDateTime
                ).toLocaleDateString()}`}
              </p>
              <Button
                className="subscribe-button"
                onClick={() => showConfirmModal(course.id)}
              >
                Kayıt Ol
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Bileşeni */}
      <Modal
        title="Onay Gerekli"
        visible={isModalVisible}
        footer={[
          <Button
            key="cancel"
            style={{
              backgroundColor: "blue",
              borderColor: "blue",
              color: "white",
              width: "100px", // Buton genişliği
              marginRight: "10px", // Butonlar arasında boşluk
            }}
            onClick={handleCancel}
          >
            Hayır
          </Button>,
          <Button
            key="ok"
            style={{
              backgroundColor: "red",
              borderColor: "red",
              color: "white",
              width: "100px", // Buton genişliği
            }}
            onClick={handleRegisterCourse}
          >
            Evet
          </Button>,
        ]}
      >
        <p>Bu kursa kaydolmak istediğinize emin misiniz?</p>
      </Modal>
    </div>
  );
};

export default CoursesTab;
