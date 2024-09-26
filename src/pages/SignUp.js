import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate =useNavigate()

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageBase64 = await imageToBase64(file);
      setImageBase64(imageBase64);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      console.log({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        image: imageBase64,
      });
      
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          image: imageBase64,
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Account created successfully!");
        
        setErrorMessage("");
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setSelectedImage(null);
        navigate('/login');
      } else {
        setErrorMessage("Failed to create account.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "An error occurred while creating the account."
      );
      setSuccessMessage("");
    }
  };

  return (
    <section 
      id="signup" 
      className="min-h-screen flex items-center justify-center relative" 
      style={{ 
        backgroundImage: `url(https://img.freepik.com/premium-photo/shopping-cart-with-many-hearts-back_1034910-38356.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>
      
      <div className="p-8 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 border border-gray-200 backdrop-blur-xl" 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
        
        <h2 className="text-white text-3xl text-center mb-4 font-extrabold">
          Create an Account
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-400 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-400 text-center">
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 bg-gray-900 bg-opacity-60 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-2 bg-gray-900 bg-opacity-60 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-900 bg-opacity-60 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-900 bg-opacity-60 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-400 w-5 h-5 transition duration-300 hover:text-white" />
              ) : (
                <FaEye className="text-gray-400 w-5 h-5 transition duration-300 hover:text-white" />
              )}
            </button>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 bg-gray-900 bg-opacity-60 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-400 w-5 h-5 transition duration-300 hover:text-white" />
              ) : (
                <FaEye className="text-gray-400 w-5 h-5 transition duration-300 hover:text-white" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-black text-white py-3 px-4 rounded-lg shadow-md hover:bg-gradient-to-l hover:from-red-700 hover:to-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Sign Up
          </button>

          <p className="my-2 text-center text-gray-300">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-red-100 underline font-bold hover:text-white transition-all duration-300"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
