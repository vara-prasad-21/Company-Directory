import React from 'react';
import { motion } from 'framer-motion';

export default function CompanyCard({ c }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-primary p-5 border border-blue-300 shadow-lg hover:shadow-2xl transition-transform duration-300"
    >
      <h3 className="text-lg font-bold text-white mb-2">{c.name}</h3>
      <p className="text-sm text-secondary mb-1">{c.industry} • {c.location}</p>
      <div className="mt-2 text-sm text-white">
        Employees: <span className="font-medium">{c.employees}</span>
      </div>
    </motion.div>
  );
}
