// Import necessary modules and components from external libraries and files
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/image-removebg-preview (44).png"; // Importing an image
import axios from "axios"; // Importing Axios for making HTTP requests
import { registerRoute } from "../utils/APIRoutes"; // Importing a custom API route configuration

// Define a functional component named "Register"
function Register() {
    // Create a navigation function using React Router's useNavigate hook
    const navigate = useNavigate()

    // Initialize state for form input values
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Configuration options for toast notifications
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    // useEffect hook that runs when the component mounts
   
    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form input data
        if (handleValidation()) {
            const { password, username, email } = values;
            try {
                // Send a POST request to the registration route with user data
                const { data } = await axios.post(registerRoute, {
                    username,
                    email,
                    password,
                });

                // Handle the response data
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }

                if (data.status === true) {
                    // Store user data in local storage and navigate to '/chat'
                    localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                    navigate("/chat");
                }
            } catch (error) {
                // Handle network errors or other unexpected errors here
                console.error("Error:", error);
                toast.error("An unexpected error occurred", toastOptions);
            }
        }
    };

    // Function to validate form input
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password should be the same", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal to or greater than 8 characters", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email is required", toastOptions);
            return false;
        }
        return true;
    };

    // Function to handle input changes and update state
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // Render the JSX for the component
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>SNAPIFY</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                        value={values.username}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        value={values.email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        value={values.password}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                        value={values.confirmPassword}
                    />
                    <button type="submit">CREATE USER</button>
                    <span>
                        ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

// Styled component for styling the registration form
const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(0,0,0);
background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 12%, rgba(194,8,8,1) 100%);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      margin: 0;
    }
  }

  form {
    width: 400px;
    padding: 2rem;
    background: #121313;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;

    input {
      padding: 13px;
      border: 0.15rem solid #FFFFFF;
      background-color: transparent;
      border-radius: 6px;
      color: white;
      width: 100%;
      font-size: 0.9rem;
    }
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }

    button {
      padding: 13px;
      background-color: #8B0000;
      color: white;
      border: none;
      width: 24.5vw;
      border-radius: 6px;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    button:hover {
      background-color: #002299;
      transform: scale(1.05);
    }

    span {
      color: white;
      font-size: 14px;
    }

    span a {
      color: #00ccff;
      text-decoration: none;
    }
  }
`;

export default Register;
