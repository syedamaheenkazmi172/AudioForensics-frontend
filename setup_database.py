#!/usr/bin/env python3
"""
Database setup script for Audio Forensics application.
This script creates the single table and sets up the initial schema.
"""

import os
import sys
from sqlalchemy import create_engine, text
from database.connection import engine, create_tables
from database.models import Base

def setup_database():
    """Set up the database with the single table"""
    try:
        print("Creating single table: audioforensics_cases...")
        create_tables()
        print("✅ Database table created successfully!")
        
        # Test the connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM audioforensics_cases"))
            count = result.scalar()
            print(f"✅ Database connection test successful. audioforensics_cases table has {count} records.")
            
    except Exception as e:
        print(f"❌ Error setting up database: {e}")
        sys.exit(1)

def check_database_connection():
    """Check if the database connection is working"""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ Database connection is working!")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("Please check your DATABASE_URL environment variable.")
        return False

if __name__ == "__main__":
    print("Audio Forensics Single Table Database Setup")
    print("=" * 50)
    
    # Check connection first
    if not check_database_connection():
        sys.exit(1)
    
    # Set up tables
    setup_database()
    
    print("\n🎉 Database setup completed successfully!")
    print("\nSingle table 'audioforensics_cases' created with all analysis fields.")
    print("\nNext steps:")
    print("1. Start the FastAPI server: python main_updated.py")
    print("2. Start the React frontend: npm start")
    print("3. Create your first case through the web interface")
