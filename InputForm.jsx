import React, { useState } from "react";

function InputForm({ onSubmit }) {
  const [energyUse, setEnergyUse] = useState("");
  const [recycledContent, setRecycledContent] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [route, setRoute] = useState("");
  const [energySource, setEnergySource] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [endOfLife, setEndOfLife] = useState("");
  const [quantity, setQuantity] = useState("");
  const [distance, setDistance] = useState("");
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      energy_use: energyUse ? Number(energyUse) : null,
      recycled_content: recycledContent ? Number(recycledContent) : null,
      material_type: materialType || null,
      route: route || null,
      energy_source: energySource || null,
      transport_mode: transportMode || null,
      end_of_life: endOfLife || null,
      quantity: quantity ? Number(quantity) : null,
      distance: distance ? Number(distance) : null,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-dataset", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        setUploadMessage("Upload failed: " + errorText);
      } else {
        const data = await response.json();
        setUploadMessage(data.message);
      }
    } catch (error) {
      setUploadMessage("Upload error: " + error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-justify">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-justify">Configure Your Assessment</h2>

      <form onSubmit={handleSubmit} className="space-y-8" role="form">
        {/* Production Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            Production
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="materialType" className="block text-sm font-medium text-gray-600 mb-2">Material Type</label>
              <select
                id="materialType"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              >
                <option value="">Select Material</option>
                <option value="Steel">Steel</option>
                <option value="Aluminium">Aluminium</option>
                <option value="Copper">Copper</option>
                <option value="Nickel">Nickel</option>
                <option value="Zinc">Zinc</option>
                <option value="Lead">Lead</option>
                <option value="Titanium">Titanium</option>
                <option value="Magnesium">Magnesium</option>
                <option value="Chromium">Chromium</option>
                <option value="Manganese">Manganese</option>
              </select>
            </div>

            <div>
              <label htmlFor="route" className="block text-sm font-medium text-gray-600 mb-2">Route</label>
              <select
                id="route"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              >
                <option value="">Select Route</option>
                <option value="raw">Raw Material</option>
                <option value="recycled">Recycled Material</option>
              </select>
            </div>

            <div>
              <label htmlFor="energyUse" className="block text-sm font-medium text-gray-600 mb-2">Energy Use (kWh)</label>
              <input
                id="energyUse"
                type="number"
                value={energyUse}
                onChange={(e) => setEnergyUse(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              />
            </div>

            <div>
              <label htmlFor="energySource" className="block text-sm font-medium text-gray-600 mb-2">Energy Source</label>
              <select
                id="energySource"
                value={energySource}
                onChange={(e) => setEnergySource(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              >
                <option value="">Select Energy Source</option>
                <option value="coal">Coal</option>
                <option value="hydro">Hydro</option>
                <option value="solar">Solar</option>
                <option value="wind">Wind</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transport Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            Transport
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="transportMode" className="block text-sm font-medium text-gray-600 mb-2">Transport Mode</label>
              <select
                id="transportMode"
                value={transportMode}
                onChange={(e) => setTransportMode(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              >
                <option value="">Select Transport Mode</option>
                <option value="truck">Truck</option>
                <option value="ship">Ship</option>
                <option value="rail">Rail</option>
                <option value="air">Air</option>
              </select>
            </div>

            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-600 mb-2">Distance (km)</label>
              <input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              />
            </div>
          </div>
        </div>

        {/* End-of-Life Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            End-of-Life
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="recycledContent" className="block text-sm font-medium text-gray-600 mb-2">Recycled Content (%)</label>
              <input
                id="recycledContent"
                type="number"
                value={recycledContent}
                onChange={(e) => setRecycledContent(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              />
            </div>

            <div>
              <label htmlFor="endOfLife" className="block text-sm font-medium text-gray-600 mb-2">End-of-Life Option</label>
              <select
                id="endOfLife"
                value={endOfLife}
                onChange={(e) => setEndOfLife(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              >
                <option value="">Select End-of-Life</option>
                <option value="landfill">Landfill</option>
                <option value="recycle">Recycle</option>
                <option value="incinerate">Incinerate</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-600 mb-2">Quantity (kg)</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition duration-200 text-lg"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Run Prediction
          </button>
        </div>
      </form>

      <div className="mt-6">
        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">Upload Dataset (CSV or Excel)</label>
        <input
          id="fileUpload"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          onClick={handleFileUpload}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Upload Dataset
        </button>
        {uploadMessage && <p className="mt-2 text-sm text-gray-600">{uploadMessage}</p>}
      </div>
    </div>
  );
}

export default InputForm;
