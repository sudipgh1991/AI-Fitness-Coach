from flask import Flask
from flask_cors import CORS
from config import config
import os


def create_app(config_name='development'):
    """Application factory"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    # Enable CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": [app.config['FRONTEND_URL'], "*"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints
    from routes import auth, users, workouts, nutrition, chat, goals, measurements, habits, reminders
    
    app.register_blueprint(auth.bp, url_prefix='/api/auth')
    app.register_blueprint(users.bp, url_prefix='/api/users')
    app.register_blueprint(workouts.bp, url_prefix='/api/workouts')
    app.register_blueprint(nutrition.bp, url_prefix='/api/nutrition')
    app.register_blueprint(chat.bp, url_prefix='/api/chat')
    app.register_blueprint(goals.bp, url_prefix='/api/goals')
    app.register_blueprint(measurements.bp, url_prefix='/api/measurements')
    app.register_blueprint(habits.bp, url_prefix='/api/habits')
    app.register_blueprint(reminders.bp, url_prefix='/api/reminders')
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'message': 'Fitzen API is running'}
    
    return app


if __name__ == '__main__':
    app = create_app(os.getenv('FLASK_ENV', 'development'))
    app.run(
        host=app.config['API_HOST'],
        port=app.config['API_PORT'],
        debug=app.config['DEBUG']
    )
