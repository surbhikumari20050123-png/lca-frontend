import React from "react";
import SankeyDiagram from "./components/SankeyDiagram";

function Results({ result }) {
  if (!result) return null;

  const downloadReport = () => {
    const report = `
AI-Powered LCA Assessment Report
Generated on: ${new Date().toLocaleString()}

=== ENVIRONMENTAL IMPACT ===
• CO₂ Emissions: ${result.predicted_emissions} kg CO₂
• SOx Emissions: ${result.sox_emissions} kg
• NOx Emissions: ${result.nox_emissions} kg
• Water Usage: ${result.water_use} L
• Energy Intensity: ${result.energy_intensity} kWh/kg

=== CIRCULARITY METRICS ===
• Circularity Score: ${result.circularity_score}/100
• Recycled Content: ${result.recycled_content_pct}%
• Resource Efficiency: ${result.resource_efficiency}%
• Reuse/Recycling Potential: ${result.reuse_recycling_potential}%

=== RECOMMENDATIONS ===
${result.recommendation}

=== ASSESSMENT PARAMETERS ===
• Material: ${result.material_type || 'N/A'}
• Route: ${result.route || 'N/A'}
• Energy Source: ${result.energy_source || 'N/A'}
• Transport: ${result.transport_mode || 'N/A'}
• End-of-Life: ${result.end_of_life || 'N/A'}
• Quantity: ${result.quantity || 'N/A'} kg
• Distance: ${result.distance || 'N/A'} km
    `;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lca_assessment_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-justify">
      <h2 className="text-justify">Assessment Results</h2>
      <button onClick={downloadReport} className="text-justify">Download</button>

      <div className="text-justify">
        <p className="text-justify">CO₂ Emissions: {result.predicted_emissions} kg</p>
        <p className="text-justify">Circularity Score: {result.circularity_score}/100</p>
        <p className="text-justify">Energy Intensity: {result.energy_intensity} kWh/kg</p>
        <p className="text-justify">Water Usage: {result.water_use} L</p>
      </div>

      <div className="text-justify">
        <h3 className="text-justify">Recommendations</h3>
        <p className="text-justify">{result.recommendation}</p>
      </div>

      <SankeyDiagram data={result} />
    </div>
  );
}

export default Results;
