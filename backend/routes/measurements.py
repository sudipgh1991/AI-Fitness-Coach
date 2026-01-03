from flask import Blueprint, request, jsonify
from models.storage import MeasurementsStorage
from datetime import datetime
import uuid

bp = Blueprint('measurements', __name__)
measurements_storage = MeasurementsStorage()


@bp.route('/<user_id>', methods=['GET'])
def get_measurements(user_id):
    """Get all measurements for a user"""
    measurements = measurements_storage.read_by_filter(user_id=user_id)
    
    # Sort by measured_at descending
    measurements.sort(key=lambda x: x.get('measured_at', ''), reverse=True)
    
    return jsonify({
        'success': True,
        'measurements': measurements
    })


@bp.route('/', methods=['POST'])
def add_measurement():
    """Add a new measurement"""
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    # Calculate BMI if height and weight provided
    weight = float(data.get('weight', 0))
    height = float(data.get('height', 0))
    bmi = 0
    
    if weight > 0 and height > 0:
        # BMI = weight(kg) / (height(m))^2
        height_m = height / 100  # Convert cm to m
        bmi = round(weight / (height_m ** 2), 1)
    
    measurement_id = str(uuid.uuid4())
    measurement = {
        'id': measurement_id,
        'user_id': user_id,
        'weight': data.get('weight', 0),
        'height': data.get('height', 0),
        'chest': data.get('chest', 0),
        'waist': data.get('waist', 0),
        'hips': data.get('hips', 0),
        'arms': data.get('arms', 0),
        'thighs': data.get('thighs', 0),
        'body_fat': data.get('body_fat', 0),
        'bmi': bmi,
        'measured_at': data.get('measured_at', datetime.now().isoformat()),
        'created_at': datetime.now().isoformat()
    }
    
    measurements_storage.create(measurement)
    
    return jsonify({
        'success': True,
        'measurement': measurement
    })


@bp.route('/<measurement_id>', methods=['PUT'])
def update_measurement(measurement_id):
    """Update a measurement"""
    data = request.json
    
    # Recalculate BMI if height or weight changed
    if 'weight' in data or 'height' in data:
        measurement = measurements_storage.read_by_id('id', measurement_id)
        weight = float(data.get('weight', measurement.get('weight', 0)))
        height = float(data.get('height', measurement.get('height', 0)))
        
        if weight > 0 and height > 0:
            height_m = height / 100
            data['bmi'] = round(weight / (height_m ** 2), 1)
    
    success = measurements_storage.update('id', measurement_id, data)
    
    if not success:
        return jsonify({'error': 'Failed to update measurement'}), 500
    
    measurement = measurements_storage.read_by_id('id', measurement_id)
    
    return jsonify({
        'success': True,
        'measurement': measurement
    })


@bp.route('/<measurement_id>', methods=['DELETE'])
def delete_measurement(measurement_id):
    """Delete a measurement"""
    success = measurements_storage.delete('id', measurement_id)
    
    if not success:
        return jsonify({'error': 'Failed to delete measurement'}), 500
    
    return jsonify({
        'success': True,
        'message': 'Measurement deleted'
    })


@bp.route('/latest/<user_id>', methods=['GET'])
def get_latest_measurement(user_id):
    """Get the most recent measurement for a user"""
    measurements = measurements_storage.read_by_filter(user_id=user_id)
    
    if not measurements:
        return jsonify({'error': 'No measurements found'}), 404
    
    # Sort by measured_at descending and get first
    measurements.sort(key=lambda x: x.get('measured_at', ''), reverse=True)
    latest = measurements[0]
    
    return jsonify({
        'success': True,
        'measurement': latest
    })


@bp.route('/progress/<user_id>', methods=['GET'])
def get_measurement_progress(user_id):
    """Get measurement progress over time"""
    measurements = measurements_storage.read_by_filter(user_id=user_id)
    
    # Sort by measured_at ascending for progress tracking
    measurements.sort(key=lambda x: x.get('measured_at', ''))
    
    if not measurements:
        return jsonify({
            'success': True,
            'progress': {
                'weight': [],
                'bmi': [],
                'body_fat': [],
                'measurements': []
            }
        })
    
    # Extract trends
    weight_trend = [{'date': m.get('measured_at', ''), 'value': m.get('weight', 0)} 
                    for m in measurements]
    bmi_trend = [{'date': m.get('measured_at', ''), 'value': m.get('bmi', 0)} 
                 for m in measurements]
    body_fat_trend = [{'date': m.get('measured_at', ''), 'value': m.get('body_fat', 0)} 
                      for m in measurements if m.get('body_fat', 0) > 0]
    
    return jsonify({
        'success': True,
        'progress': {
            'weight': weight_trend,
            'bmi': bmi_trend,
            'body_fat': body_fat_trend,
            'measurements': measurements
        }
    })
