#!/usr/bin/env python3
"""
Sample Python test file for backend
This is a placeholder for future backend development
"""

def hello_world():
    """Simple test function"""
    return "Hello from AI Coach Backend!"

def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index
    
    Args:
        weight_kg (float): Weight in kilograms
        height_m (float): Height in meters
    
    Returns:
        float: BMI value
    """
    if height_m <= 0:
        raise ValueError("Height must be greater than 0")
    
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 2)

def get_bmi_category(bmi):
    """
    Get BMI category based on value
    
    Args:
        bmi (float): BMI value
    
    Returns:
        str: BMI category
    """
    if bmi < 18.5:
        return "Underweight"
    elif bmi < 25:
        return "Normal weight"
    elif bmi < 30:
        return "Overweight"
    else:
        return "Obese"

if __name__ == "__main__":
    print(hello_world())
    
    # Example usage
    weight = 75  # kg
    height = 1.75  # meters
    
    bmi = calculate_bmi(weight, height)
    category = get_bmi_category(bmi)
    
    print(f"\nBMI Calculator Example:")
    print(f"Weight: {weight} kg")
    print(f"Height: {height} m")
    print(f"BMI: {bmi}")
    print(f"Category: {category}")
