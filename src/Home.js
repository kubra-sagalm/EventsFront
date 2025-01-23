import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Header from "./Header";
import Filters from "./Filters";
import CoursesTab from "./CoursesTab";
import EventsTab from "./EventsTab";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [events, setEvents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    city: null,
    category: null,
    dateRange: null,
  });

  const fetchData = async () => {
    try {
      const [eventsResponse, coursesResponse] = await Promise.all([
        axios.get("http://localhost:5287/api/Event/ActiveAllEvents", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        axios.get("http://localhost:5287/ActiveAllCourse", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ]);

      setEvents(
        eventsResponse.data.map((event) => ({
          ...event,
          photoUrl: event.photoUrl
            ? `http://localhost:5287${event.photoUrl}`
            : "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image",
        }))
      );

      setCourses(
        coursesResponse.data.map((course) => ({
          ...course,
          photoUrl: course.photoUrl
            ? `http://localhost:5287${course.photoUrl}`
            : "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image",
        }))
      );
    } catch (error) {
      console.error("Veriler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="content-container">
        <Tabs
          defaultActiveKey="courses"
          onChange={(key) => setActiveTab(key)}
          centered
          size="large"
        >
          <Tabs.TabPane tab="Kurslar" key="courses">
            <CoursesTab courses={courses} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Etkinlikler" key="events">
            <EventsTab events={events} />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Filters filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default Home;
