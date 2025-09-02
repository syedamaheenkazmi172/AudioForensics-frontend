import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { getAllCases, Case, deleteCase } from "../services/cases";
import { useNavigate } from "react-router-dom";

function ReviewOldCase() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const casesData = await getAllCases();
      setCases(casesData);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load cases');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCase = async (caseId: string) => {
    if (!window.confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteCase(caseId);
      await loadCases(); // Reload cases
    } catch (e: any) {
      setError(e?.message ?? 'Failed to delete case');
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.original_filename.toLowerCase().includes(searchQuery.toLowerCase());
    // For now, all cases are considered "completed" since they have all analyses
    const matchesFilter = selectedFilter === "all" || selectedFilter === "completed";
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
        <h1 style={{ marginBottom: "1.5rem", color: "var(--color-text)" }}>Review Cases</h1>
        
        {error && (
          <div style={{ 
            marginBottom: '1rem', 
            color: 'tomato',
            padding: '0.75rem',
            backgroundColor: 'rgba(255, 99, 71, 0.1)',
            border: '1px solid tomato',
            borderRadius: '0.5rem'
          }}>
            {error}
          </div>
        )}
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading cases...
          </div>
        ) : (
          <>
            {/* Search and Filter Controls */}
            <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cases by name or filename..."
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
                  <option value="all">All Cases</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Cases List */}
            <div style={{ display: "grid", gap: "1rem" }}>
              {filteredCases.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>
                  {cases.length === 0 ? "No cases found. Create your first case to get started!" : "No cases found matching your search criteria."}
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
                          <div><strong>File:</strong> {case_.original_filename}</div>
                          <div><strong>Status:</strong> 
                            <span style={{ 
                              color: '#22c55e',
                              marginLeft: "0.5rem"
                            }}>
                              COMPLETED
                            </span>
                          </div>
                          {case_.notes && (
                            <div style={{ gridColumn: "1 / -1" }}>
                              <strong>Notes:</strong> {case_.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                        <div>Created: {new Date(case_.created_at).toLocaleDateString()}</div>
                        <div>Updated: {new Date(case_.updated_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => navigate(`/case/${case_.id}`)}
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.9rem",
                          border: "1px solid var(--color-primary)",
                          borderRadius: "0.35rem",
                          backgroundColor: "var(--color-primary)",
                          color: "var(--color-text)",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)';
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
                      <button
                        onClick={() => handleDeleteCase(case_.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.9rem",
                          border: "1px solid #ef4444",
                          borderRadius: "0.35rem",
                          backgroundColor: "transparent",
                          color: "#ef4444",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewOldCase;
