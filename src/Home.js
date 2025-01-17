import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/SearchBar";
import "./Home.css";

const Home = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");
  const [events, setEvents] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5287/api/Event/ActiveAllEvents", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Etkinlikler alınırken hata oluştu:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5287/ActiveAllCourse", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Kurslar alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "events") {
      fetchEvents();
    } else if (activeTab === "courses") {
      fetchCourses();
    }
  }, [activeTab]);

  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  };

  const handleMouseMove = useCallback(
    throttle((event) => {
      const { clientX } = event;
      if (clientX < 50 && !isSidebarVisible) {
        setSidebarVisible(true);
      } else if (clientX > 250 && isSidebarVisible) {
        setSidebarVisible(false);
      }
    }, 100),
    [isSidebarVisible]
  );

  const handleMouseEnterSidebar = () => {
    setSidebarVisible(true);
  };

  const handleMouseLeaveSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className="home-container" onMouseMove={handleMouseMove}>
      <Sidebar
        isVisible={isSidebarVisible}
        onMouseEnter={handleMouseEnterSidebar}
        onMouseLeave={handleMouseLeaveSidebar}
      />

      <div className="main-content">
        <Searchbar />

        <div className="filter-tabs">
          <button
            className={`tab-button ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Kurslar
          </button>
          <button
            className={`tab-button ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Etkinlikler
          </button>
        </div>

        <div className="content-wrapper">
          {activeTab === "courses" && (
            <div className="section">
              <h2 className="section-title">Onaylı Kurslar</h2>
              <div className="horizontal-card-headers">
                <span>Kurs Adı</span>
                <span>Kategori</span>
                <span>Tarih</span>
                <span>Adres</span>
                <span>Eğitmen</span>
              </div>
              <div className="list-container">
                {courses.map((course) => (
                  <div key={course.id} className="horizontal-card">
                    <span className="horizontal-card-title">{course.courseName || "Belirtilmemiş"}</span>
                    <span className="horizontal-card-category">{course.courseCategory || "Belirtilmemiş"}</span>
                    <span className="horizontal-card-dates">
                      {course.startCourseTime !== "0001-01-01T00:00:00"
                        ? `${new Date(course.startCourseTime).toLocaleDateString()} - ${new Date(
                            course.endCourseDateTime
                          ).toLocaleDateString()}`
                        : "Belirtilmemiş"}
                    </span>
                    <span className="horizontal-card-location">
                      {course.courseAdress || "Belirtilmemiş"}, {course.courseCity || "Belirtilmemiş"}
                    </span>
                    <span className="horizontal-card-creator">{course.courseCreator || "Belirtilmemiş"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="section">
              <h2 className="section-title">Onaylı Etkinlikler</h2>
              <div className="horizontal-card-headers">
                <span>Etkinlik Adı</span>
                <span>Kategori</span>
                <span>Tarih</span>
                <span>Adres</span>
              </div>
              <div className="list-container">
                {events.map((event) => (
                  <div key={event.id} className="horizontal-card">
                    <span className="horizontal-card-title">{event.eventName}</span>
                    <span className="horizontal-card-category">{event.category || "Belirtilmemiş"}</span>
                    <span className="horizontal-card-dates">
                      {new Date(event.startEventTime).toLocaleDateString()} -{" "}
                      {new Date(event.endventDateTime).toLocaleDateString()}
                    </span>
                    <span className="horizontal-card-location">
                      {event.adress || "Belirtilmemiş"}, {event.city || "Belirtilmemiş"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
