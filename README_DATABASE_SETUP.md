# Audio Forensics - PostgreSQL Database Integration

This document explains how to set up and use the PostgreSQL database integration for the Audio Forensics application.

## Overview

The application now stores all audio analysis data in a PostgreSQL database, including:
- Case information
- Transcription results
- Sentiment analysis
- Gender detection
- Metadata extraction
- Temporal inconsistency analysis
- Speaker diarization with segments

## Database Schema

### Tables Created:
1. **cases** - Main case information
2. **transcriptions** - Audio transcription results
3. **sentiments** - Sentiment analysis results
4. **gender_detections** - Gender detection results
5. **metadata** - Audio metadata analysis
6. **temporal_analyses** - Temporal inconsistency detection
7. **diarizations** - Speaker diarization results
8. **diarization_segments** - Individual speaker segments

## Setup Instructions

### 1. Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install PostgreSQL (if not already installed)
# Ubuntu/Debian:
sudo apt-get install postgresql postgresql-contrib

# macOS (with Homebrew):
brew install postgresql

# Windows: Download from https://www.postgresql.org/download/windows/
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

Create a `.env` file in the project root:

```bash
# Copy the example file
cp env.example .env

# Edit the .env file with your database credentials
DATABASE_URL=postgresql://audioforensics_user:your_password@localhost:5432/audioforensics
```

### 4. Set Up Database Tables

```bash
# Run the database setup script
python setup_database.py
```

### 5. Start the Application

```bash
# Start the FastAPI backend
python main_updated.py

# In another terminal, start the React frontend
cd /path/to/frontend
npm start
```

## API Endpoints

### Case Management
- `POST /cases/` - Create new case with full analysis
- `GET /cases/` - Get all cases
- `GET /cases/{case_id}` - Get case with all analysis results
- `DELETE /cases/{case_id}` - Delete case and all associated data

### Segment Analysis
- `POST /cases/{case_id}/segments/{segment_id}/transcribe` - Transcribe segment
- `POST /cases/{case_id}/segments/{segment_id}/sentiment` - Analyze segment sentiment
- `POST /cases/{case_id}/segments/{segment_id}/gender` - Detect segment gender

### Legacy Endpoints (for backward compatibility)
- `POST /transcribe/` - Transcribe audio
- `POST /sentiment/` - Analyze sentiment
- `POST /gender/` - Detect gender
- `POST /diarization/` - Run diarization
- `POST /metadata/` - Extract metadata
- `POST /temporal_inconsistency/` - Detect temporal inconsistencies

## Frontend Integration

### New Features:
1. **AddNewCase.tsx** - Now performs comprehensive analysis and stores all results
2. **ReviewOldCase.tsx** - Lists all cases from database
3. **CaseDetails.tsx** - Shows detailed case information with all analysis results
4. **Segment Analysis** - Interactive buttons to analyze individual diarization segments

### Key Changes:
- Cases are now stored with unique IDs
- All analysis results are automatically saved
- Real-time progress feedback during case creation
- Comprehensive case details view
- Segment-level analysis capabilities

## File Structure

```
├── database/
│   ├── __init__.py
│   ├── models.py          # SQLAlchemy models
│   ├── connection.py      # Database connection
│   └── services.py        # Database service layer
├── main_updated.py        # Updated FastAPI application
├── setup_database.py      # Database setup script
├── requirements.txt       # Python dependencies
└── env.example           # Environment variables template
```

## Usage Workflow

1. **Create Case**: Upload audio file through AddNewCase.tsx
2. **Automatic Analysis**: All analyses run automatically and results are stored
3. **View Cases**: Browse all cases in ReviewOldCase.tsx
4. **Case Details**: Click "View Details" to see comprehensive analysis results
5. **Segment Analysis**: Analyze individual speaker segments for transcription, sentiment, and gender

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check database credentials in `.env` file
- Ensure database exists and user has proper permissions

### Missing Dependencies
- Run `pip install -r requirements.txt`
- Ensure all audio analysis modules are available

### Frontend Issues
- Check API_BASE_URL in frontend environment
- Verify backend is running on correct port
- Check browser console for CORS errors

## Data Persistence

All analysis results are now permanently stored in PostgreSQL:
- Audio files are saved to `uploads/cases/` directory
- All analysis results are stored in database tables
- Case relationships are maintained with foreign keys
- Deletion cascades to remove all associated data

This ensures data persistence across application restarts and provides a complete audit trail of all audio forensics analyses.
