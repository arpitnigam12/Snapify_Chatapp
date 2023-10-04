// Import necessary modules and components from external libraries and files
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/image-removebg-preview (45).png"; // Importing an image
import axios from "axios"; // Importing Axios for making HTTP requests
import { loginRoute } from "../utils/APIRoutes"; // Importing a custom API route configuration

// Define a functional component named "Login"
function Login() {
    // Create a navigation function using React Router's useNavigate hook
    const navigate = useNavigate()

    // Initialize state for form input values
    const [values, setValues] = useState({
        username: "",
        password: "",
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
    useEffect(() => {
        // Check if there is a user in local storage and navigate to '/chat' if found
        if (localStorage.getItem('chat-app-user')) {
            navigate('/chat')
        }
    }, [])

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        // Validate form input data
        if (handleValidation()) {
          const { password, username } = values;
          try {
            // Send a POST request to the login route with user data
            const { data } = await axios.post(loginRoute, {
              username,
              password,
            });
      
            // Handle the response data
            if (data.status === false) {
              toast.error(data.msg, toastOptions);
            }
      
            if (data.status === true) {
              // Store user data in local storage and navigate to '/chat'
              localStorage.setItem('chat-app-user', JSON.stringify(data.user));
              navigate("/chat");
            }
          } catch (error) {
            // Handle network errors or other unexpected errors here
            console.error('Error:', error);
            toast.error('An unexpected error occurred', toastOptions);
          }
        }
      };
      
    // Function to handle input validation
    const handleValidation = () => {
        const { password,username } = values;
        if (password === "") {
            toast.error("Username and Password are required", toastOptions);
            return false;
        } else if (username === "") {
            toast.error("Username and Password are required", toastOptions);
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
                        min="3"
                    />
                   
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        value={values.password}
                    />
                   
                    <button type="submit">Login</button>
                    <span>
                        DON'T HAVE AN ACCOUNT? <Link to="/register">REGISTER</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

// Styled component for styling the login form
const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #000000 0%, #0033cc 100%);

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
      border: 0.15rem solid #0033cc;
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
      background-color: #0033cc;
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

export default Login;

