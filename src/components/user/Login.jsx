// Login.js
import React, { Children, useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebaseConfic";
import { Form, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      localStorage.setItem("idToken", userCredential._tokenResponse.idToken);
      await localStorage.setItem("isLoggedIn", "true");
      await localStorage.setItem("id", userCredential.user.uid);
      await localStorage.setItem("LoadData", false);

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="/register">Register ?</a>',
      });
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="w-75 mx-auto">
      <h2>Login</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="d-flex">
        <Button variant="success" className="me-2" onClick={handleLogin}>
          Login
        </Button>
        <Link to={"/register"}>
          <Button variant="warning">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
