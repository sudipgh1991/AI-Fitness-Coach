#!/usr/bin/env python3
"""
Run the Flask backend server
"""
from app import create_app
from config import Config

if __name__ == '__main__':
    app = create_app()
    
    print(f"Starting Fitzen AI Coach Backend Server...")
    print(f"API Base URL: http://{Config.API_HOST}:{Config.API_PORT}/api")
    print(f"Health Check: http://{Config.API_HOST}:{Config.API_PORT}/health")
    print(f"Data Directory: {Config.DATA_DIR}")
    print(f"Press CTRL+C to quit")
    
    app.run(
        host=Config.API_HOST,
        port=Config.API_PORT,
        debug=Config.DEBUG
    )
