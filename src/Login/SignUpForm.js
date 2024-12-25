import React from "react";


const SignUpForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <span>or use your email for registration</span>
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <input type="password" placeholder="Confirm Password" required />
      <input type="text" placeholder="Phone Number" required />
      <input type="number" placeholder="Age" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
