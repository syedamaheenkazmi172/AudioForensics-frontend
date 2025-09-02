from sqlalchemy import Column, Integer, String, DateTime, Text, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class AudioForensicsCase(Base):
    __tablename__ = "audioforensics_cases"
    
    # Primary key and basic info
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    case_name = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Transcription data
    transcription_text = Column(Text, nullable=True)
    transcription_confidence = Column(Float, nullable=True)
    transcription_language = Column(String, nullable=True)
    
    # Sentiment analysis data
    sentiment_result = Column(String, nullable=True)  # positive, negative, neutral
    sentiment_confidence = Column(Float, nullable=True)
    
    # Gender detection data
    gender_result = Column(String, nullable=True)  # male, female, unknown
    gender_confidence = Column(Float, nullable=True)
    
    # Metadata analysis data (stored as JSON)
    metadata_json = Column(JSON, nullable=True)
    original_timestamps = Column(JSON, nullable=True)
    
    # Temporal inconsistency analysis data (stored as JSON, no graph)
    background_splices = Column(JSON, nullable=True)
    phase_splices = Column(JSON, nullable=True)
    combined_splices = Column(JSON, nullable=True)
    
    # Diarization data
    estimated_speakers = Column(Integer, nullable=True)
    diarization_segments = Column(JSON, nullable=True)  # Array of segment objects with transcription, sentiment, gender
    
    # Analysis status flags
    transcription_completed = Column(String, default="pending")  # pending, completed, failed
    sentiment_completed = Column(String, default="pending")
    gender_completed = Column(String, default="pending")
    metadata_completed = Column(String, default="pending")
    temporal_completed = Column(String, default="pending")
    diarization_completed = Column(String, default="pending")
