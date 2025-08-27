import React, { useRef, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { createCase } from "../services/cases";

function AddNewCase() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [caseName, setCaseName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>("idle");
  const [error, setError] = useState<string | null>(null);
  const [createdCase, setCreatedCase] = useState<{ id: string; name: string; created_at: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreatedCase(null);
    if (!selectedFile) {
      setError("Please upload an audio file.");
      return;
    }
    if (!caseName.trim()) {
      setError("Please enter a case name.");
      return;
    }
    try {
      setStatus('loading');
      const res = await createCase({ file: selectedFile, name: caseName });
      setCreatedCase(res);
      setStatus('success');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create case');
      setStatus('error');
    }
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
        {status === 'error' && (
          <div style={{ marginBottom: '1rem', color: 'tomato' }}>{error}</div>
        )}
        {status === 'success' && createdCase && (
          <div style={{ marginBottom: '1rem', color: 'limegreen' }}>
            Case created: <strong>{createdCase.name}</strong> (ID: {createdCase.id})
          </div>
        )}
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
                color: "var(--color-text-secondary)",
              }}
              placeholder="Enter case name"
            />
          </div>

          <div>
            <label htmlFor="audioFile" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Audio File *
            </label>
            <input
              ref={fileInputRef}
              id="audioFile"
              type="file"
              accept="audio/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              required
              style={{
                width: "100%",
                padding: "0.6rem 0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
            />
            {selectedFile && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                Selected: {selectedFile.name}
              </div>
            )}
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
            disabled={status === 'loading'}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-secondary)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)';
            }}
          >
            {status === 'loading' ? 'Creating…' : 'Create Case'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewCase;
