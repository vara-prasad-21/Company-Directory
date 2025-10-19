import React, { useEffect, useMemo, useState } from "react";
import { fetchCompanies } from "../services/api";
import Filters from "../components/Filters";
import CompanyList from "../components/CompanyList";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";

export default function Dashboard({ onLogout }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ q: "", location: "", industry: "", sort: "name_asc", page: 1, pageSize: 6 });
  const [viewMode, setViewMode] = useState("cards");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCompanies()
      .then((d) => {
        if (mounted) {
          setData(d);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  const locations = useMemo(() => Array.from(new Set(data.map((d) => d.location))).sort(), [data]);
  const industries = useMemo(() => Array.from(new Set(data.map((d) => d.industry))).sort(), [data]);

  const filtered = useMemo(() => {
    let list = data.slice();
    if (filters.q) list = list.filter((c) => c.name.toLowerCase().includes(filters.q.toLowerCase()));
    if (filters.location) list = list.filter((c) => c.location === filters.location);
    if (filters.industry) list = list.filter((c) => c.industry === filters.industry);
    if (filters.sort === "name_asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (filters.sort === "name_desc") list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [data, filters.q, filters.location, filters.industry, filters.sort]);

  const total = filtered.length;
  const pageSize = Number(filters.pageSize);
  const page = Number(filters.page);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    setFilters((f) => ({ ...f, page: 1 }));
  }, [filters.q, filters.location, filters.industry, filters.sort, filters.pageSize]);

  return (
    <div
      className="min-h-screen font-sans bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Overlay for transparency */}
      <div className="min-h-screen bg-white bg-opacity-80 backdrop-blur-sm">
        {/* Header */}
        <motion.header
          className="bg-gradient-to-r from-blue-700 to-yellow-400 text-white py-8 shadow-lg mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <h1 className="text-3xl font-bold tracking-wide">Company Directory</h1>
            <div className="flex gap-3 mt-3 md:mt-0">
              <button
                onClick={() => setViewMode("cards")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  viewMode === "cards" ? "bg-white text-blue-700 shadow" : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  viewMode === "table" ? "bg-white text-blue-700 shadow" : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                Table View
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.header>

        {/* Filters */}
        <div className="max-w-6xl mx-auto px-6">
          <Filters filters={filters} setFilters={setFilters} locations={locations} industries={industries} />

          {/* Loading/Error */}
          {loading && <div className="p-8 text-center text-blue-700 animate-pulse">Loading companies...</div>}
          {error && <div className="p-6 text-red-600 text-center">Error: {error}</div>}

          {/* Company List */}
          {!loading && !error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <CompanyList companies={paged} viewMode={viewMode} />
              <Pagination
                total={total}
                page={page}
                setPage={(p) => setFilters((f) => ({ ...f, page: p }))}
                pageSize={pageSize}
              />
              <div className="mt-4 text-sm text-gray-700 text-center">
                Showing {paged.length} of {total} companies
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
