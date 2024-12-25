import React from "react";


const SignInForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <span>or use your account</span>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <a href="#">Forgot your password?</a>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
