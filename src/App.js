import React, { useState } from "react";
import "./App.css";
import SignInForm from "./Login/SignInForm";
import SignUpForm from "./Login/SignUpForm";

function App() {
  const [isSignUp, setIsSignUp] = useState(true); // Kullanıcı hangi formu görmek istiyorsa

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Form geçişini kontrol eden state
  };

  return (
    <div className="container">
      <div className={`form-container ${isSignUp ? '' : 'right-panel-active'}`}>
        <div className={`sign-in-container ${isSignUp ? 'right-panel-active' : ''}`}>
          <SignInForm />
        </div>
        <div className={`sign-up-container ${isSignUp ? '' : 'right-panel-active'}`}>
          <SignUpForm />
        </div>
      </div>

      <div className={`overlay-container ${isSignUp ? '' : 'right-panel-active'}`}>
        <div className={`overlay ${isSignUp ? '' : 'right-panel-active'}`}>
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
