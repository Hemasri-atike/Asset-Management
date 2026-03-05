

function Analytics() {
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="flex h-screen">
     

      <div className="flex-1 flex flex-col">
       

        <div className="p-8 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-6">Analytics</h1>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-3xl font-bold text-blue-600">1,245</h2>
              <p className="text-gray-600 mt-2">Total Users</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-3xl font-bold text-green-600">875</h2>
              <p className="text-gray-600 mt-2">Active Users</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-3xl font-bold text-purple-600">320</h2>
              <p className="text-gray-600 mt-2">New Signups</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;