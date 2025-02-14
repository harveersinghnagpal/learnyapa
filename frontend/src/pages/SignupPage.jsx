import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await axios.post(
        `http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`,
        userData
      );

      if (response.status === 200 || response.status === 201) {
        const { role } = response.data;

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      alert(
        'Error: ' +
          (error.response && error.response.data.message
            ? error.response.data.message
            : 'Server error')
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-16">
        <h1 className="text-3xl font-bold mb-6">LearnHub</h1>
        <h2 className="text-2xl font-semibold mb-4">
          {isLogin ? 'Log in' : 'Sign up'}
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>
        </form>
        <p className="mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={toggleForm}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/books.jpg')` }}
      ></div>
    </div>
  );
};

export default SignupPage;
