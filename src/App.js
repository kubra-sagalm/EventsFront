import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignInForm from "./Login/SignInForm";
import SignUpForm from "./Login/SignUpForm";
import Footer from "./Footer";
import Home from "./Home"; // Ana Sayfa Bileşeni

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

  // Form geçişini yönetiyor
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        {/* Giriş ve Kayıt Sayfası */}
        <Route
          path="/"
          element={
            <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
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
                      To keep connected with us please login with your personal info
                    </p>
                    <button className="ghost" onClick={toggleForm}>
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>
                      Enter your personal details and start your journey with us
                    </p>
                    <button className="ghost" onClick={toggleForm}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          }
        />

        {/* Ana Sayfa */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
