from flask import Blueprint, request, jsonify
from models.storage import UsersStorage
from datetime import datetime
import uuid
import jwt
from config import Config

bp = Blueprint('auth', __name__)
users_storage = UsersStorage()


@bp.route('/send-otp', methods=['POST'])
def send_otp():
    """Send OTP to phone number (mock implementation)"""
    data = request.json
    phone = data.get('phone')
    
    if not phone:
        return jsonify({'error': 'Phone number is required'}), 400
    
    # In production, integrate with SMS service
    # For now, return success
    return jsonify({
        'success': True,
        'message': 'OTP sent successfully',
        'otp': '123456'  # Mock OTP for development
    })


@bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    """Verify OTP and login/register user"""
    data = request.json
    phone = data.get('phone')
    otp = data.get('otp')
    
    if not phone or not otp:
        return jsonify({'error': 'Phone and OTP are required'}), 400
    
    # Mock OTP verification (accept any 6-digit code in development)
    if len(otp) != 6:
        return jsonify({'error': 'Invalid OTP'}), 400
    
    # Check if user exists
    existing_users = users_storage.read_by_filter(phone=phone)
    
    if existing_users:
        user = existing_users[0]
    else:
        # Create new user
        user_id = str(uuid.uuid4())
        user = {
            'id': user_id,
            'name': 'Fitness Enthusiast',
            'email': '',
            'phone': phone,
            'avatar': '',
            'is_premium': False,
            'created_at': datetime.now().isoformat(),
            'onboarding_completed': False,
            'coach_gender': '',
            'coach_style': ''
        }
        users_storage.create(user)
    
    # Generate JWT token
    token = jwt.encode(
        {'user_id': user['id'], 'phone': phone},
        Config.SECRET_KEY,
        algorithm='HS256'
    )
    
    return jsonify({
        'success': True,
        'user': user,
        'token': token
    })


@bp.route('/google-signin', methods=['POST'])
def google_signin():
    """Google sign-in (mock implementation)"""
    data = request.json
    google_token = data.get('token')
    
    if not google_token:
        return jsonify({'error': 'Google token is required'}), 400
    
    # In production, verify Google token
    # For now, create/get user
    email = data.get('email', 'user@example.com')
    existing_users = users_storage.read_by_filter(email=email)
    
    if existing_users:
        user = existing_users[0]
    else:
        user_id = str(uuid.uuid4())
        user = {
            'id': user_id,
            'name': data.get('name', 'User'),
            'email': email,
            'phone': '',
            'avatar': data.get('avatar', ''),
            'is_premium': False,
            'created_at': datetime.now().isoformat(),
            'onboarding_completed': False,
            'coach_gender': '',
            'coach_style': ''
        }
        users_storage.create(user)
    
    token = jwt.encode(
        {'user_id': user['id'], 'email': email},
        Config.SECRET_KEY,
        algorithm='HS256'
    )
    
    return jsonify({
        'success': True,
        'user': user,
        'token': token
    })


@bp.route('/apple-signin', methods=['POST'])
def apple_signin():
    """Apple sign-in (mock implementation)"""
    data = request.json
    apple_token = data.get('token')
    
    if not apple_token:
        return jsonify({'error': 'Apple token is required'}), 400
    
    # Similar to Google sign-in
    email = data.get('email', '')
    user_id = str(uuid.uuid4())
    
    existing_users = []
    if email:
        existing_users = users_storage.read_by_filter(email=email)
    
    if existing_users:
        user = existing_users[0]
    else:
        user = {
            'id': user_id,
            'name': data.get('name', 'User'),
            'email': email,
            'phone': '',
            'avatar': '',
            'is_premium': False,
            'created_at': datetime.now().isoformat(),
            'onboarding_completed': False,
            'coach_gender': '',
            'coach_style': ''
        }
        users_storage.create(user)
    
    token = jwt.encode(
        {'user_id': user['id']},
        Config.SECRET_KEY,
        algorithm='HS256'
    )
    
    return jsonify({
        'success': True,
        'user': user,
        'token': token
    })
