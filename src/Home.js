import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Tabs, Select, DatePicker, Dropdown, Menu } from "antd";
import "./Home.css";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Home = () => {
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    city: null,
    category: null,
    dateRange: null,
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5287/api/Event/ActiveAllEvents", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updatedEvents = response.data.map((event) => ({
        ...event,
        photoUrl: event.photoUrl
          ? `http://localhost:5287${event.photoUrl}`
          : "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image",
      }));
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
    } catch (error) {
      console.error("Etkinlikler alınırken hata oluştu:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5287/ActiveAllCourse", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updatedCourses = response.data.map((course) => ({
        ...course,
        photoUrl: course.photoUrl
          ? `http://localhost:5287${course.photoUrl}`
          : "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image",
      }));
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
    } catch (error) {
      console.error("Kurslar alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {

    setTimeout(() => {
      setWelcomeVisible(true); // Hoşgeldiniz yazısını görünür yap
    }, 500);

    if (activeTab === "events") {
      fetchEvents();
    } else if (activeTab === "courses") {
      fetchCourses();
    }
  }, [activeTab]);

  const applyFilters = () => {
    if (activeTab === "events") {
      let filtered = [...events];
      if (filters.city) {
        filtered = filtered.filter((event) => event.city === filters.city);
      }
      if (filters.category) {
        filtered = filtered.filter((event) => event.category === filters.category);
      }
      if (filters.dateRange) {
        const [start, end] = filters.dateRange;
        filtered = filtered.filter(
          (event) =>
            new Date(event.startEventTime) >= start && new Date(event.endventDateTime) <= end
        );
      }
      setFilteredEvents(filtered);
    } else if (activeTab === "courses") {
      let filtered = [...courses];
      if (filters.city) {
        filtered = filtered.filter((course) => course.courseCity === filters.city);
      }
      if (filters.category) {
        filtered = filtered.filter((course) => course.courseCategory === filters.category);
      }
      if (filters.dateRange) {
        const [start, end] = filters.dateRange;
        filtered = filtered.filter(
          (course) =>
            new Date(course.startCourseTime) >= start && new Date(course.endCourseDateTime) <= end
        );
      }
      setFilteredCourses(filtered);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, activeTab]);

  const handleCityChange = (value) => {
    setFilters({ ...filters, city: value });
  };

  const handleCategoryChange = (value) => {
    setFilters({ ...filters, category: value });
  };

  const handleDateChange = (dates) => {
    setFilters({ ...filters, dateRange: dates });
  };

  return (
    <div className="home-container">
      <div className="content-container">
        <Tabs
          defaultActiveKey="courses"
          onChange={(key) => setActiveTab(key)}
          centered
          size="large"
        >
          <Tabs.TabPane tab="Kurslar" key="courses">
            <h2 className="section-title">Aktif Kurslar</h2>
            <Row gutter={[16, 16]}>
              {filteredCourses.map((course) => (
                <Col span={8} key={course.id}>
                  <Card
                    className="popular-card"
                    hoverable
                    cover={
                      <img
                        alt={course.courseName || "Kurs Resmi"}
                        src={course.photoUrl}
                      />
                    }
                  >
                    <h3>{course.courseName || "Belirtilmemiş"}</h3>
                    <p>Kategori: {course.courseCategory || "Belirtilmemiş"}</p>
                    <p>Adres: {course.courseAdress || "Belirtilmemiş"}</p>
                    <p>Şehir: {course.courseCity || "Belirtilmemiş"}</p>
                    <p>
                      Tarih:{" "}
                      {`${new Date(course.startCourseTime).toLocaleDateString()} - ${new Date(
                        course.endCourseDateTime
                      ).toLocaleDateString()}`}
                    </p>
                    <Button className="subscribe-button">Kayıt Ol</Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Etkinlikler" key="events">
            <h2 className="section-title">Aktif Etkinlikler</h2>
            <Row gutter={[16, 16]}>
              {filteredEvents.map((event) => (
                <Col span={8} key={event.id}>
                  <Card
                    className="nearby-card"
                    hoverable
                    cover={
                      <img
                        alt={event.eventName || "Etkinlik Resmi"}
                        src={event.photoUrl}
                      />
                    }
                  >
                    <h3>{event.eventName || "Belirtilmemiş"}</h3>
                    <p>Kategori: {event.category || "Belirtilmemiş"}</p>
                    <p>Adres: {event.adress || "Belirtilmemiş"}</p>
                    <p>Şehir: {event.city || "Belirtilmemiş"}</p>
                    <p>
                      Tarih:{" "}
                      {`${new Date(event.startEventTime).toLocaleDateString()} - ${new Date(
                        event.endventDateTime
                      ).toLocaleDateString()}`}
                    </p>
                    <Button className="subscribe-button">Kayıt Ol</Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className="filter-container">
        <h3>Filtrele</h3>
        <div className="filter-item">
          <label>İllere Göre</label>
          <Select
            style={{ width: "100%" }}
            placeholder="İl Seç"
            onChange={handleCityChange}
            allowClear
          >
             <Option value="Adana">Adana</Option>
        <Option value="Adıyaman">Adıyaman</Option>
        <Option value="Afyonkarahisar">Afyonkarahisar</Option>
        <Option value="Ağrı">Ağrı</Option>
        <Option value="Aksaray">Aksaray</Option>
        <Option value="Amasya">Amasya</Option>
        <Option value="Ankara">Ankara</Option>
        <Option value="Antalya">Antalya</Option>
        <Option value="Ardahan">Ardahan</Option>
        <Option value="Artvin">Artvin</Option>
        <Option value="Aydın">Aydın</Option>
        <Option value="Balıkesir">Balıkesir</Option>
        <Option value="Bartın">Bartın</Option>
        <Option value="Batman">Batman</Option>
        <Option value="Bayburt">Bayburt</Option>
        <Option value="Bilecik">Bilecik</Option>
        <Option value="Bingöl">Bingöl</Option>
        <Option value="Bitlis">Bitlis</Option>
        <Option value="Bolu">Bolu</Option>
        <Option value="Burdur">Burdur</Option>
        <Option value="Bursa">Bursa</Option>
        <Option value="Çanakkale">Çanakkale</Option>
        <Option value="Çankırı">Çankırı</Option>
        <Option value="Çorum">Çorum</Option>
        <Option value="Denizli">Denizli</Option>
        <Option value="Diyarbakır">Diyarbakır</Option>
        <Option value="Düzce">Düzce</Option>
        <Option value="Edirne">Edirne</Option>
        <Option value="Elazığ">Elazığ</Option>
        <Option value="Erzincan">Erzincan</Option>
        <Option value="Erzurum">Erzurum</Option>
        <Option value="Eskişehir">Eskişehir</Option>
        <Option value="Gaziantep">Gaziantep</Option>
        <Option value="Giresun">Giresun</Option>
        <Option value="Gümüşhane">Gümüşhane</Option>
        <Option value="Hakkâri">Hakkâri</Option>
        <Option value="Hatay">Hatay</Option>
        <Option value="Iğdır">Iğdır</Option>
        <Option value="Isparta">Isparta</Option>
        <Option value="İstanbul">İstanbul</Option>
        <Option value="İzmir">İzmir</Option>
        <Option value="Kahramanmaraş">Kahramanmaraş</Option>
        <Option value="Karabük">Karabük</Option>
        <Option value="Karaman">Karaman</Option>
        <Option value="Kars">Kars</Option>
        <Option value="Kastamonu">Kastamonu</Option>
        <Option value="Kayseri">Kayseri</Option>
        <Option value="Kırıkkale">Kırıkkale</Option>
        <Option value="Kırklareli">Kırklareli</Option>
        <Option value="Kırşehir">Kırşehir</Option>
        <Option value="Kilis">Kilis</Option>
        <Option value="Kocaeli">Kocaeli</Option>
        <Option value="Konya">Konya</Option>
        <Option value="Kütahya">Kütahya</Option>
        <Option value="Malatya">Malatya</Option>
        <Option value="Manisa">Manisa</Option>
        <Option value="Mardin">Mardin</Option>
        <Option value="Mersin">Mersin</Option>
        <Option value="Muğla">Muğla</Option>
        <Option value="Muş">Muş</Option>
        <Option value="Nevşehir">Nevşehir</Option>
        <Option value="Niğde">Niğde</Option>
        <Option value="Ordu">Ordu</Option>
        <Option value="Osmaniye">Osmaniye</Option>
        <Option value="Rize">Rize</Option>
        <Option value="Sakarya">Sakarya</Option>
        <Option value="Samsun">Samsun</Option>
        <Option value="Şanlıurfa">Şanlıurfa</Option>
        <Option value="Siirt">Siirt</Option>
        <Option value="Sinop">Sinop</Option>
        <Option value="Şırnak">Şırnak</Option>
        <Option value="Sivas">Sivas</Option>
        <Option value="Tekirdağ">Tekirdağ</Option>
        <Option value="Tokat">Tokat</Option>
        <Option value="Trabzon">Trabzon</Option>
        <Option value="Tunceli">Tunceli</Option>
        <Option value="Uşak">Uşak</Option>
        <Option value="Van">Van</Option>
        <Option value="Yalova">Yalova</Option>
        <Option value="Yozgat">Yozgat</Option>
        <Option value="Zonguldak">Zonguldak</Option>
          </Select>
        </div>
        <div className="filter-item">
          <label>Kategorilere Göre</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Kategori Seç"
            onChange={handleCategoryChange}
            allowClear
          >
             <Option value="Spor">Spor</Option>
        <Option value="Sanat ve Eğlence">Sanat ve Eğlence</Option>
        <Option value="Eğitim ve Atölyeler">Eğitim ve Atölyeler</Option>
        <Option value="Teknoloji ve Bilim">Teknoloji ve Bilim</Option>
        <Option value="Topluluk ve Sosyal">Topluluk ve Sosyal</Option>
        <Option value="Yeme-İçme">Yeme-İçme</Option>
        <Option value="Doğa ve Gezi">Doğa ve Gezi</Option>
        <Option value="Sağlık ve Wellness">Sağlık ve Wellness</Option>
        <Option value="Kültür ve Geleneksel">Kültür ve Geleneksel</Option>
          </Select>
        </div>
        <div className="avatar-container">
  <Dropdown overlay={
    <Menu>
      <Menu.Item key="profile">
        <a href="/profile">Profil</a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => {
        localStorage.removeItem("userToken");
        window.location.href = "/login";
      }}>
        Çıkış Yap
      </Menu.Item>
    </Menu>
  } trigger={["click"]}>
    <img
      src="/assets/cute-avatar.png" // Avatar resminizin yolu
      alt="Avatar"
      className="avatar"
    />
  </Dropdown>

</div>
        <div className="filter-item">
          <label>Tarihe Göre</label>
          <RangePicker
  style={{ width: "100%" }}
  onChange={handleDateChange}
  placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
  disabledDate={(current) => current && current < new Date()} // Bugünden önceki tarihleri devre dışı bırakır
/>

        </div>
      </div>
    </div>
  );
};

export default Home;
