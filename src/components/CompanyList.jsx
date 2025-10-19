import React from 'react';
import CompanyCard from './CompanyCard';

export default function CompanyList({ companies, viewMode }) {
  if (!companies.length)
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        No companies found.
      </div>
    );

  return (
    <div>
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c) => (
            <CompanyCard key={c.id} c={c} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-blue-200 shadow-lg">
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Industry</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Employees</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c, i) => (
                <tr
                  key={c.id}
                  className={`${
                    i % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                  } hover:bg-secondary hover:text-white transition`}
                >
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3">{c.industry}</td>
                  <td className="p-3">{c.location}</td>
                  <td className="p-3">{c.employees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
