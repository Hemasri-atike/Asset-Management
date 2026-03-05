

function Careers() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div>
   

      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Careers</h1>

        <div className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-xl font-semibold mb-2">
            Frontend Developer
          </h2>
          <p className="text-gray-600 mb-2">
            Experience: 0-2 years
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Careers;