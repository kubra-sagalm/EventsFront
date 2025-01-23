// TabsContainer.js
import React from "react";
import { Tabs, Row, Col } from "antd";
import CourseCard from "./CourseCard";
import EventCard from "./EventCard";

const TabsContainer = ({ activeTab, filteredCourses, filteredEvents }) => {
  return (
    <Tabs defaultActiveKey="courses" activeKey={activeTab} centered size="large">
      <Tabs.TabPane tab="Kurslar" key="courses">
        <h2 className="section-title">Aktif Kurslar</h2>
        <Row gutter={[16, 16]}>
          {filteredCourses.map((course) => (
            <Col span={8} key={course.id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Etkinlikler" key="events">
        <h2 className="section-title">Aktif Etkinlikler</h2>
        <Row gutter={[16, 16]}>
          {filteredEvents.map((event) => (
            <Col span={8} key={event.id}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TabsContainer;
