# Audio Forensics - Single Table PostgreSQL Integration

This document explains the **SINGLE TABLE** approach for storing all audio analysis data in PostgreSQL.

## Overview

The application now uses **ONE SINGLE TABLE** called `audioforensics_cases` that stores:
- Case information (ID, name, filename, notes)
- Transcription results
- Sentiment analysis
- Gender detection
- Metadata extraction
- Temporal inconsistency analysis (NO GRAPH)
- Speaker diarization with segments
- All segment analysis results (transcription, sentiment, gender)

## Single Table Schema

### Table: `audioforensics_cases`

**Basic Information:**
- `id` (VARCHAR, PRIMARY KEY) - Unique case identifier
- `case_name` (VARCHAR) - User-provided case name
- `original_filename` (VARCHAR) - Original audio file name
- `file_path` (VARCHAR) - Path to stored audio file
- `notes` (TEXT) - Optional case notes
- `created_at` (TIMESTAMP) - Case creation time
- `updated_at` (TIMESTAMP) - Last update time

**Transcription Data:**
- `transcription_text` (TEXT) - Full transcription
- `transcription_confidence` (FLOAT) - Transcription confidence
- `transcription_language` (VARCHAR) - Detected language

**Sentiment Analysis:**
- `sentiment_result` (VARCHAR) - positive/negative/neutral
- `sentiment_confidence` (FLOAT) - Sentiment confidence

**Gender Detection:**
- `gender_result` (VARCHAR) - male/female/unknown
- `gender_confidence` (FLOAT) - Gender confidence

**Metadata Analysis:**
- `metadata_json` (JSONB) - All metadata as JSON
- `original_timestamps` (JSONB) - Original file timestamps

**Temporal Analysis (NO GRAPH):**
- `background_splices` (JSONB) - Background splice detections
- `phase_splices` (JSONB) - Phase splice detections
- `combined_splices` (JSONB) - Combined splice detections

**Diarization:**
- `estimated_speakers` (INTEGER) - Number of speakers detected
- `diarization_segments` (JSONB) - Array of segments with analysis results

**Status Flags:**
- `transcription_completed` (VARCHAR) - pending/completed/failed
- `sentiment_completed` (VARCHAR) - pending/completed/failed
- `gender_completed` (VARCHAR) - pending/completed/failed
- `metadata_completed` (VARCHAR) - pending/completed/failed
- `temporal_completed` (VARCHAR) - pending/completed/failed
- `diarization_completed` (VARCHAR) - pending/completed/failed

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Create Database

```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Create database and user
CREATE DATABASE audioforensics;
CREATE USER audioforensics_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE audioforensics TO audioforensics_user;
\q
```

### 3. Configure Environment

Create a `.env` file:

```bash
DATABASE_URL=postgresql://audioforensics_user:your_password@localhost:5432/audioforensics
```

### 4. Create Single Table

**Option A: Using Python script**
```bash
python setup_database.py
```

**Option B: Using pgAdmin 4**
Run the SQL from `single_table_setup.sql` in pgAdmin 4 Query Tool.

### 5. Start Application

```bash
# Start backend
python main_updated.py

# Start frontend
npm start
```

## PostgreSQL Table Query for pgAdmin 4

Run this in pgAdmin 4 Query Tool:

```sql
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
    sentiment_result VARCHAR,
    sentiment_confidence FLOAT,
    
    -- Gender detection data
    gender_result VARCHAR,
    gender_confidence FLOAT,
    
    -- Metadata analysis data
    metadata_json JSONB,
    original_timestamps JSONB,
    
    -- Temporal inconsistency analysis data (NO GRAPH)
    background_splices JSONB,
    phase_splices JSONB,
    combined_splices JSONB,
    
    -- Diarization data
    estimated_speakers INTEGER,
    diarization_segments JSONB,
    
    -- Analysis status flags
    transcription_completed VARCHAR DEFAULT 'pending',
    sentiment_completed VARCHAR DEFAULT 'pending',
    gender_completed VARCHAR DEFAULT 'pending',
    metadata_completed VARCHAR DEFAULT 'pending',
    temporal_completed VARCHAR DEFAULT 'pending',
    diarization_completed VARCHAR DEFAULT 'pending'
);
```

## API Endpoints

### Case Management
- `POST /cases/` - Create new case with ALL analyses
- `GET /cases/` - Get all cases
- `GET /cases/{case_id}` - Get case with all analysis results
- `DELETE /cases/{case_id}` - Delete case

### Segment Analysis
- `POST /cases/{case_id}/segments/{segment_index}/transcribe` - Transcribe segment
- `POST /cases/{case_id}/segments/{segment_index}/sentiment` - Analyze segment sentiment
- `POST /cases/{case_id}/segments/{segment_index}/gender` - Detect segment gender

## Workflow

1. **Create Case**: User uploads audio file through AddNewCase.tsx
2. **Automatic Analysis**: ALL analyses run automatically:
   - Transcription
   - Sentiment Analysis
   - Gender Detection
   - Metadata Extraction
   - Temporal Inconsistency Detection (NO GRAPH)
   - Speaker Diarization
3. **Data Storage**: All results stored in single table
4. **Segment Analysis**: Individual segments can be analyzed for transcription, sentiment, gender
5. **View Results**: Complete case details available in CaseDetails.tsx

## Key Features

- **Single Table**: All data in one table for simplicity
- **No Graph Storage**: Temporal analysis excludes graph images
- **JSON Storage**: Complex data stored as JSONB
- **Status Tracking**: Each analysis has completion status
- **Segment Analysis**: Individual speaker segments can be analyzed
- **Real-time Updates**: Frontend updates as analyses complete

## File Structure

```
├── database/
│   ├── models.py          # Single table model
│   ├── connection.py      # Database connection
│   └── services.py        # Single service class
├── main_updated.py        # Updated FastAPI app
├── single_table_setup.sql # SQL for pgAdmin 4
└── setup_database.py      # Python setup script
```

This single table approach simplifies the database structure while maintaining all functionality for comprehensive audio forensics analysis.
