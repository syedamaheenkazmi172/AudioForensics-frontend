import React, { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function AddNewCase() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [caseName, setCaseName] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [caseType, setCaseType] = useState("");
  const [investigator, setInvestigator] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to PostgreSQL backend
    console.log("Case data:", {
      caseName,
      caseDescription,
      caseType,
      investigator,
      priority,
      createdAt: new Date().toISOString()
    });
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
        <h1 style={{ marginBottom: "1.5rem", color: "var(--color-text)" }}>Add New Case</h1>
        
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label htmlFor="caseName" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Case Name *
            </label>
            <input
              id="caseName"
              type="text"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
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
              placeholder="Enter case name"
            />
          </div>

          <div>
            <label htmlFor="caseDescription" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Case Description
            </label>
            <textarea
              id="caseDescription"
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
                resize: "vertical",
              }}
              placeholder="Describe the case details"
            />
          </div>

          <div>
            <label htmlFor="caseType" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Case Type
            </label>
            <input
              id="caseType"
              type="text"
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              placeholder="e.g., Audio Forensics, Digital Evidence"
            />
          </div>

          <div>
            <label htmlFor="investigator" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Investigator
            </label>
            <input
              id="investigator"
              type="text"
              value={investigator}
              onChange={(e) => setInvestigator(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              placeholder="Enter investigator name"
            />
          </div>

          <div>
            <label htmlFor="priority" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: 600,
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text)",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)';
            }}
          >
            Create Case
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewCase;
