import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { getCase, CaseWithAnalyses, transcribeSegment, analyzeSegmentSentiment, detectSegmentGender } from "../services/cases";
import { useParams, useNavigate } from "react-router-dom";

function CaseDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [caseData, setCaseData] = useState<CaseWithAnalyses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [segmentLoading, setSegmentLoading] = useState<Record<string, boolean>>({});
  
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (caseId) {
      loadCaseData();
    }
  }, [caseId]);

  const loadCaseData = async () => {
    if (!caseId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getCase(caseId);
      setCaseData(data);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load case');
    } finally {
      setLoading(false);
    }
  };

  const handleSegmentAnalysis = async (segmentIndex: number, analysisType: 'transcribe' | 'sentiment' | 'gender') => {
    if (!caseId) return;
    
    const key = `${analysisType}-${segmentIndex}`;
    setSegmentLoading(prev => ({ ...prev, [key]: true }));
    
    try {
      let result;
      switch (analysisType) {
        case 'transcribe':
          result = await transcribeSegment(caseId, segmentIndex);
          break;
        case 'sentiment':
          result = await analyzeSegmentSentiment(caseId, segmentIndex);
          break;
        case 'gender':
          result = await detectSegmentGender(caseId, segmentIndex);
          break;
      }
      
      // Reload case data to get updated results
      await loadCaseData();
    } catch (e: any) {
      console.error(`Failed to ${analysisType} segment:`, e);
    } finally {
      setSegmentLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--color-background)", color: "var(--color-text-secondary)" }}>
        <Header onToggleSidebar={() => setShowSidebar(!showSidebar)} />
        {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
        <div style={{ 
          position: "relative", 
          zIndex: 2, 
          padding: "6rem 2rem 2rem", 
          marginLeft: showSidebar ? "266px" : "0", 
          transition: "margin-left 0.3s ease",
          textAlign: "center"
        }}>
          <div>Loading case details...</div>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--color-background)", color: "var(--color-text-secondary)" }}>
        <Header onToggleSidebar={() => setShowSidebar(!showSidebar)} />
        {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
        <div style={{ 
          position: "relative", 
          zIndex: 2, 
          padding: "6rem 2rem 2rem", 
          marginLeft: showSidebar ? "266px" : "0", 
          transition: "margin-left 0.3s ease",
          textAlign: "center"
        }}>
          <div style={{ color: "tomato" }}>{error || "Case not found"}</div>
          <button 
            onClick={() => navigate('/review-old-case')}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text)",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer"
            }}
          >
            Back to Cases
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-background)", color: "var(--color-text-secondary)" }}>
      <Header onToggleSidebar={() => setShowSidebar(!showSidebar)} />
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      
      <div style={{ 
        position: "relative", 
        zIndex: 2, 
        padding: "6rem 2rem 2rem", 
        marginLeft: showSidebar ? "266px" : "0", 
        transition: "margin-left 0.3s ease",
        maxWidth: 1200,
        marginRight: "auto",
        marginInlineStart: showSidebar ? undefined : "auto",
      }}>
        <div style={{ marginBottom: "2rem" }}>
          <button 
            onClick={() => navigate('/review-old-case')}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text)",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              marginBottom: "1rem"
            }}
          >
            ← Back to Cases
          </button>
          <h1 style={{ color: "var(--color-text)", marginBottom: "0.5rem" }}>{caseData.name}</h1>
          <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
            Created: {new Date(caseData.created_at).toLocaleString()} | 
            File: {caseData.original_filename}
          </div>
          {caseData.notes && (
            <div style={{ marginTop: "0.5rem", padding: "0.75rem", backgroundColor: "rgba(59, 130, 246, 0.1)", borderRadius: "0.5rem" }}>
              <strong>Notes:</strong> {caseData.notes}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Transcription */}
          {caseData.analyses.transcription && (
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "0.5rem", padding: "1rem" }}>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>Transcription</h3>
              <div style={{ whiteSpace: "pre-wrap", backgroundColor: "var(--color-background)", padding: "0.75rem", borderRadius: "0.25rem" }}>
                {caseData.analyses.transcription.text}
              </div>
            </div>
          )}

          {/* Sentiment Analysis */}
          {caseData.analyses.sentiment && (
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "0.5rem", padding: "1rem" }}>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>Sentiment Analysis</h3>
              <div><strong>Sentiment:</strong> {caseData.analyses.sentiment.sentiment}</div>
              {caseData.analyses.sentiment.confidence && (
                <div><strong>Confidence:</strong> {(caseData.analyses.sentiment.confidence * 100).toFixed(1)}%</div>
              )}
            </div>
          )}

          {/* Gender Detection */}
          {caseData.analyses.gender && (
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "0.5rem", padding: "1rem" }}>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>Gender Detection</h3>
              <div><strong>Gender:</strong> {caseData.analyses.gender.gender}</div>
              {caseData.analyses.gender.confidence && (
                <div><strong>Confidence:</strong> {(caseData.analyses.gender.confidence * 100).toFixed(1)}%</div>
              )}
            </div>
          )}

          {/* Metadata */}
          {caseData.analyses.metadata && (
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "0.5rem", padding: "1rem" }}>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>Metadata Analysis</h3>
              <div style={{ fontSize: "0.9rem" }}>
                {Object.entries(caseData.analyses.metadata.metadata).map(([section, data]) => (
                  <div key={section} style={{ marginBottom: "1rem" }}>
                    <div style={{ 
                      color: "var(--color-primary)", 
                      fontSize: "1rem", 
                      fontWeight: 600, 
                      marginBottom: "0.5rem",
                      borderBottom: "1px solid var(--color-primary)",
                      paddingBottom: "0.25rem"
                    }}>
                      {section}
                    </div>
                    {typeof data === 'object' && data !== null && (
                      <div style={{ marginLeft: "0.5rem" }}>
                        {Object.entries(data as Record<string, unknown>).map(([key, value]) => (
                          <div key={key} style={{ margin: "0.25rem 0" }}>
                            <strong>{key}:</strong> {String(value)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Temporal Analysis */}
          {caseData.analyses.temporal && (
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "0.5rem", padding: "1rem" }}>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>Temporal Inconsistency Detection</h3>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Combined Splices:</strong> {caseData.analyses.temporal.combined_splices.length}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Background Splices:</strong> {caseData.analyses.temporal.background_splices.length}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Phase Splices:</strong> {caseData.analyses.temporal.phase_splices.length}
              </div>
            </div>
          )}

          {/* Diarization */}
          {caseData.analyses.diarization && (
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "0.5rem", padding: "1rem" }}>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>Speaker Diarization</h3>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Estimated Speakers:</strong> {caseData.analyses.diarization.estimated_speakers}
              </div>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {caseData.analyses.diarization.segments.map((segment, index) => (
                  <div key={index} style={{ border: "1px solid var(--color-border)", borderRadius: "0.5rem", padding: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <div>
                        <strong>{segment.speaker}</strong> · {segment.start.toFixed(2)}s - {segment.end.toFixed(2)}s
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button 
                          onClick={() => handleSegmentAnalysis(index, 'transcribe')} 
                          disabled={segmentLoading[`transcribe-${index}`] || !!segment.transcription}
                          style={{ 
                            padding: "0.35rem 0.6rem", 
                            borderRadius: "0.375rem", 
                            border: "none", 
                            background: segment.transcription ? "var(--color-secondary)" : "var(--color-primary)", 
                            color: "var(--color-text)", 
                            cursor: segment.transcription ? "default" : "pointer",
                            opacity: segment.transcription ? 0.7 : 1
                          }}
                        >
                          {segmentLoading[`transcribe-${index}`] ? 'Transcribing…' : segment.transcription ? 'Transcribed' : 'Transcribe'}
                        </button>
                        <button 
                          onClick={() => handleSegmentAnalysis(index, 'sentiment')} 
                          disabled={segmentLoading[`sentiment-${index}`] || !segment.transcription || !!segment.sentiment}
                          style={{ 
                            padding: "0.35rem 0.6rem", 
                            borderRadius: "0.375rem", 
                            border: "none", 
                            background: segment.sentiment ? "var(--color-secondary)" : "var(--color-primary)", 
                            color: "var(--color-text)", 
                            cursor: (!segment.transcription || segment.sentiment) ? "default" : "pointer",
                            opacity: (!segment.transcription || segment.sentiment) ? 0.7 : 1
                          }}
                        >
                          {segmentLoading[`sentiment-${index}`] ? 'Analyzing…' : segment.sentiment ? 'Analyzed' : 'Sentiment'}
                        </button>
                        <button 
                          onClick={() => handleSegmentAnalysis(index, 'gender')} 
                          disabled={segmentLoading[`gender-${index}`] || !!segment.gender}
                          style={{ 
                            padding: "0.35rem 0.6rem", 
                            borderRadius: "0.375rem", 
                            border: "none", 
                            background: segment.gender ? "var(--color-secondary)" : "var(--color-primary)", 
                            color: "var(--color-text)", 
                            cursor: segment.gender ? "default" : "pointer",
                            opacity: segment.gender ? 0.7 : 1
                          }}
                        >
                          {segmentLoading[`gender-${index}`] ? 'Detecting…' : segment.gender ? 'Detected' : 'Gender'}
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.95rem", display: "grid", gap: "0.25rem" }}>
                      {segment.transcription && (
                        <div><strong>Transcript:</strong> <span style={{ whiteSpace: "pre-wrap" }}>{segment.transcription}</span></div>
                      )}
                      {segment.sentiment && (
                        <div><strong>Sentiment:</strong> {segment.sentiment}</div>
                      )}
                      {segment.gender && (
                        <div><strong>Gender:</strong> {segment.gender}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseDetails;
