from flask import Blueprint, request, jsonify
from models.storage import NutritionStorage, RecipesStorage
from services.bedrock_service import bedrock_service
from datetime import datetime
import uuid

bp = Blueprint('nutrition', __name__)
nutrition_storage = NutritionStorage()
recipes_storage = RecipesStorage()


@bp.route('/log/<user_id>', methods=['GET'])
def get_nutrition_logs(user_id):
    """Get nutrition logs for a user"""
    logs = nutrition_storage.read_by_filter(user_id=user_id)
    
    # Sort by logged_at descending
    logs.sort(key=lambda x: x.get('logged_at', ''), reverse=True)
    
    return jsonify({
        'success': True,
        'logs': logs
    })


@bp.route('/log', methods=['POST'])
def log_nutrition():
    """Log nutrition/meal"""
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    log_id = str(uuid.uuid4())
    log = {
        'id': log_id,
        'user_id': user_id,
        'meal_type': data.get('meal_type', 'Snack'),
        'food_name': data.get('food_name', ''),
        'calories': data.get('calories', 0),
        'protein': data.get('protein', 0),
        'carbs': data.get('carbs', 0),
        'fats': data.get('fats', 0),
        'logged_at': data.get('logged_at', datetime.now().isoformat()),
        'created_at': datetime.now().isoformat()
    }
    
    nutrition_storage.create(log)
    
    return jsonify({
        'success': True,
        'log': log
    })


@bp.route('/log/<log_id>', methods=['DELETE'])
def delete_nutrition_log(log_id):
    """Delete a nutrition log"""
    success = nutrition_storage.delete('id', log_id)
    
    if not success:
        return jsonify({'error': 'Failed to delete log'}), 500
    
    return jsonify({
        'success': True,
        'message': 'Log deleted'
    })


@bp.route('/daily-summary/<user_id>', methods=['GET'])
def get_daily_summary(user_id):
    """Get daily nutrition summary"""
    date = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
    
    logs = nutrition_storage.read_by_filter(user_id=user_id)
    
    # Filter logs for the specified date
    daily_logs = [log for log in logs if log.get('logged_at', '').startswith(date)]
    
    # Calculate totals
    total_calories = sum(int(log.get('calories', 0)) for log in daily_logs)
    total_protein = sum(int(log.get('protein', 0)) for log in daily_logs)
    total_carbs = sum(int(log.get('carbs', 0)) for log in daily_logs)
    total_fats = sum(int(log.get('fats', 0)) for log in daily_logs)
    
    # Group by meal type
    by_meal_type = {}
    for log in daily_logs:
        meal_type = log.get('meal_type', 'Snack')
        if meal_type not in by_meal_type:
            by_meal_type[meal_type] = []
        by_meal_type[meal_type].append(log)
    
    return jsonify({
        'success': True,
        'date': date,
        'summary': {
            'total_calories': total_calories,
            'total_protein': total_protein,
            'total_carbs': total_carbs,
            'total_fats': total_fats,
            'by_meal_type': by_meal_type,
            'meal_count': len(daily_logs)
        }
    })


@bp.route('/generate-meal-plan', methods=['POST'])
def generate_meal_plan():
    """Generate personalized meal plan using AI"""
    data = request.json
    user_profile = data.get('user_profile', {})
    
    # Get AI-generated meal plan
    plan = bedrock_service.generate_meal_plan(user_profile)
    
    return jsonify({
        'success': True,
        'plan': plan
    })


@bp.route('/recipes', methods=['GET'])
def get_recipes():
    """Get all recipes"""
    cuisine = request.args.get('cuisine', '')
    meal_type = request.args.get('meal_type', '')
    
    recipes = recipes_storage.read_all()
    
    # Filter by cuisine and meal type if provided
    if cuisine:
        recipes = [r for r in recipes if r.get('cuisine', '').lower() == cuisine.lower()]
    
    return jsonify({
        'success': True,
        'recipes': recipes
    })


@bp.route('/recipes/<recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """Get a specific recipe"""
    recipe = recipes_storage.read_by_id('id', recipe_id)
    
    if not recipe:
        return jsonify({'error': 'Recipe not found'}), 404
    
    return jsonify({
        'success': True,
        'recipe': recipe
    })


@bp.route('/recipes/suggest', methods=['POST'])
def suggest_recipes():
    """Get AI-generated recipe suggestions"""
    data = request.json
    preferences = data.get('preferences', {})
    
    # Get AI-generated recipe suggestions
    suggestions = bedrock_service.generate_recipe_suggestions(preferences)
    
    return jsonify({
        'success': True,
        'suggestions': suggestions
    })
