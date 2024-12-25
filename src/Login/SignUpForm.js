import React from "react";

const SignUpForm = () => {
  return (
    <form>
      <h2>Sign Up</h2>
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
