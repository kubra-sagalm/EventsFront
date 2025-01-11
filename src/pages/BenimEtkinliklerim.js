import React, { useState } from "react";
import "./BenimEtkinliklerim.css";

const BenimEtkinliklerim = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailPanelVisible, setDetailPanelVisible] = useState(false);

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
    },
    // Daha fazla örnek eklenebilir...
  ];

  const handleLearnMore = (course) => {
    setSelectedCourse(course);
    setDetailPanelVisible(true); // Detay panelini göster
  };

  const handleClosePanel = () => {
    setDetailPanelVisible(false); // Detay panelini gizle
  };

  // Rating'i yıldız sembolleriyle gösteren fonksiyon
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Tam yıldızlar
    const halfStar = rating % 1 >= 0.5; // Yarım yıldız kontrolü
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Boş yıldızlar

    return (
      <div className="stars">
        {"⭐".repeat(fullStars)}
        {halfStar && "⭐️"} {/* Yarım yıldız */}
        {"☆".repeat(emptyStars)} {/* Boş yıldız */}
      </div>
    );
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
          <button className="create-course-btn">Create a New Course</button>
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

      {/* Sağdan kayan detay paneli */}
      <div
        className={`detail-panel ${isDetailPanelVisible ? "visible" : ""}`}
      >
        {selectedCourse && (
          <div className="detail-content">
            <button className="close-btn" onClick={handleClosePanel}>
              ✖
            </button>
            <h2>{selectedCourse.title}</h2>
            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Lessons:</strong> {selectedCourse.lessons}</p>
            <p><strong>Category:</strong> {selectedCourse.category}</p>
            <p><strong>Students:</strong> {selectedCourse.students}</p>
            <p>
              <strong>Rating:</strong> {renderStars(selectedCourse.rating)}
            </p>
            <img src={selectedCourse.image} alt={selectedCourse.title} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BenimEtkinliklerim;
