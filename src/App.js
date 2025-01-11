import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignInForm from "./Login/SignInForm";
import SignUpForm from "./Login/SignUpForm";
import Footer from "./Footer";
import Home from "./Home";
import BenimEtkinliklerim from "./pages/BenimEtkinliklerim";
import Layout from "./components/Layout";
import EventCreation from "./pages/EventCreation"; // EventCreation bileşeni import edildi

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
        {/* Giriş ve Kayıt Sayfası */}
        <Route
          path="/"
          element={
            <div
              className={`container ${
                isSidebarVisible ? "right-panel-active" : ""
              }`}
            >
              <div className="form-container sign-up-container">
                <SignUpForm />
              </div>
              <div className="form-container sign-in-container">
                <SignInForm />
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button
                      className="ghost"
                      onClick={() => setSidebarVisible(false)}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>
                      Enter your personal details and start your journey with
                      us
                    </p>
                    <button
                      className="ghost"
                      onClick={() => setSidebarVisible(false)}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          }
        />

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
      </Routes>
    </Router>
  );
}

export default App;
