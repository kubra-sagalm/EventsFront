import React from 'react';
import { Tabs, Table, Card, Row, Col, PageHeader } from 'antd';

const { TabPane } = Tabs;

const eventsData = [
  { key: '1', name: 'Etkinlik 1', date: '2025-01-20', location: 'İstanbul' },
  { key: '2', name: 'Etkinlik 2', date: '2025-02-15', location: 'Ankara' },
];

const coursesData = [
  { key: '1', name: 'Kurs 1', instructor: 'Ali Veli', duration: '3 hafta' },
  { key: '2', name: 'Kurs 2', instructor: 'Ayşe Fatma', duration: '4 hafta' },
];

const columnsForEvents = [
  { title: 'Etkinlik Adı', dataIndex: 'name', key: 'name' },
  { title: 'Tarih', dataIndex: 'date', key: 'date' },
  { title: 'Lokasyon', dataIndex: 'location', key: 'location' },
];

const columnsForCourses = [
  { title: 'Kurs Adı', dataIndex: 'name', key: 'name' },
  { title: 'Eğitmen', dataIndex: 'instructor', key: 'instructor' },
  { title: 'Süre', dataIndex: 'duration', key: 'duration' },
];

const ListelerPage = () => {
  return (
    <div style={{ padding: 24 }}>
      {/* Sayfa Başlığı */}
      <PageHeader
        className="site-page-header"
        title="Listeler"
        subTitle="Etkinlikler ve kursların listesi"
      />

      {/* Sekmeler */}
      <Tabs defaultActiveKey="1" style={{ marginTop: 16 }}>
        <TabPane tab="Etkinlikler" key="1">
          {/* Etkinlikler Tablosu */}
          <Table
            dataSource={eventsData}
            columns={columnsForEvents}
            pagination={{ pageSize: 5 }}
          />
          {/* Alternatif: Kart Görünümü */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {eventsData.map(event => (
              <Col span={8} key={event.key}>
                <Card title={event.name}>
                  <p>Tarih: {event.date}</p>
                  <p>Lokasyon: {event.location}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Kurslar" key="2">
          {/* Kurslar Tablosu */}
          <Table
            dataSource={coursesData}
            columns={columnsForCourses}
            pagination={{ pageSize: 5 }}
          />
          {/* Alternatif: Kart Görünümü */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {coursesData.map(course => (
              <Col span={8} key={course.key}>
                <Card title={course.name}>
                  <p>Eğitmen: {course.instructor}</p>
                  <p>Süre: {course.duration}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ListelerPage;
