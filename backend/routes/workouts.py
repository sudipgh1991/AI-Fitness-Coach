from flask import Blueprint, request, jsonify
from models.storage import WorkoutsStorage
from services.bedrock_service import bedrock_service
from datetime import datetime
import uuid

bp = Blueprint('workouts', __name__)
workouts_storage = WorkoutsStorage()


@bp.route('/<user_id>', methods=['GET'])
def get_workouts(user_id):
    """Get all workouts for a user"""
    workouts = workouts_storage.read_by_filter(user_id=user_id)
    
    # Sort by created_at descending
    workouts.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    
    return jsonify({
        'success': True,
        'workouts': workouts
    })


@bp.route('/', methods=['POST'])
def create_workout():
    """Create a new workout"""
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    workout_id = str(uuid.uuid4())
    workout = {
        'id': workout_id,
        'user_id': user_id,
        'title': data.get('title', 'Workout'),
        'description': data.get('description', ''),
        'duration': data.get('duration', 0),
        'calories': data.get('calories', 0),
        'type': data.get('type', 'General'),
        'difficulty': data.get('difficulty', 'Intermediate'),
        'completed_at': data.get('completed_at', ''),
        'created_at': datetime.now().isoformat()
    }
    
    workouts_storage.create(workout)
    
    return jsonify({
        'success': True,
        'workout': workout
    })


@bp.route('/<workout_id>', methods=['PUT'])
def update_workout(workout_id):
    """Update a workout"""
    data = request.json
    
    success = workouts_storage.update('id', workout_id, data)
    
    if not success:
        return jsonify({'error': 'Failed to update workout'}), 500
    
    workout = workouts_storage.read_by_id('id', workout_id)
    
    return jsonify({
        'success': True,
        'workout': workout
    })


@bp.route('/<workout_id>', methods=['DELETE'])
def delete_workout(workout_id):
    """Delete a workout"""
    success = workouts_storage.delete('id', workout_id)
    
    if not success:
        return jsonify({'error': 'Failed to delete workout'}), 500
    
    return jsonify({
        'success': True,
        'message': 'Workout deleted'
    })


@bp.route('/generate-plan', methods=['POST'])
def generate_workout_plan():
    """Generate personalized workout plan using AI"""
    data = request.json
    user_profile = data.get('user_profile', {})
    
    # Get AI-generated workout plan
    plan = bedrock_service.generate_workout_plan(user_profile)
    
    return jsonify({
        'success': True,
        'plan': plan
    })


@bp.route('/stats/<user_id>', methods=['GET'])
def get_workout_stats(user_id):
    """Get workout statistics for a user"""
    workouts = workouts_storage.read_by_filter(user_id=user_id)
    
    # Calculate stats
    total_workouts = len(workouts)
    total_calories = sum(int(w.get('calories', 0)) for w in workouts)
    total_duration = sum(int(w.get('duration', 0)) for w in workouts)
    
    # Count by type
    workout_types = {}
    for workout in workouts:
        wtype = workout.get('type', 'General')
        workout_types[wtype] = workout_types.get(wtype, 0) + 1
    
    return jsonify({
        'success': True,
        'stats': {
            'total_workouts': total_workouts,
            'total_calories': total_calories,
            'total_duration': total_duration,
            'workout_types': workout_types
        }
    })
