import { useState, useEffect } from "react";

export default function Search() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [results, setResults] = useState(null);
  const [companyDropdownVisible, setCompanyDropdownVisible] = useState(false);
  const [industryDropdownVisible, setIndustryDropdownVisible] = useState(false);
  const [filteredCompanyNames, setFilteredCompanyNames] = useState([]);
  const [filteredIndustries, setFilteredIndustries] = useState([]);

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
    let filteredResults = [...allCompanies];

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
    setCompanyDropdownVisible(false);
    setIndustryDropdownVisible(false);
  };

  const handleCompanyNameChange = (e) => {
    const value = e.target.value;
    setCompanyName(value);

    if (value.trim() !== "") {
      setFilteredCompanyNames(allCompanies.filter(company =>
        company.name.toLowerCase().includes(value.toLowerCase())
      ));
      setCompanyDropdownVisible(true);
    } else {
      setCompanyDropdownVisible(false);
    }
  };

  const handleIndustryChange = (e) => {
    const value = e.target.value;
    setIndustry(value);

    if (value.trim() !== "") {
      const industries = allCompanies
        .filter(company => company.industry.toLowerCase().includes(value.toLowerCase()))
        .map(company => company.industry);

      setFilteredIndustries([...new Set(industries)]); // Extract unique industry names
      setIndustryDropdownVisible(true);
    } else {
      setIndustryDropdownVisible(false);
    }
  };

  const handleDropdownClick = (value, field) => {
    if (field === 'company') {
      setCompanyName(value);
      setCompanyDropdownVisible(false);
    } else if (field === 'industry') {
      setIndustry(value);
      setIndustryDropdownVisible(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
            placeholder="Search by company name..."
            className="border p-2 rounded w-full"
          />
          {companyDropdownVisible && filteredCompanyNames.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto z-10">
              {filteredCompanyNames.map(company => (
                <li
                  key={company.id}
                  onClick={() => handleDropdownClick(company.name, 'company')}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            value={industry}
            onChange={handleIndustryChange}
            placeholder="Search by industry..."
            className="border p-2 rounded w-full"
          />
          {industryDropdownVisible && filteredIndustries.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto z-10">
              {filteredIndustries.map((industryName, index) => (
                <li
                  key={index}
                  onClick={() => handleDropdownClick(industryName, 'industry')}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {industryName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Search
        </button>
      </form>

      {results !== null && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Search Results:</h3>
          {results.length > 0 ? (
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
          ) : (
            <p className="text-center text-red-600">No matching results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
