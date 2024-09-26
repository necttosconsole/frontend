import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif';
import SummaryApi from '../common';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState({
    email: "",
    password: ""
  });
   const navigate =useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setErrorMessage("Email and password are required.");
      return;
    }
  
    try {
      console.log(SummaryApi.singIn.url,  data, SummaryApi.singIn.method,);
      
      const dataResponse = await fetch(SummaryApi.singIn.url, {
        method: SummaryApi.singIn.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const dataApi = await dataResponse.json();
      console.log(dataApi);

      if (dataApi.data) {
        console.log('we are pressed/');
        console.log(dataApi.success);
        navigate('/Home');

      } else {
        console.log(dataApi.message);
        
        setErrorMessage(dataApi.message || "Login failed");
        
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  
    setIsSubmitted(true);
    setErrorMessage('');
  };
  

  return (
    <section 
      id='login' 
      className='min-h-screen flex items-center justify-center relative' 
      style={{ 
        backgroundImage: `url(https://img.freepik.com/premium-photo/shopping-cart-with-bunch-hearts-it_137441-12893.jpg)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      {/* Red Overlay for the stylish effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>
      
      <div className='p-8 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 border border-gray-200 backdrop-blur-xl' 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
        
        {/* <div className='w-24 h-24 mx-auto mb-6 rounded-full'>
          <img src={loginIcons} alt='login icon' 
            className='w-full h-full object-contain animate-bounce rounded-full' />
        </div> */}

        <h2 className='text-white text-3xl text-center mb-4 font-extrabold'>
          Welcome Back!
        </h2>
        <p className='text-gray-300 text-center mb-6'>
          Log in to your account to continue.
        </p>

        {isSubmitted && (
          <div className='mb-4 text-green-400 text-center animate-pulse'>
            <p>Login successful!</p>
          </div>
        )}
        {errorMessage && (
          <div className='mb-4 text-red-400 text-center'>
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='relative z-10'>
          <div className='mb-6'>
            <label className='block text-gray-200 text-sm font-semibold mb-2'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={data.email}
              onChange={handleOnChange}
              className='w-full px-4 py-2 bg-gray-900 bg-opacity-60 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300'
              required
            />
          </div>

          <div className='mb-6 relative'>
            <label className='block text-gray-200 text-sm font-semibold mb-2'>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              name='password'
              value={data.password}
              onChange={handleOnChange}
              className='w-full px-4 py-2 bg-gray-900 bg-opacity-60 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300'
              required
            />
            
            <button
              type='button'
              className='absolute inset-y-0 right-0 flex items-center pr-3'
              onClick={handleTogglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-400 w-5 h-5 transition duration-300 hover:text-white" />
              ) : (
                <FaEye className="text-gray-400 w-5 h-5 transition duration-300 hover:text-white" />
              )}
            </button>
          </div>
          
          <div className='flex justify-end w-full mb-2'>
            <Link to='/forgot-password' className='text-gray-300 hover:text-white transition duration-200 underline'>
              Forgot Password?
            </Link>
          </div>

          <div className='mb-4'>
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-red-600 to-black text-white py-3 px-4 rounded-lg shadow-md hover:bg-gradient-to-l hover:from-red-700 hover:to-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white'
            >
              Login
            </button>
            <p className='my-2 text-center text-gray-300'>
              Don't have an account? 
              <Link 
                to="/sign-up" 
                className='text-red-100 underline font-bold hover:text-white transition-all duration-300'
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
