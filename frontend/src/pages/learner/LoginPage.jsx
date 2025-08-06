import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [butterflies, setButterflies] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roleToDashboard = {
    admin: '/faculty/dashboard',
    faculty: '/faculty/dashboard',
    educator: '/faculty/dashboard',
    announcer: '/faculty/dashboard',
    contentHead: '/faculty/dashboard',
    learner: '/dashboard',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/auth/login', { email, password }); // ✅ Using axiosInstance
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);

      const route = roleToDashboard[user.role] || '/unauthorized';
      navigate(route);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const id = Date.now();
      const newButterfly = {
        id,
        left: Math.random() * 90,
        bottom: -20,
        size: 48 + Math.random() * 24,
        duration: Math.max(3, 10 - score * 0.3),
      };
      setButterflies((prev) => [...prev.slice(-10), newButterfly]);
      setTimeout(() => {
        setButterflies((prev) => prev.filter((b) => b.id !== id));
      }, newButterfly.duration * 1000);
    }, Math.max(800, 2000 - score * 100));

    return () => clearInterval(spawnInterval);
  }, [score]);

  const catchButterfly = (id) => {
    setScore((s) => s + 1);
    setButterflies((prev) => prev.filter((b) => b.id !== id));
  };

  const handleMiss = (e) => {
    if (e.target.dataset.butterfly !== 'true') {
      if (score > 0) {
        setHighScore((prev) => Math.max(prev, score));
        setScore(0);
      }
    }
  };

  return (
    <div
      onClick={handleMiss}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-rose-300 to-pink-400 overflow-hidden"
    >
      {/* 🦋 Butterfly Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {butterflies.map((b) => (
          <div
            key={b.id}
            data-butterfly="true"
            onClick={(e) => {
              e.stopPropagation();
              catchButterfly(b.id);
            }}
            className="absolute pointer-events-auto animate-float"
            style={{
              left: `${b.left}%`,
              bottom: `${b.bottom}px`,
              animationDuration: `${b.duration}s`,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: `${b.size}px`,
                opacity: 0.5,
                mixBlendMode: 'multiply',
              }}
            >
              <path d="M50 50 C30 20, 10 40, 30 60" fill="#be185d" stroke="#9d174d" strokeWidth="1" />
              <path d="M50 50 C25 60, 25 80, 40 70" fill="#9f1239" stroke="#9d174d" strokeWidth="1" />
              <path d="M50 50 C70 20, 90 40, 70 60" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
              <path d="M50 50 C75 60, 75 80, 60 70" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1" />
              <rect x="48.5" y="45" width="3" height="10" rx="1.5" fill="#1f2937" />
              <line x1="50" y1="45" x2="47" y2="40" stroke="#1f2937" strokeWidth="1" />
              <line x1="50" y1="45" x2="53" y2="40" stroke="#1f2937" strokeWidth="1" />
              <circle cx="49" cy="47" r="0.6" fill="#fff" />
              <circle cx="51" cy="47" r="0.6" fill="#fff" />
            </svg>
          </div>
        ))}
      </div>

      {/* 🔐 Login Form */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-700 space-y-1">
          <p>🦋 Score: <span className="font-bold">{score}</span></p>
          <p>🏆 High Score: <span className="font-bold">{highScore}</span></p>
        </div>
      </div>

      {/* 🦋 Float Animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: 1;
        }
      `}</style>
    </div>
  );
}