import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için ekledik
import "./BenimEtkinliklerim.css";

const BenimEtkinliklerim = () => {
  const navigate = useNavigate(); // useNavigate'i kullanıyoruz

  const courses = [
    {
      id: 1,
      title: "Career to Build for the Pro Level",
      instructor: "Robert Fox",
      lessons: "10x Lesson",
      category: "Development",
      students: "50+ Students",
      rating: 4.5,
      image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
      description: "This is a detailed description for the first course.",
    },
    {
      id: 2,
      title: "Take A Course For Bright Future",
      instructor: "Robert Fox",
      lessons: "10x Lesson",
      category: "Development",
      students: "50+ Students",
      rating: 4,
      image: "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp",
      description: "This is a detailed description for the second course.",
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="stars">
        {"⭐".repeat(fullStars)}
        {halfStar && "⭐️"}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  const handleLearnMore = (course) => {
    // KendiEtkinlikDetayi sayfasına yönlendirme
    navigate(`/kendi-etkinlik-detayi/${course.id}`, { state: course });
  };

  return (
    <div className="benim-etkinliklerim-container">
      <div className="benim-etkinliklerim-header">
        <div className="course-count">
          <h3>We found {courses.length} courses for you</h3>
        </div>
        <div className="controls">
          <div className="sort-by">
            <label>Short By:</label>
            <select>
              <option value="default">Default</option>
              <option value="date">Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <button
            className="create-course-btn"
            onClick={() => navigate("/event-creation")} // Bu buton yönlendirme yapıyor
          >
            ETKİNLİK OLUŞTURMA
          </button>
        </div>
      </div>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} />
            <div className="course-details">
              <h4>{course.title}</h4>
              <p>{course.lessons}</p>
              <p>{course.category}</p>
              <p>Instructor: {course.instructor}</p>
              <p>{course.students}</p>
              <p>Rating: {renderStars(course.rating)}</p>
              <button
                className="learn-more-btn"
                onClick={() => handleLearnMore(course)}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenimEtkinliklerim;
