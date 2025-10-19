import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered Successfully!");
    // Here you can connect your backend API
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
            required
          />
          <button
            type="submit"
            className="bg-secondary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary transition"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}
