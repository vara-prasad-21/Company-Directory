import React from 'react';
import { motion } from 'framer-motion';

export default function Filters({ filters, setFilters, locations, industries }) {
  const onChange = (e) => setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6 p-4 bg-white rounded-2xl shadow-lg border border-blue-200"
    >
      {/* Search + Location + Industry */}
      <div className="flex gap-3 flex-1">
        <input
          name="q"
          value={filters.q}
          onChange={onChange}
          placeholder="Search company name..."
          className="flex-1 px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
        />

        <select
          name="location"
          value={filters.location}
          onChange={onChange}
          className="px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
        >
          <option value="">All Locations</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <select
          name="industry"
          value={filters.industry}
          onChange={onChange}
          className="px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
        >
          <option value="">All Industries</option>
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {/* Sort + Page Size */}
      <div className="flex gap-2">
        <select
          name="sort"
          value={filters.sort}
          onChange={onChange}
          className="px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
        >
          <option value="name_asc">Name A → Z</option>
          <option value="name_desc">Name Z → A</option>
        </select>

        <select
          name="pageSize"
          value={filters.pageSize}
          onChange={onChange}
          className="px-4 py-2 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition"
        >
          <option value={6}>6 / page</option>
          <option value={9}>9 / page</option>
          <option value={12}>12 / page</option>
        </select>
      </div>
    </motion.div>
  );
}
