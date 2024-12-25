import React, { useState } from "react";
import "./App.css";
import SignInForm from "./Login/SignInForm";
import SignUpForm from "./Login/SignUpForm";
import Footer from "./Footer";

function App() {
  const [isSignUp, setIsSignUp] = useState(false); // Varsayılan olarak Sign In formu açık

  // Form geçişini yönetiyor
  const toggleForm = () => {
    setIsSignUp((prev) => !prev); // State'i değiştirir (Sign In -> Sign Up veya tersi)
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <SignUpForm />
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <SignInForm />
      </div>

      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          {/* Sign In Panel */}
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={toggleForm}>
              Sign In
            </button>
          </div>

          {/* Sign Up Panel */}
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
