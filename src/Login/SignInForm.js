import React from "react";

const SignInForm = () => {
  return (
    <form>
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
