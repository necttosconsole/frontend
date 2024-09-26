import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    setMessage('A password reset link has been sent to your email.');
    setErrorMessage('');
    console.log('Password reset email sent to:', email);
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative" 
      style={{ 
        backgroundImage: `url(https://img.pikbest.com/wp/202346/hang-tag-a-sale-sign-in-3d-accompanied-by-shopping-bags-and-hanging-tags-on-vibrant-red-background_9732539.jpg!w700wp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>

      <div className="relative z-10 bg-white bg-opacity-20 p-10 rounded-3xl shadow-lg w-full max-w-md backdrop-blur-lg border border-gray-200">
        <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Forgot Password?
        </h2>
        <p className="text-gray-200 text-center mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {/* Success or error message */}
        {message && (
          <div className="mb-4 text-green-400 text-center animate-pulse">
            <p>{message}</p>
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-400 text-center">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-100" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-900 bg-opacity-50 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              required
            />
          </div>

          <button
  type="submit"
  className="w-full bg-gradient-to-r from-red-600 to-black text-white py-3 rounded-lg shadow-md hover:from-red-700 hover:to-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-white"
>
  Send Reset Link
</button>

        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
