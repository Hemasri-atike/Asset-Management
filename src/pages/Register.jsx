import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/login-bg.jpg"; // same background as login

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user (basic demo)
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    alert("Registration Successful!");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>

      {/* Register Card */}
      <div className="relative w-96 p-10 rounded-3xl 
                      bg-white/20 backdrop-blur-xl 
                      border border-white/30 
                      shadow-2xl z-10">

        <h2 className="text-3xl font-semibold text-white text-center mb-6 tracking-wide">
          Create Account ✨
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-white/80 
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-400 transition"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-white/80 
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-400 transition"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-white/80 
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-400 transition"
        />

        {/* Register Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl text-white font-semibold
                     bg-gradient-to-r from-green-500 to-emerald-600
                     hover:scale-105 hover:shadow-lg
                     transition duration-300"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center mt-5 text-sm text-gray-200">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;