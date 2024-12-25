import React from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için

const SignInForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle
    navigate("/home"); // Ana sayfaya yönlendir
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <span>or use your account</span>
      {/* Email ve Password alanlarındaki required kaldırıldı */}
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forgot your password?</a>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
