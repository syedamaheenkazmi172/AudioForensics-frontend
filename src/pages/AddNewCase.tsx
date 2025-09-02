import React, { useRef, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { createCase, CreateCaseResponse } from "../services/cases";

function AddNewCase() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [caseName, setCaseName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>("idle");
  const [error, setError] = useState<string | null>(null);
  const [createdCase, setCreatedCase] = useState<CreateCaseResponse | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreatedCase(null);
    setAnalysisProgress("");
    
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
      setAnalysisProgress("Creating case and uploading file...");
      
      const res = await createCase({ 
        file: selectedFile, 
        name: caseName,
        notes: notes.trim() || undefined
      });
      
      setCreatedCase(res);
      setStatus('success');
      setAnalysisProgress("Case created successfully with all analyses completed!");
      
      // Reset form
      setCaseName("");
      setNotes("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create case');
      setStatus('error');
      setAnalysisProgress("");
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
        
        {status === 'success' && createdCase && (
          <div style={{ 
            marginBottom: '1rem', 
            color: 'limegreen',
            padding: '0.75rem',
            backgroundColor: 'rgba(50, 205, 50, 0.1)',
            border: '1px solid limegreen',
            borderRadius: '0.5rem'
          }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>✅ Case Created Successfully!</div>
            <div><strong>Name:</strong> {createdCase.name}</div>
            <div><strong>ID:</strong> {createdCase.id}</div>
            <div><strong>Created:</strong> {new Date(createdCase.created_at).toLocaleString()}</div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
              All analyses (transcription, sentiment, gender detection, metadata, temporal inconsistency, and diarization) have been completed and stored in the database.
            </div>
          </div>
        )}
        
        {status === 'loading' && (
          <div style={{ 
            marginBottom: '1rem', 
            color: 'var(--color-primary)',
            padding: '0.75rem',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid var(--color-primary)',
            borderRadius: '0.5rem'
          }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🔄 Processing Case...</div>
            <div style={{ fontSize: '0.9rem' }}>{analysisProgress}</div>
            <div style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.8rem', 
              opacity: 0.7 
            }}>
              This may take a few minutes as we perform comprehensive audio analysis including:
              transcription, sentiment analysis, gender detection, metadata extraction, 
              temporal inconsistency detection, and speaker diarization.
            </div>
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
            <label htmlFor="notes" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid var(--color-primary)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text-secondary)",
                resize: "vertical",
                minHeight: "80px",
              }}
              placeholder="Add any additional notes about this case..."
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
