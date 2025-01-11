import React from "react";
import "./BenimEtkinliklerim.css";

const events = [
  {
    id: 1,
    title: "Career to build for the pro level",
    lessons: "10x Lesson",
    category: "Development",
    teacher: "Robert Fox",
    students: "50+ Students",
    rating: 4.8,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Take A Course For Bright Future",
    lessons: "10x Lesson",
    category: "Development",
    teacher: "Robert Fox",
    students: "50+ Students",
    rating: 4.5,
    image: "https://via.placeholder.com/300x200",
  },
  // Daha fazla etkinlik eklenebilir...
];

const BenimEtkinliklerim = () => {
  return (
    <div className="events-page">
      {/* Üst Kısım */}
      <div className="events-header">
        <div className="header-left">
          <h2>
            We found <span>{events.length}</span> events for you
          </h2>
        </div>
        <div className="header-right">
          <div className="sort-options">
            <label>Short By:</label>
            <select>
              <option value="default">Default</option>
              <option value="rating">Rating</option>
              <option value="students">Students</option>
            </select>
          </div>
          <button className="create-new-event">Create a New Event</button>
        </div>
      </div>

      {/* Etkinlik Kartları */}
      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.image} alt={event.title} />
            <div className="event-info">
              <p className="event-lessons">{event.lessons}</p>
              <p className="event-category">{event.category}</p>
              <h3 className="event-title">{event.title}</h3>
              <div className="event-meta">
                <p className="event-teacher">{event.teacher}</p>
                <p className="event-students">{event.students}</p>
              </div>
              <div className="event-footer">
                <span className="event-rating">⭐ {event.rating}</span>
                <button className="learn-more">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenimEtkinliklerim;
