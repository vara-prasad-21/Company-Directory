import React from "react";
import { motion } from "framer-motion";

export default function Pagination({ total, page, setPage, pageSize }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 mt-6 justify-center">
      {/* Prev Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
      >
        Prev
      </motion.button>

      {/* Page Numbers */}
      {pages.map((pn) => (
        <motion.button
          key={pn}
          whileHover={{ scale: 1.1 }}
          onClick={() => setPage(pn)}
          className={`px-4 py-2 rounded-lg font-semibold transition 
            ${
              pn === page
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
            }`}
        >
          {pn}
        </motion.button>
      ))}

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
      >
        Next
      </motion.button>
    </div>
  );
}
