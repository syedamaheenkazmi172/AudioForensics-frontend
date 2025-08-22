import React, { useRef, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ActionButton from "../components/ui/ActionButton";

function ExploreFunctionalities() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
          maxWidth: 1000,
          marginRight: "auto",
          marginInlineStart: showSidebar ? undefined : "auto",
        }}
      >

        <div style={{ margin: "1.5rem 0 2rem", textAlign: "center" }}>
          <input
            ref={fileInputRef}
            id="audioUpload"
            type="file"
            accept="audio/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            style={{ display: "none" }}
          />
          <button
            onClick={handleUploadClick}
            style={{
              padding: "0.6rem 1.2rem",
              fontSize: "1rem",
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
            Upload audio
          </button>
          {selectedFile && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.95rem", color: "var(--color-text-secondary)" }}>
              Audio uploaded ({selectedFile.name})
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          <ActionButton label="Transcribe" onClick={() => {}} />
          <ActionButton label="Sentiment Analysis" onClick={() => {}} />
          <ActionButton label="Gender Detection" onClick={() => {}} />
          <ActionButton label="Speaker Diarization" onClick={() => {}} />
          <ActionButton label="Temporal Inconsistency Detection" onClick={() => {}} />
          <ActionButton label="Metadata" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default ExploreFunctionalities;
