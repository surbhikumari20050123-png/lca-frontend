import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LCASetup from "./pages/LCASetup";
import Visualizations from "./pages/Visualizations";
import Comparisons from "./pages/Comparisons";
import Reports from "./pages/Reports";
import NotFound from "./components/NotFound";

function App() {
  const [result, setResult] = useState(null);
  const [userRole, setUserRole] = useState("metallurgist"); // Default role

  const handlePredict = async (data) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          energy_use: data.energy_use,
          recycled_content: data.recycled_content,
          material_type: data.material_type,
          route: data.route,
          energy_source: data.energy_source,
          transport_mode: data.transport_mode,
          end_of_life: data.end_of_life,
          quantity: data.quantity,
          distance: data.distance,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Prediction API error:", errorText);
        setResult({ error: "Prediction API error: " + errorText });
        return;
      }
      const dataResponse = await response.json();
      setResult(dataResponse);
    } catch (error) {
      console.error("Prediction request failed:", error);
      setResult({ error: "Prediction request failed: " + error.message });
    }
  };

  return (
    <Router>
      <div>
        {/* Beautiful Header */}
        <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-8 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide text-center text-yellow-400">
              AI LCA Pro
            </h1>
            <p className="text-lg md:text-xl font-light opacity-90 text-center text-white">
              Advanced Life Cycle Assessment Platform
            </p>
          </div>
        </header>

        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-center space-x-8">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/configure"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                Configure
              </NavLink>
              <NavLink
                to="/visualizations"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                Insights
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                Reports
              </NavLink>
              <NavLink
                to="/comparisons"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                Comparisons
              </NavLink>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard result={result} userRole={userRole} />} />
          <Route path="/configure" element={<LCASetup onPredict={handlePredict} result={result} userRole={userRole} />} />
          <Route path="/visualizations" element={<Visualizations result={result} userRole={userRole} />} />
          <Route path="/comparisons" element={<Comparisons result={result} userRole={userRole} />} />
          <Route path="/reports" element={<Reports result={result} userRole={userRole} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
