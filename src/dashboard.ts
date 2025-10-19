import React, { useState } from "react";
import Filters from "./Filters";
import CompanyList from "./CompanyList";
import Pagination from "./Pagination";

export default function Dashboard({ onLogout }) {
  const [filters, setFilters] = useState({
    q: "",
    location: "",
    industry: "",
    sort: "name_asc",
    pageSize: 6,
  });

  const [companies, setCompanies] = useState([]); // You can fetch from API or JSON
  const [page, setPage] = useState(1);

  const locations = ["New York", "San Francisco", "London"];
  const industries = ["Tech", "Finance", "Healthcare", "Retail"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Company Directory</h1>
        <button
          onClick={onLogout}
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"
        >
          Logout
        </button>
      </div>

      <Filters
        filters={filters}
        setFilters={setFilters}
        locations={locations}
        industries={industries}
      />

      <CompanyList companies={companies} viewMode="cards" />

      <Pagination
        total={companies.length}
        page={page}
        setPage={setPage}
        pageSize={filters.pageSize}
      />
    </div>
  );
}
