-- Single Table Setup for Audio Forensics Application
-- Run this in pgAdmin 4 Query Tool

CREATE TABLE audioforensics_cases (
    -- Primary key and basic info
    id VARCHAR PRIMARY KEY,
    case_name VARCHAR NOT NULL,
    original_filename VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Transcription data
    transcription_text TEXT,
    transcription_confidence FLOAT,
    transcription_language VARCHAR,
    
    -- Sentiment analysis data
    sentiment_result VARCHAR,  -- positive, negative, neutral
    sentiment_confidence FLOAT,
    
    -- Gender detection data
    gender_result VARCHAR,  -- male, female, unknown
    gender_confidence FLOAT,
    
    -- Metadata analysis data (stored as JSON)
    metadata_json JSONB,
    original_timestamps JSONB,
    
    -- Temporal inconsistency analysis data (stored as JSON, no graph)
    background_splices JSONB,
    phase_splices JSONB,
    combined_splices JSONB,
    
    -- Diarization data
    estimated_speakers INTEGER,
    diarization_segments JSONB,  -- Array of segment objects with transcription, sentiment, gender
    
    -- Analysis status flags
    transcription_completed VARCHAR DEFAULT 'pending',  -- pending, completed, failed
    sentiment_completed VARCHAR DEFAULT 'pending',
    gender_completed VARCHAR DEFAULT 'pending',
    metadata_completed VARCHAR DEFAULT 'pending',
    temporal_completed VARCHAR DEFAULT 'pending',
    diarization_completed VARCHAR DEFAULT 'pending'
);

-- Create indexes for better performance
CREATE INDEX idx_audioforensics_cases_created_at ON audioforensics_cases(created_at);
CREATE INDEX idx_audioforensics_cases_case_name ON audioforensics_cases(case_name);
CREATE INDEX idx_audioforensics_cases_original_filename ON audioforensics_cases(original_filename);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_audioforensics_cases_updated_at 
    BEFORE UPDATE ON audioforensics_cases 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
