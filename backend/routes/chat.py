from flask import Blueprint, request, jsonify
from models.storage import ChatHistoryStorage
from services.bedrock_service import bedrock_service
from datetime import datetime
import uuid

bp = Blueprint('chat', __name__)
chat_storage = ChatHistoryStorage()


@bp.route('/message', methods=['POST'])
def send_message():
    """Send message to AI coach and get response"""
    data = request.json
    user_id = data.get('user_id')
    message = data.get('message')
    user_context = data.get('user_context', {})
    
    if not user_id or not message:
        return jsonify({'error': 'User ID and message are required'}), 400
    
    # Get AI response from Bedrock Claude
    response = bedrock_service.get_fitness_advice(user_context, message)
    
    # Save chat history
    chat_id = str(uuid.uuid4())
    chat_record = {
        'id': chat_id,
        'user_id': user_id,
        'message': message,
        'sender': 'user',
        'response': response,
        'created_at': datetime.now().isoformat()
    }
    chat_storage.create(chat_record)
    
    return jsonify({
        'success': True,
        'message': message,
        'response': response,
        'chat_id': chat_id,
        'created_at': chat_record['created_at']
    })


@bp.route('/history/<user_id>', methods=['GET'])
def get_chat_history(user_id):
    """Get chat history for a user"""
    history = chat_storage.read_by_filter(user_id=user_id)
    
    # Sort by created_at descending
    history.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    
    # Limit to last 50 messages
    history = history[:50]
    
    return jsonify({
        'success': True,
        'history': history
    })


@bp.route('/clear/<user_id>', methods=['DELETE'])
def clear_chat_history(user_id):
    """Clear chat history for a user"""
    # Get all chats for user
    chats = chat_storage.read_by_filter(user_id=user_id)
    
    # Delete each chat
    for chat in chats:
        chat_storage.delete('id', chat['id'])
    
    return jsonify({
        'success': True,
        'message': 'Chat history cleared'
    })
