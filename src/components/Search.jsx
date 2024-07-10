import { useState, useEffect } from "react";

export default function Search() {
  const [allCompanies, setAllCompanies] = useState([]);
  console.log(allCompanies)
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch('/Companies.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => setAllCompanies(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredResults = [...allCompanies]; // Create a copy of allCompanies array

    if (companyName.trim() !== "") {
      filteredResults = filteredResults.filter(company =>
        company.name.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    if (industry.trim() !== "") {
      filteredResults = filteredResults.filter(company =>
        company.industry.toLowerCase().includes(industry.toLowerCase())
      );
    }

    setResults(filteredResults);
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Search by company name..."
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Search by industry..."
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Search
        </button>
      </form>

      {results && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Search Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-4">
            {results.map(company => (
              <div key={company.id} className="border p-4 rounded shadow-lg">
                <h4 className="font-bold">{company.name}</h4>
                <p>Industry: {company.industry}</p>
                <p>Location: {company.location}</p>
                <p>Employees: {company.employees}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
