import React, { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function ReviewOldCase() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data for demonstration
  const mockCases = [
    {
      id: 1,
      name: "Audio Forensics Case #001",
      type: "Audio Forensics",
      investigator: "John Doe",
      priority: "high",
      status: "completed",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20"
    },
    {
      id: 2,
      name: "Digital Evidence Analysis #002",
      type: "Digital Evidence",
      investigator: "Jane Smith",
      priority: "medium",
      status: "in-progress",
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-22"
    },
    {
      id: 3,
      name: "Voice Authentication #003",
      type: "Voice Analysis",
      investigator: "Mike Johnson",
      priority: "low",
      status: "pending",
      createdAt: "2024-01-20",
      lastUpdated: "2024-01-21"
    }
  ];

  const filteredCases = mockCases.filter(case_ => {
    const matchesSearch = case_.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.investigator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || case_.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
          maxWidth: 1200,
          marginRight: "auto",
          marginInlineStart: showSidebar ? undefined : "auto",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem", color: "var(--color-text)" }}>Review Old Cases</h1>
        
        {/* Search and Filter Controls */}
        <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases by name or investigator..."
              style={{
                flex: 1,
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
            />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
                minWidth: "150px",
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Cases List */}
        <div style={{ display: "grid", gap: "1rem" }}>
          {filteredCases.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>
              No cases found matching your search criteria.
            </div>
          ) : (
            filteredCases.map(case_ => (
              <div
                key={case_.id}
                style={{
                  border: "2px solid var(--color-primary)",
                  borderRadius: "0.5rem",
                  padding: "1.5rem",
                  backgroundColor: "var(--color-background)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--color-text)", fontSize: "1.2rem" }}>
                      {case_.name}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem", fontSize: "0.9rem" }}>
                      <div><strong>Type:</strong> {case_.type}</div>
                      <div><strong>Investigator:</strong> {case_.investigator}</div>
                      <div><strong>Priority:</strong> 
                        <span style={{ 
                          color: case_.priority === 'urgent' ? '#ef4444' : 
                                 case_.priority === 'high' ? '#f97316' : 
                                 case_.priority === 'medium' ? '#eab308' : '#22c55e',
                          marginLeft: "0.5rem"
                        }}>
                          {case_.priority.toUpperCase()}
                        </span>
                      </div>
                      <div><strong>Status:</strong> 
                        <span style={{ 
                          color: case_.status === 'completed' ? '#22c55e' : 
                                 case_.status === 'in-progress' ? '#eab308' : '#6b7280',
                          marginLeft: "0.5rem"
                        }}>
                          {case_.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                    <div>Created: {case_.createdAt}</div>
                    <div>Updated: {case_.lastUpdated}</div>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                      border: "1px solid var(--color-primary)",
                      borderRadius: "0.35rem",
                      backgroundColor: "transparent",
                      color: "var(--color-text)",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    View Details
                  </button>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                      border: "1px solid var(--color-primary)",
                      borderRadius: "0.35rem",
                      backgroundColor: "transparent",
                      color: "var(--color-text)",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    Generate PDF
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewOldCase;
