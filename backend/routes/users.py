from flask import Blueprint, request, jsonify
from models.storage import UsersStorage
from datetime import datetime

bp = Blueprint('users', __name__)
users_storage = UsersStorage()


def get_user_from_token(request):
    """Extract user ID from authorization token"""
    # In production, properly decode and verify JWT
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        # For now, just extract user_id from token (implement proper JWT verification)
        return {'user_id': 'mock-user-id'}
    return None


@bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get user profile"""
    user = users_storage.read_by_id('id', user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'success': True, 'user': user})


@bp.route('/<user_id>', methods=['PUT'])
def update_user(user_id):
    """Update user profile"""
    data = request.json
    
    # Update user
    success = users_storage.update('id', user_id, data)
    
    if not success:
        return jsonify({'error': 'Failed to update user'}), 500
    
    # Get updated user
    user = users_storage.read_by_id('id', user_id)
    
    return jsonify({'success': True, 'user': user})


@bp.route('/<user_id>/onboarding', methods=['POST'])
def complete_onboarding(user_id):
    """Save onboarding data"""
    data = request.json
    
    update_data = {
        'onboarding_completed': True,
        'coach_gender': data.get('coach_gender', ''),
        'coach_style': data.get('coach_style', '')
    }
    
    success = users_storage.update('id', user_id, update_data)
    
    if not success:
        return jsonify({'error': 'Failed to save onboarding data'}), 500
    
    return jsonify({'success': True, 'message': 'Onboarding completed'})


@bp.route('/<user_id>/premium', methods=['POST'])
def upgrade_premium(user_id):
    """Upgrade user to premium"""
    success = users_storage.update('id', user_id, {'is_premium': True})
    
    if not success:
        return jsonify({'error': 'Failed to upgrade'}), 500
    
    return jsonify({'success': True, 'message': 'Premium upgrade successful'})
