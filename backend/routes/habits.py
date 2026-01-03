from flask import Blueprint, request, jsonify
from models.storage import HabitsStorage
from services.bedrock_service import bedrock_service
from datetime import datetime
import uuid

bp = Blueprint('habits', __name__)
habits_storage = HabitsStorage()


@bp.route('/<user_id>', methods=['GET'])
def get_habits(user_id):
    """Get all habits for a user"""
    habits = habits_storage.read_by_filter(user_id=user_id)
    
    # Sort by created_at descending
    habits.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    
    return jsonify({
        'success': True,
        'habits': habits
    })


@bp.route('/', methods=['POST'])
def create_habit():
    """Create a new habit"""
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    habit_id = str(uuid.uuid4())
    habit = {
        'id': habit_id,
        'user_id': user_id,
        'habit_name': data.get('habit_name', ''),
        'frequency': data.get('frequency', 'Daily'),
        'target_days': data.get('target_days', 7),
        'completed_days': data.get('completed_days', 0),
        'streak': data.get('streak', 0),
        'created_at': datetime.now().isoformat(),
        'updated_at': datetime.now().isoformat()
    }
    
    habits_storage.create(habit)
    
    return jsonify({
        'success': True,
        'habit': habit
    })


@bp.route('/<habit_id>', methods=['PUT'])
def update_habit(habit_id):
    """Update a habit"""
    data = request.json
    data['updated_at'] = datetime.now().isoformat()
    
    success = habits_storage.update('id', habit_id, data)
    
    if not success:
        return jsonify({'error': 'Failed to update habit'}), 500
    
    habit = habits_storage.read_by_id('id', habit_id)
    
    return jsonify({
        'success': True,
        'habit': habit
    })


@bp.route('/<habit_id>', methods=['DELETE'])
def delete_habit(habit_id):
    """Delete a habit"""
    success = habits_storage.delete('id', habit_id)
    
    if not success:
        return jsonify({'error': 'Failed to delete habit'}), 500
    
    return jsonify({
        'success': True,
        'message': 'Habit deleted'
    })


@bp.route('/<habit_id>/complete', methods=['POST'])
def complete_habit(habit_id):
    """Mark habit as completed for today"""
    habit = habits_storage.read_by_id('id', habit_id)
    
    if not habit:
        return jsonify({'error': 'Habit not found'}), 404
    
    # Increment completed days and streak
    completed_days = int(habit.get('completed_days', 0)) + 1
    streak = int(habit.get('streak', 0)) + 1
    
    update_data = {
        'completed_days': completed_days,
        'streak': streak,
        'updated_at': datetime.now().isoformat()
    }
    
    success = habits_storage.update('id', habit_id, update_data)
    
    if not success:
        return jsonify({'error': 'Failed to update habit'}), 500
    
    updated_habit = habits_storage.read_by_id('id', habit_id)
    
    return jsonify({
        'success': True,
        'habit': updated_habit
    })


@bp.route('/<habit_id>/skip', methods=['POST'])
def skip_habit(habit_id):
    """Skip habit for today (resets streak)"""
    habit = habits_storage.read_by_id('id', habit_id)
    
    if not habit:
        return jsonify({'error': 'Habit not found'}), 404
    
    # Reset streak
    update_data = {
        'streak': 0,
        'updated_at': datetime.now().isoformat()
    }
    
    success = habits_storage.update('id', habit_id, update_data)
    
    if not success:
        return jsonify({'error': 'Failed to update habit'}), 500
    
    updated_habit = habits_storage.read_by_id('id', habit_id)
    
    return jsonify({
        'success': True,
        'habit': updated_habit
    })


@bp.route('/analyze/<user_id>', methods=['GET'])
def analyze_habits(user_id):
    """Get AI-powered habit analysis"""
    habits = habits_storage.read_by_filter(user_id=user_id)
    
    if not habits:
        return jsonify({
            'success': True,
            'analysis': 'No habits tracked yet. Start creating habits to get personalized insights!'
        })
    
    # Get AI analysis
    analysis = bedrock_service.analyze_habits(habits)
    
    return jsonify({
        'success': True,
        'habits': habits,
        'analysis': analysis
    })
