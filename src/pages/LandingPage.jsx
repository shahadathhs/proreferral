import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
import Search from "../components/Search";

export default function LandingPage() {
  return (
    <div>
      <Helmet>
        <title>Landing Page | ProReferral</title>
      </Helmet>
      <header className="bg-blue-600 text-white p-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to ProReferral</h1>
          <p className="mt-4 text-lg">Connecting job seekers with the right opportunities.</p>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4 max-w-sm px-10 mx-auto">Find Perfect Company for Your Job</h2>
          <Search />
        </section>

        <section className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Use ProReferral?</h2>
          <ul className="list-disc list-inside">
            <li>Request referrals from multiple companies</li>
            <li>Access services like resume reviews and career guidance</li>
            <li>Connect with industry professionals</li>
          </ul>
        </section>

        {/* <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <div>
            <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded mx-2">Sign Up</Link>
            <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded mx-2">Log In</Link>
          </div>
        </section> */}
      </main>
    </div>
  )
}
