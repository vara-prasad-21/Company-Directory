import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { fetchCompanies } from "./services/api";
import Filters from "./components/Filters";
import CompanyList from "./components/CompanyList";
import Pagination from "./components/Pagination";
import { motion } from "framer-motion";

// Theme Colors
const primary = "text-blue-800";
const secondary = "bg-yellow-500 hover:bg-yellow-400 text-white";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 relative">
      <motion.div className="relative z-10 bg-white bg-opacity-90 rounded-2xl p-10 max-w-md w-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${primary}`}>Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition" required />
          <button type="submit" className={`mt-4 px-4 py-2 rounded-lg font-semibold transition ${secondary}`}>Login</button>
        </form>
      </motion.div>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); alert("Registered Successfully!"); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 relative">
      <motion.div className="relative z-10 bg-white bg-opacity-90 rounded-2xl p-10 max-w-md w-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${primary}`}>Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
            className="px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
            className="px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
            className="px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition" required />
          <button type="submit" className={`mt-4 px-4 py-2 rounded-lg font-semibold transition ${secondary}`}>Register</button>
        </form>
      </motion.div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ q: '', location: '', industry: '', sort: 'name_asc', page: 1, pageSize: 6 });
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCompanies()
      .then(d => { if (mounted) { setData(d); setError(null); } })
      .catch(err => { if (mounted) setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => mounted = false;
  }, []);

  const locations = useMemo(() => Array.from(new Set(data.map(d => d.location))).sort(), [data]);
  const industries = useMemo(() => Array.from(new Set(data.map(d => d.industry))).sort(), [data]);

  const filtered = useMemo(() => {
    let list = data.slice();
    if (filters.q) list = list.filter(c => c.name.toLowerCase().includes(filters.q.toLowerCase()));
    if (filters.location) list = list.filter(c => c.location === filters.location);
    if (filters.industry) list = list.filter(c => c.industry === filters.industry);
    if (filters.sort === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name));
    if (filters.sort === 'name_desc') list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [data, filters.q, filters.location, filters.industry, filters.sort]);

  const total = filtered.length;
  const pageSize = Number(filters.pageSize);
  const page = Number(filters.page);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => { setFilters(f => ({ ...f, page: 1 })); }, [filters.q, filters.location, filters.industry, filters.sort, filters.pageSize]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      <motion.header className="bg-gradient-to-r from-blue-700 to-yellow-400 text-white py-8 shadow-lg mb-6"
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <h1 className="text-3xl font-bold tracking-wide">{`Company Directory`}</h1>
          <div className="flex gap-3 mt-3 md:mt-0">
            <button onClick={() => setViewMode('cards')} className={`px-4 py-2 rounded-full text-sm font-medium transition ${viewMode === 'cards' ? 'bg-white text-blue-700 shadow' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>Card View</button>
            <button onClick={() => setViewMode('table')} className={`px-4 py-2 rounded-full text-sm font-medium transition ${viewMode === 'table' ? 'bg-white text-blue-700 shadow' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>Table View</button>
            <button onClick={onLogout} className="px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-medium transition">Logout</button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-6">
        <Filters filters={filters} setFilters={setFilters} locations={locations} industries={industries} />

        {loading && <div className="p-8 text-center text-blue-700 animate-pulse">Loading companies...</div>}
        {error && <div className="p-6 text-red-600 text-center">Error: {error}</div>}

        {!loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <CompanyList companies={paged} viewMode={viewMode} />
            <Pagination total={total} page={page} setPage={(p) => setFilters(f => ({ ...f, page: p }))} pageSize={pageSize} />
            <div className="mt-4 text-sm text-gray-700 text-center">Showing {paged.length} of {total} companies</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Main App with Router and Auth
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
