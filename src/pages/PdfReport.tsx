import React, { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function PdfReport() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCase, setSelectedCase] = useState("");
  const [reportType, setReportType] = useState("comprehensive");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);

  // Mock cases for demonstration
  const mockCases = [
    { id: "1", name: "Audio Forensics Case #001", type: "Audio Forensics" },
    { id: "2", name: "Digital Evidence Analysis #002", type: "Digital Evidence" },
    { id: "3", name: "Voice Authentication #003", type: "Voice Analysis" },
    { id: "4", name: "Temporal Analysis #004", type: "Temporal Inconsistency" },
    { id: "5", name: "Metadata Extraction #005", type: "Metadata Analysis" }
  ];

  const handleGenerateReport = () => {
    if (!selectedCase) {
      alert("Please select a case first");
      return;
    }
    
    // TODO: Connect to PDF generation backend
    console.log("Generating PDF report:", {
      caseId: selectedCase,
      reportType,
      includeCharts,
      includeMetadata
    });
    
    alert("PDF generation started! This will connect to your backend.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-secondary)",
        position: "relative",
      }}
    >
      <Header onToggleSidebar={() => setShowSidebar(!showSidebar)} />

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "6rem 2rem 2rem",
          marginLeft: showSidebar ? "266px" : "0",
          transition: "margin-left 0.3s ease",
          maxWidth: 800,
          marginRight: "auto",
          marginInlineStart: showSidebar ? undefined : "auto",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem", color: "var(--color-text)" }}>Generate PDF Report</h1>
        
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Case Selection */}
          <div>
            <label htmlFor="caseSelect" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Select Case *
            </label>
            <select
              id="caseSelect"
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
            >
              <option value="">Choose a case...</option>
              {mockCases.map(case_ => (
                <option key={case_.id} value={case_.id}>
                  {case_.name} ({case_.type})
                </option>
              ))}
            </select>
          </div>

          {/* Report Type */}
          <div>
            <label htmlFor="reportType" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
            >
              <option value="comprehensive">Comprehensive Report</option>
              <option value="executive">Executive Summary</option>
              <option value="technical">Technical Details</option>
              <option value="findings">Key Findings Only</option>
            </select>
          </div>

          {/* Report Options */}
          <div>
            <div style={{ marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Report Options
            </div>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  style={{ transform: "scale(1.2)" }}
                />
                <span>Include Charts & Graphs</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={includeMetadata}
                  onChange={(e) => setIncludeMetadata(e.target.checked)}
                  style={{ transform: "scale(1.2)" }}
                />
                <span>Include Technical Metadata</span>
              </label>
            </div>
          </div>

          {/* Preview Section */}
          {selectedCase && (
            <div style={{
              border: "2px solid var(--color-primary)",
              borderRadius: "0.5rem",
              padding: "1rem",
              backgroundColor: "var(--color-background)",
            }}>
              <h3 style={{ margin: "0 0 0.75rem 0", color: "var(--color-text)", fontSize: "1.1rem" }}>
                Report Preview
              </h3>
              <div style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
                <div><strong>Case:</strong> {mockCases.find(c => c.id === selectedCase)?.name}</div>
                <div><strong>Type:</strong> {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</div>
                <div><strong>Charts:</strong> {includeCharts ? "Included" : "Excluded"}</div>
                <div><strong>Metadata:</strong> {includeMetadata ? "Included" : "Excluded"}</div>
                <div style={{ marginTop: "0.5rem", color: "var(--color-text-secondary)" }}>
                  This will generate a professional PDF report with all selected components.
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerateReport}
            disabled={!selectedCase}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: 600,
              border: "none",
              borderRadius: "0.5rem",
              cursor: selectedCase ? "pointer" : "not-allowed",
              backgroundColor: selectedCase ? "var(--color-primary)" : "var(--color-text-secondary)",
              color: "var(--color-text)",
              transition: "background-color 0.2s ease",
              opacity: selectedCase ? 1 : 0.6,
            }}
            onMouseOver={(e) => {
              if (selectedCase) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
              }
            }}
            onMouseOut={(e) => {
              if (selectedCase) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)';
              }
            }}
          >
            Generate PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default PdfReport;
