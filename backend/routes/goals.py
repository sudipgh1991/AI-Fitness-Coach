from flask import Blueprint, request, jsonify
from models.storage import GoalsStorage
from datetime import datetime
import uuid

bp = Blueprint('goals', __name__)
goals_storage = GoalsStorage()


@bp.route('/<user_id>', methods=['GET'])
def get_goals(user_id):
    """Get all goals for a user"""
    status = request.args.get('status', '')
    
    goals = goals_storage.read_by_filter(user_id=user_id)
    
    # Filter by status if provided
    if status:
        goals = [g for g in goals if g.get('status', '') == status]
    
    # Sort by created_at descending
    goals.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    
    return jsonify({
        'success': True,
        'goals': goals
    })


@bp.route('/', methods=['POST'])
def create_goal():
    """Create a new goal"""
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    goal_id = str(uuid.uuid4())
    goal = {
        'id': goal_id,
        'user_id': user_id,
        'title': data.get('title', ''),
        'description': data.get('description', ''),
        'type': data.get('type', 'General'),
        'target_value': data.get('target_value', 0),
        'current_value': data.get('current_value', 0),
        'unit': data.get('unit', ''),
        'deadline': data.get('deadline', ''),
        'status': data.get('status', 'Active'),
        'created_at': datetime.now().isoformat(),
        'updated_at': datetime.now().isoformat()
    }
    
    goals_storage.create(goal)
    
    return jsonify({
        'success': True,
        'goal': goal
    })


@bp.route('/<goal_id>', methods=['PUT'])
def update_goal(goal_id):
    """Update a goal"""
    data = request.json
    data['updated_at'] = datetime.now().isoformat()
    
    success = goals_storage.update('id', goal_id, data)
    
    if not success:
        return jsonify({'error': 'Failed to update goal'}), 500
    
    goal = goals_storage.read_by_id('id', goal_id)
    
    return jsonify({
        'success': True,
        'goal': goal
    })


@bp.route('/<goal_id>', methods=['DELETE'])
def delete_goal(goal_id):
    """Delete a goal"""
    success = goals_storage.delete('id', goal_id)
    
    if not success:
        return jsonify({'error': 'Failed to delete goal'}), 500
    
    return jsonify({
        'success': True,
        'message': 'Goal deleted'
    })


@bp.route('/<goal_id>/progress', methods=['POST'])
def update_goal_progress(goal_id):
    """Update goal progress"""
    data = request.json
    current_value = data.get('current_value')
    
    if current_value is None:
        return jsonify({'error': 'Current value is required'}), 400
    
    goal = goals_storage.read_by_id('id', goal_id)
    if not goal:
        return jsonify({'error': 'Goal not found'}), 404
    
    target_value = float(goal.get('target_value', 0))
    
    # Update status if goal is completed
    status = goal.get('status', 'Active')
    if current_value >= target_value:
        status = 'Completed'
    
    update_data = {
        'current_value': current_value,
        'status': status,
        'updated_at': datetime.now().isoformat()
    }
    
    success = goals_storage.update('id', goal_id, update_data)
    
    if not success:
        return jsonify({'error': 'Failed to update progress'}), 500
    
    updated_goal = goals_storage.read_by_id('id', goal_id)
    
    return jsonify({
        'success': True,
        'goal': updated_goal
    })
