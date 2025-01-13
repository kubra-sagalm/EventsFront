import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Footer from "./Footer";
import Home from "./Home";
import BenimEtkinliklerim from "./pages/BenimEtkinliklerim";
import KayitOldugumEtkinlikler from "./pages/KayitOldugumEtkinlikler"; // Kayıt olunan etkinlikler bileşeni import edildi
import Layout from "./components/Layout";
import EventCreation from "./pages/EventCreation"; // EventCreation bileşeni import edildi
import BenimKurslarım from "./Kurslar/BenimKurslarım";
import CourseCreation from "./Kurslar/CourseCreation";
import KayitOldugumKurslar from "./Kurslar/KayitOldugumKurslar";
import Profile from "./pages/Profile";
import KendiEtkinlikDetayi from "./pages/KendiEtkinlikDetayi";
import CourseDetails from "./Kurslar/CourseDetails";
import CourseEdit from "./Kurslar/CourseEdit";
import EtkinlikDetayi from "./pages/EtkinlikDetayi";


function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleMouseMove = (event) => {
    const { clientX } = event;
    if (clientX < 50) {
      setSidebarVisible(true); // Fare sol sınıra yakınsa Sidebar'ı göster
    } else if (clientX > 250) {
      setSidebarVisible(false); // Fare Sidebar'dan çıkarsa gizle
    }
  };

  return (
    <Router>
      <Routes>
        {/* Varsayılan olarak Giriş Sayfasına Yönlendirme */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Giriş ve Kayıt Ol Sayfaları */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout Kullanılan Sayfalar */}
        <Route
          path="/home"
          element={
            <Layout
              isSidebarVisible={isSidebarVisible}
              onMouseMove={handleMouseMove}
            >
              <Home />
            </Layout>
          }
        />
        <Route path="/course-creation" element={<CourseCreation />} />
        <Route
          path="/benim-etkinliklerim"
          element={
            <Layout
              isSidebarVisible={isSidebarVisible}
              onMouseMove={handleMouseMove}
            >
              <BenimEtkinliklerim />
            </Layout>
          }
        />
        <Route
          path="/benim-kurslarim"
          element={
            <Layout
              isSidebarVisible={isSidebarVisible}
              onMouseMove={handleMouseMove}
            >
              <BenimKurslarım />
            </Layout>
          }
        />
        <Route
          path="/kayit-olunan-etkinlikler" // Yeni rota Kayıt olunan etkinlikler için
          element={
            <Layout
              isSidebarVisible={isSidebarVisible}
              onMouseMove={handleMouseMove}
            >
              <KayitOldugumEtkinlikler />
            </Layout>
          }
        />
        <Route
          path="/event-creation" // Yeni rota EventCreation için
          element={
            <Layout
              isSidebarVisible={isSidebarVisible}
              onMouseMove={handleMouseMove}
            >
              <EventCreation />
            </Layout>
          }
        />
        <Route
          path="/kayit-olunan-kurslar" // Yeni rota
          element={
            <Layout
              isSidebarVisible={isSidebarVisible}
              onMouseMove={handleMouseMove}
            >
              <KayitOldugumKurslar />
            </Layout>
          }
        />
        <Route
          path="/profil"
          element={
           <Layout
             isSidebarVisible={isSidebarVisible}
             onMouseMove={handleMouseMove}
           >
             <Profile />
            </Layout>
          }
        />
        <Route path="/etkinlik-detayi/:id" element={<EtkinlikDetayi />} />
        <Route path="/kendi-etkinlik-detayi/:id" element={<KendiEtkinlikDetayi />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/course-edit" element={<CourseEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
