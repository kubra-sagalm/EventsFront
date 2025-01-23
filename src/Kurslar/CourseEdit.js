import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseEdit.css"; // Styling için

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null); // Yeni fotoğraf için state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5287/api/Course/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API'den Gelen Veri:", data);
          setCourse(data);
        } else {
          console.error("API yanıtı başarısız:", response.status);
          alert("Kurs bilgileri alınamadı.");
        }
      } catch (error) {
        console.error("API çağrısında hata:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <div className="loading">Yükleniyor...</div>;
  }

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formatDateForBackend = (localDateString) => {
    const date = new Date(localDateString);
    return date.toISOString(); // ISO 8601 formatına çevir
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !course.courseName ||
      !course.courseCategory ||
      !course.courseAdress ||
      !course.courseCity ||
      !course.courseDescription ||
      !course.startCourseTime ||
      !course.endCourseDateTime ||
      !newPhoto
    ) {
      alert("Tüm alanlar doldurulmalıdır.");
      return;
    }
  
    const formData = new FormData();
    formData.append("CourseName", course.courseName);
    formData.append("CourseCategory", course.courseCategory);
    formData.append("CourseAdress", course.courseAdress);
    formData.append("CourseCity", course.courseCity);
    formData.append("CourseDescription", course.courseDescription);
    formData.append("StartCourseTime", formatDateForBackend(course.startCourseTime));
    formData.append("EndCourseDateTime", formatDateForBackend(course.endCourseDateTime));
    formData.append("Photo", newPhoto);
  
    // Konsolda gönderilen verileri yazdır
    console.log("Gönderilen Veriler (FormData):");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await fetch(`http://localhost:5287/api/Course/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("Kurs başarıyla güncellendi.");
        navigate("/benim-kurslarim");
      } else {
        const errorResponse = await response.json();
        alert("Kurs güncellenemedi: " + (errorResponse.message || "Bilinmeyen hata"));
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };
  

  return (
    <div className="course-edit-container">
      <div className="photo-section">
        <h2>Kurs Düzenle</h2>
        <img
          src={course.photoUrl || "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image"}
          alt="Kurs Fotoğrafı"
          className="course-photo"
        />
        <input type="file" onChange={handlePhotoChange} className="photo-input" />
      </div>

      <form onSubmit={handleSubmit} className="form-section">
        <div className="form-group">
          <label>Kurs Adı:</label>
          <input
            type="text"
            value={course.courseName || ""}
            onChange={(e) => setCourse({ ...course, courseName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Kategori:</label>
          <input
            type="text"
            value={course.courseCategory || ""}
            onChange={(e) => setCourse({ ...course, courseCategory: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Açıklama:</label>
          <textarea
            value={course.courseDescription || ""}
            onChange={(e) => setCourse({ ...course, courseDescription: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Adres:</label>
          <input
            type="text"
            value={course.courseAdress || ""}
            onChange={(e) => setCourse({ ...course, courseAdress: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Şehir:</label>
          <input
            type="text"
            value={course.courseCity || ""}
            onChange={(e) => setCourse({ ...course, courseCity: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Başlangıç Tarihi:</label>
          <input
            type="datetime-local"
            value={course.startCourseTime ? formatDateForInput(course.startCourseTime) : ""}
            onChange={(e) => setCourse({ ...course, startCourseTime: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Bitiş Tarihi:</label>
          <input
            type="datetime-local"
            value={course.endCourseDateTime ? formatDateForInput(course.endCourseDateTime) : ""}
            onChange={(e) => setCourse({ ...course, endCourseDateTime: e.target.value })}
          />
        </div>

        <button type="submit" className="submit-button">Kursu Güncelle</button>
      </form>
    </div>
  );
};

export default CourseEdit;
