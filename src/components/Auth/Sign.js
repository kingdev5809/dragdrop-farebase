import React, { useEffect, useState } from "react";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import './style.css'

function Sign() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: userName });
    } catch (error) {
      console.log(error.message);
    }
    navigate("/home");
  };

  return (
    <section className="login-container">
      <article className="form-container">
        <div className="intro">
          <h1>Welcome </h1>
          <p>Welcome our web site, can you sing up there</p>
        </div>

        <form onSubmit={onSubmit} className="form">
          <div className="email-input">
            <span className="material-icons-round icon-size">
              {" "}
              <FontAwesomeIcon icon={faUser} />{" "}
            </span>
            <span id="seperator"></span>
            <div className="input-container">
              <p className="sub-title">User Name</p>
              <input
                type="text"
                name="username"
                id="name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="email-input">
            <span className="material-icons-round icon-size">
              {" "}
              <FontAwesomeIcon icon={faEnvelope} />{" "}
            </span>
            <span id="seperator"></span>
            <div className="input-container">
              <p className="sub-title">Email Address</p>
              <input
                type="email"
                name="usermail"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="email-input">
            <span className="material-icons-round icon-size">
              {" "}
              <FontAwesomeIcon icon={faLock} />{" "}
            </span>
            <span id="seperator"></span>
            <div className="input-container">
              <p className="sub-title">Password</p>
              <input
                type="password"
                name="userpass"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button id="submit">Continue</button>
        </form>

        <article className="outro">
          <div className="router">
            Already have an account? <Link to="/"> Login</Link>
          </div>
          <div className="ending">
            <p>Or Continue With</p>
          </div>

          <div className="socials">
            <a className="social-btn" href="/" id="g-btn">
              <p>Google</p>
            </a>
            <a className="social-btn" href="/" id="a-btn">
              <p>Apple</p>
            </a>
            <a className="social-btn" href="/" id="fb-btn">
              <p>Facebook</p>
            </a>
          </div>
        </article>
      </article>
      <article className="login-side-bg"></article>
    </section>
  );
}

export default Sign;
