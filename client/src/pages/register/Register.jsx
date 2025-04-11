import "./register.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword((prev) => passwordRef.current.value);
    setUsername((prev) => usernameRef.current.value);
    try {
      await axios.post("/api/auth/register", {
        email,
        password: passwordRef.current.value,
        username: usernameRef.current.value,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <p className="logo">T3V</p>
          <button onClick={() => navigate("/login")} className="loginButton">
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <div className="intro">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership
          </p>
        </div>
        {!email ? (
          <div className="input">
            <input ref={emailRef} type="email" placeholder="Email address" />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input ref={usernameRef} type="text" placeholder="username" />
            <input ref={passwordRef} type="password" placeholder="password" />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
