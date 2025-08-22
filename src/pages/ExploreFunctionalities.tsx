import React, { useRef, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ActionButton from "../components/ui/ActionButton";
import ActionResultCard from "../components/ui/ActionResultCard";
import { transcribeAudio } from "../services/transcription";
import { analyzeSentiment } from "../services/sentiment";
import { detectGender } from "../services/gender";
import { detectTemporalInconsistencies } from "../services/temporal";
import { extractMetadata } from "../services/metadata";

 type Status = 'idle' | 'loading' | 'success' | 'error';

function ExploreFunctionalities() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Per-action UI state
  const [showTranscribe, setShowTranscribe] = useState(false);
  const [transcribeStatus, setTranscribeStatus] = useState<Status>('idle');
  const [transcribeError, setTranscribeError] = useState<string | null>(null);
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);

  const [showSentiment, setShowSentiment] = useState(false);
  const [sentimentStatus, setSentimentStatus] = useState<Status>('idle');
  const [sentimentError, setSentimentError] = useState<string | null>(null);
  const [sentimentData, setSentimentData] = useState<{sentiment: string } | null>(null);

  const [showGender, setShowGender] = useState(false);
  const [genderStatus, setGenderStatus] = useState<Status>('idle');
  const [genderError, setGenderError] = useState<string | null>(null);
  const [genderData, setGenderData] = useState<{ gender: string } | null>(null);

  const [showTemporal, setShowTemporal] = useState(false);
  const [temporalStatus, setTemporalStatus] = useState<Status>('idle');
  const [temporalError, setTemporalError] = useState<string | null>(null);
  const [temporalData, setTemporalData] = useState<{
    file: string;
    background_splices: { time: number; confidence: number }[];
    phase_splices: { time: number; confidence: number }[];
    combined_splices: { time: number; confidence: number; methods?: string[] }[];
    graph: string | null;
  } | null>(null);

  const [showMetadata, setShowMetadata] = useState(false);
  const [metadataStatus, setMetadataStatus] = useState<Status>('idle');
  const [metadataError, setMetadataError] = useState<string | null>(null);
  const [metadataData, setMetadataData] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onUploadChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const openTranscribe = async () => {
    setShowTranscribe(true);
    setTranscribeError(null);
    setTranscriptionText(null);
    setTranscribeStatus('idle');
    if (!selectedFile) return;
    try {
      setTranscribeStatus('loading');
      const res = await transcribeAudio(selectedFile);
      setTranscriptionText(res.transcription);
      setTranscribeStatus('success');
    } catch (err: any) {
      setTranscribeError(err?.message ?? 'Request failed');
      setTranscribeStatus('error');
    }
  };

  const openSentiment = async () => {
    setShowSentiment(true);
    setSentimentError(null);
    setSentimentData(null);
    setSentimentStatus('idle');
    if (!selectedFile) return;
    try {
      setSentimentStatus('loading');
      const res = await analyzeSentiment(selectedFile);
      setSentimentData({ sentiment: res.sentiment });
      setSentimentStatus('success');
    } catch (err: any) {
      setSentimentError(err?.message ?? 'Request failed');
      setSentimentStatus('error');
    }
  };

  const openGender = async () => {
    setShowGender(true);
    setGenderError(null);
    setGenderData(null);
    setGenderStatus('idle');
    if (!selectedFile) return;
    try {
      setGenderStatus('loading');
      const res = await detectGender(selectedFile);
      setGenderData({ gender: res.gender });
      setGenderStatus('success');
    } catch (err: any) {
      setGenderError(err?.message ?? 'Request failed');
      setGenderStatus('error');
    }
  };

  const openTemporal = async () => {
    setShowTemporal(true);
    setTemporalError(null);
    setTemporalData(null);
    setTemporalStatus('idle');
    if (!selectedFile) return;
    try {
      setTemporalStatus('loading');
      const res = await detectTemporalInconsistencies(selectedFile);
      setTemporalData(res);
      setTemporalStatus('success');
    } catch (err: any) {
      setTemporalError(err?.message ?? 'Request failed');
      setTemporalStatus('error');
    }
  };

  const openMetadata = async () => {
    setShowMetadata(true);
    setMetadataError(null);
    setMetadataData(null);
    setMetadataStatus('idle');
    if (!selectedFile) return;
    try {
      setMetadataStatus('loading');
      const res = await extractMetadata(selectedFile);
      setMetadataData(res);
      setMetadataStatus('success');
    } catch (err: any) {
      setMetadataError(err?.message ?? 'Request failed');
      setMetadataStatus('error');
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
            onChange={(e) => onUploadChange(e.target.files?.[0] ?? null)}
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
          {/* Transcribe */}
          {showTranscribe ? (
            <ActionResultCard title="Transcription" status={transcribeStatus}>
              {transcribeStatus === 'error' && <div>{transcribeError}</div>}
              {transcribeStatus !== 'error' && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {selectedFile ? (transcriptionText ?? (transcribeStatus === 'loading' ? 'Transcribing…' : '')) : "Please upload an audio file first."}
                </div>
              )}
            </ActionResultCard>
          ) : (
            <ActionButton label="Transcribe" onClick={openTranscribe} />
          )}

          {/* Sentiment */}
          {showSentiment ? (
            <ActionResultCard title="Sentiment Analysis" status={sentimentStatus}>
              {sentimentStatus === 'error' && <div>{sentimentError}</div>}
              {sentimentStatus !== 'error' && (
                <div>
                  {selectedFile ? (
                    sentimentStatus === 'loading' ? 'Analyzing sentiment…' : (
                      sentimentData ? (
                        <div>
                          <div style={{ marginBottom: '0.5rem' }}><strong>Sentiment:</strong> {sentimentData.sentiment}</div>
                        </div>
                      ) : ''
                    )
                  ) : "Please upload an audio file first."}
                </div>
              )}
            </ActionResultCard>
          ) : (
            <ActionButton label="Sentiment Analysis" onClick={openSentiment} />
          )}

          {/* Gender */}
          {showGender ? (
            <ActionResultCard title="Gender Detection" status={genderStatus}>
              {genderStatus === 'error' && <div>{genderError}</div>}
              {genderStatus !== 'error' && (
                <div>
                  {selectedFile ? (genderStatus === 'loading' ? 'Detecting gender…' : (genderData ? `Gender: ${genderData.gender}` : '')) : "Please upload an audio file first."}
                </div>
              )}
            </ActionResultCard>
          ) : (
            <ActionButton label="Gender Detection" onClick={openGender} />
          )}

          {/* Diarization - disabled for now */}
          <ActionButton label="Speaker Diarization" onClick={() => {}} disabled />

          {/* Temporal */}
          {showTemporal ? (
            <ActionResultCard title="Temporal Inconsistency Detection" status={temporalStatus}>
              {temporalStatus === 'error' && <div>{temporalError}</div>}
              {temporalStatus !== 'error' && (
                <div>
                  {selectedFile ? (
                    temporalStatus === 'loading' ? 'Detecting temporal inconsistencies…' : (
                      temporalData ? (
                        <div>
                          <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Combined splices:</strong> {temporalData.combined_splices.length}
                          </div>
                          {temporalData.graph && (
                            <div style={{ marginTop: '0.5rem' }}>
                              <img alt="Temporal analysis" src={`data:image/png;base64,${temporalData.graph}`} style={{ maxWidth: '100%', borderRadius: '0.25rem' }} />
                            </div>
                          )}
                        </div>
                      ) : ''
                    )
                  ) : "Please upload an audio file first."}
                </div>
              )}
            </ActionResultCard>
          ) : (
            <ActionButton label="Temporal Inconsistency Detection" onClick={openTemporal} />
          )}

          {/* Metadata */}
          {showMetadata ? (
            <ActionResultCard title="Metadata" status={metadataStatus}>
              {metadataStatus === 'error' && <div>{metadataError}</div>}
              {metadataStatus !== 'error' && (
                <div>
                  {selectedFile ? (
                    metadataStatus === 'loading' ? 'Extracting metadata…' : (
                      metadataData ? (
                        <div>
                          {metadataData.filename && (
                            <div style={{ marginBottom: '0.25rem' }}>
                              <strong>File:</strong> {metadataData.filename}
                            </div>
                          )}
                          {metadataData.analysis_timestamp && (
                            <div style={{ marginBottom: '0.25rem' }}>
                              <strong>Analyzed at:</strong> {metadataData.analysis_timestamp}
                            </div>
                          )}
                          {metadataData.original_timestamps_received && (
                            <div style={{ marginBottom: '0.75rem' }}>
                              <strong>Timestamps sent to backend:</strong>
                              <div style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>
                                {metadataData.original_timestamps_received.modified && (
                                  <div>Modified: {metadataData.original_timestamps_received.modified}</div>
                                )}
                                {metadataData.original_timestamps_received.created && (
                                  <div>Created: {metadataData.original_timestamps_received.created}</div>
                                )}
                              </div>
                            </div>
                          )}
                          {metadataData.metadata && (
                            <div>
                              {Object.entries(metadataData.metadata).map(([section, data]) => (
                                <div key={section} style={{ marginBottom: '1rem' }}>
                                  <div style={{ 
                                    color: 'var(--color-primary)', 
                                    fontSize: '1.1rem', 
                                    fontWeight: 600, 
                                    marginBottom: '0.5rem',
                                    borderBottom: '1px solid var(--color-primary)',
                                    paddingBottom: '0.25rem'
                                  }}>
                                    {section}
                                  </div>
                                  {typeof data === 'object' && data !== null && (
                                    <div style={{ marginLeft: '0.5rem' }}>
                                      {Object.entries(data as Record<string, unknown>).map(([key, value]) => (
                                        <div key={key} style={{ margin: '0.25rem 0' }}>
                                          <strong>{key}:</strong> {String(value)}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : ''
                    )
                  ) : "Please upload an audio file first."}
                </div>
              )}
            </ActionResultCard>
          ) : (
            <ActionButton label="Metadata" onClick={openMetadata} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExploreFunctionalities;
