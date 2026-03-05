import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/login-bg.jpg";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputCaptcha !== captcha) {
      alert("Invalid Captcha!");
      generateCaptcha();
      setInputCaptcha("");
      return;
    }

    localStorage.setItem("username", username);
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark + Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>

      {/* Login Card */}
      <div className="relative w-96 p-10 rounded-3xl 
                      bg-white/20 backdrop-blur-xl 
                      border border-white/30 
                      shadow-2xl z-10">

        <h2 className="text-3xl font-semibold text-white text-center mb-6 tracking-wide">
          Welcome Back 
        </h2>

        {/* Username */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/80 
                       focus:outline-none focus:ring-2 
                       focus:ring-blue-400 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/80 
                       focus:outline-none focus:ring-2 
                       focus:ring-blue-400 transition"
          />
        </div>

        {/* Captcha */}
        <div className="flex justify-between items-center mb-3">
          <div className="bg-white/80 px-4 py-2 font-bold rounded-lg tracking-widest">
            {captcha}
          </div>
          <button
            type="button"
            onClick={generateCaptcha}
            className="text-sm text-yellow-300 hover:text-yellow-400 transition"
          >
            Refresh
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter Captcha"
          required
          value={inputCaptcha}
          onChange={(e) => setInputCaptcha(e.target.value)}
          className="w-full p-3 mb-5 rounded-xl bg-white/80 
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-400 transition"
        />

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl text-white font-semibold
                     bg-gradient-to-r from-blue-500 to-indigo-600
                     hover:scale-105 hover:shadow-lg
                     transition duration-300"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center mt-5 text-sm text-gray-200">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;