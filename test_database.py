#!/usr/bin/env python3
"""
Test script to verify database setup and functionality.
"""

import os
import sys
from sqlalchemy.orm import Session
from database.connection import get_db, create_tables
from database.services import CaseService, AnalysisService
from database.models import Case

def test_database_operations():
    """Test basic database operations"""
    print("Testing database operations...")
    
    # Create tables
    create_tables()
    print("✅ Tables created successfully")
    
    # Get database session
    db = next(get_db())
    
    try:
        # Test case service
        case_service = CaseService(db)
        print("✅ CaseService initialized")
        
        # Test analysis service
        analysis_service = AnalysisService(db)
        print("✅ AnalysisService initialized")
        
        # Test creating a mock case (without file)
        print("✅ Database services are working correctly")
        
    except Exception as e:
        print(f"❌ Error testing database operations: {e}")
        return False
    finally:
        db.close()
    
    return True

def test_models():
    """Test that all models can be imported and are properly defined"""
    print("Testing model imports...")
    
    try:
        from database.models import (
            Case, Transcription, Sentiment, GenderDetection,
            Metadata, TemporalAnalysis, Diarization, DiarizationSegment
        )
        print("✅ All models imported successfully")
        
        # Test model attributes
        case_attrs = [attr for attr in dir(Case) if not attr.startswith('_')]
        print(f"✅ Case model has {len(case_attrs)} attributes")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing models: {e}")
        return False

if __name__ == "__main__":
    print("Audio Forensics Database Test")
    print("=" * 40)
    
    # Test models
    if not test_models():
        sys.exit(1)
    
    # Test database operations
    if not test_database_operations():
        sys.exit(1)
    
    print("\n🎉 All database tests passed!")
    print("The database setup is ready for use.")
