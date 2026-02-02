import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navbar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-6 border-b border-gray-700">
          Dashboard
        </h1>

        <div className="flex flex-col gap-3 p-4">
          <Link to="/addnote"> <button className="bg-blue-600 hover:bg-blue-700 py-2 rounded">
            Add Notes
          </button></Link>
          <Link to="/getnotes">
            <button className="bg-green-600 hover:bg-green-700 py-2 rounded">
              Show All Notes
            </button></Link>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          Welcome to Dashboard
        </h2>
      </div>
    </div>
  );
};

export default Dashboard;
