import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

export default function CandidateHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const mockReferralList = [
    {
      id: 1,
      companyName: "Google Inc",
      industry: "Technology",
      location: "Mountain View, CA",
      employees: 150000,
    },
    {
      id: 2,
      companyName: "Apple Inc",
      industry: "Technology",
      location: "Cupertino, CA",
      employees: 160000,
    },
    {
      id: 3,
      companyName: "Microsoft Corporation",
      industry: "Technology",
      location: "Redmond, WA",
      employees: 170000,
    },
    {
      id: 4,
      companyName: "Amazon.com Inc",
      industry: "Technology",
      location: "Seattle, WA",
      employees: 1200000,
    },
    {
      id: 5,
      companyName: "Facebook, Inc.",
      industry: "Technology",
      location: "Menlo Park, CA",
      employees: 60000,
    },
  ];

  const mockServicesList = [
    {
      id: 1,
      serviceName: "Resume Review",
      description: "Professional review and enhancement of resumes.",
    },
    {
      id: 2,
      serviceName: "Interview Preparation",
      description: "Customized coaching and preparation for job interviews.",
    },
    {
      id: 3,
      serviceName: "Career Guidance",
      description: "Personalized advice and guidance for career advancement.",
    },
    {
      id: 4,
      serviceName: "Mock Interviews",
      description: "Simulated practice interviews with feedback.",
    },
    {
      id: 5,
      serviceName: "Job Application Support",
      description: "Assistance with job application strategies and materials.",
    },
  ];

  const handleSearch = () => {
    const filteredReferrals = mockReferralList.filter((referral) =>
      referral.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredServices = mockServicesList.filter((service) =>
      service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults([...filteredReferrals, ...filteredServices]);
  };

  // Function to handle logout (example)
  const { logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful!");
      })
      .catch(() => {
        toast.error("An error happened!");
      });
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Candidate Home | ProReferral</title>
      </Helmet>
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Candidate Home</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Search Component */}
      <div className="mb-4 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by referral or service..."
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold mb-2">Search Results</h2>
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="border p-2 mb-2 rounded max-w-sm mx-auto"
            >
              {result.companyName ? (
                <>
                  <h3 className="font-bold">{result.companyName}</h3>
                  <p>Industry: {result.industry}</p>
                  <p>Location: {result.location}</p>
                  <p>Employees: {result.employees}</p>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{result.serviceName}</h3>
                  <p>Description: {result.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Referral List */}
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Referral List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-4 ">
          {mockReferralList.map((referral) => (
            <div key={referral.id} className="border p-2 mb-2 rounded ">
              <h3 className="font-bold">{referral.companyName}</h3>
              <p>Industry: {referral.industry}</p>
              <p>Location: {referral.location}</p>
              <p>Employees: {referral.employees}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Services List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-4 ">
          {mockServicesList.map((service) => (
            <div key={service.id} className="border p-2 mb-2 rounded">
              <h3 className="font-bold">{service.serviceName}</h3>
              <p>Description: {service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
