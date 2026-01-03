from flask import Blueprint, request, jsonify
from models.storage import RemindersStorage
from datetime import datetime
import uuid

bp = Blueprint('reminders', __name__)
reminders_storage = RemindersStorage()


@bp.route('/<user_id>', methods=['GET'])
def get_reminders(user_id):
    """Get all reminders for a user"""
    is_active = request.args.get('is_active', '')
    
    reminders = reminders_storage.read_by_filter(user_id=user_id)
    
    # Filter by active status if provided
    if is_active:
        active_bool = is_active.lower() == 'true'
        reminders = [r for r in reminders if r.get('is_active', False) == active_bool]
    
    # Sort by scheduled_time
    reminders.sort(key=lambda x: x.get('scheduled_time', ''))
    
    return jsonify({
        'success': True,
        'reminders': reminders
    })


@bp.route('/', methods=['POST'])
def create_reminder():
    """Create a new reminder"""
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    reminder_id = str(uuid.uuid4())
    reminder = {
        'id': reminder_id,
        'user_id': user_id,
        'title': data.get('title', ''),
        'description': data.get('description', ''),
        'reminder_type': data.get('reminder_type', 'Custom'),
        'scheduled_time': data.get('scheduled_time', ''),
        'repeat': data.get('repeat', 'Once'),
        'is_active': data.get('is_active', True),
        'created_at': datetime.now().isoformat()
    }
    
    reminders_storage.create(reminder)
    
    return jsonify({
        'success': True,
        'reminder': reminder
    })


@bp.route('/<reminder_id>', methods=['PUT'])
def update_reminder(reminder_id):
    """Update a reminder"""
    data = request.json
    
    success = reminders_storage.update('id', reminder_id, data)
    
    if not success:
        return jsonify({'error': 'Failed to update reminder'}), 500
    
    reminder = reminders_storage.read_by_id('id', reminder_id)
    
    return jsonify({
        'success': True,
        'reminder': reminder
    })


@bp.route('/<reminder_id>', methods=['DELETE'])
def delete_reminder(reminder_id):
    """Delete a reminder"""
    success = reminders_storage.delete('id', reminder_id)
    
    if not success:
        return jsonify({'error': 'Failed to delete reminder'}), 500
    
    return jsonify({
        'success': True,
        'message': 'Reminder deleted'
    })


@bp.route('/<reminder_id>/toggle', methods=['POST'])
def toggle_reminder(reminder_id):
    """Toggle reminder active status"""
    reminder = reminders_storage.read_by_id('id', reminder_id)
    
    if not reminder:
        return jsonify({'error': 'Reminder not found'}), 404
    
    # Toggle is_active
    is_active = not reminder.get('is_active', False)
    
    success = reminders_storage.update('id', reminder_id, {'is_active': is_active})
    
    if not success:
        return jsonify({'error': 'Failed to toggle reminder'}), 500
    
    updated_reminder = reminders_storage.read_by_id('id', reminder_id)
    
    return jsonify({
        'success': True,
        'reminder': updated_reminder
    })


@bp.route('/upcoming/<user_id>', methods=['GET'])
def get_upcoming_reminders(user_id):
    """Get upcoming reminders for a user"""
    reminders = reminders_storage.read_by_filter(user_id=user_id)
    
    # Filter only active reminders
    active_reminders = [r for r in reminders if r.get('is_active', False)]
    
    # Get current time
    now = datetime.now().isoformat()
    
    # Filter upcoming reminders (scheduled_time >= now)
    upcoming = [r for r in active_reminders if r.get('scheduled_time', '') >= now]
    
    # Sort by scheduled_time
    upcoming.sort(key=lambda x: x.get('scheduled_time', ''))
    
    # Limit to next 10 reminders
    upcoming = upcoming[:10]
    
    return jsonify({
        'success': True,
        'reminders': upcoming
    })
