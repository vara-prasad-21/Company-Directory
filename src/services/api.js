export async function fetchCompanies() {
  const res = await fetch('/companies.json');
  if (!res.ok) throw new Error('Failed to load companies');
  return res.json();
}
