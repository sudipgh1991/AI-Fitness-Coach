# 📝 Text Entry & Menu Selection Calorie Features

## Overview
Enhanced the chat system with two additional methods to get calorie information beyond photo upload:
1. **Text Entry**: Type food names and get instant calorie estimates
2. **Menu Selection**: Choose from predefined food items with pre-calculated nutrition

## 🎯 Feature 1: Text Entry for Food

### How It Works
Users simply type food items in the chat, and AI automatically detects and estimates calories.

### Examples
```
User types: "2 poached eggs + 1 bread"
AI responds: Nutritional card showing combined calories

User types: "chicken and rice"
AI responds: Total nutrition for both items

User types: "banana"
AI responds: Nutrition for 1 medium banana
```

### Supported Foods (15+ items)
- **Proteins**: Egg, Chicken, Salmon, Fish
- **Carbs**: Bread, Toast, Rice, Oatmeal, Quinoa
- **Fruits**: Apple, Banana, Avocado
- **Dairy**: Yogurt, Milk
- **Others**: Salad, Almonds, Protein Shake

### Smart Quantity Detection
- Automatically detects numbers before food words
- Examples:
  - "2 eggs" → Doubles the calories
  - "3 bananas" → Triples the nutrition
  - "1 chicken breast" → Single serving

### Food Combination
- Supports multiple items with "+", "and", or ","
- Example: "2 eggs + 1 bread + 1 banana"
- Calculates total calories and macros

### Response Format
```
User Message: "2 poached eggs + 1 bread"
AI Response: Nutritional card showing:
  - Food Name: "2 Egg + Bread Slice"
  - Total Calories: 220
  - Protein: 16g
  - Carbs: 15g
  - Fats: 11g
```

## 🎯 Feature 2: Food Menu Selection

### How It Works
Users tap "Food Menu" button and select from a categorized list of common foods.

### Access
```
Chat Screen → Quick Actions → "Food Menu" button
```

### Menu Structure
**4 Categories with 20+ Items:**

#### 🌅 Breakfast (4 items)
- 2 Poached Eggs (140 cal)
- Whole Wheat Bread (80 cal)
- Oatmeal Bowl (150 cal)
- Greek Yogurt (100 cal)

#### 🍽️ Lunch (4 items)
- Grilled Chicken Breast (165 cal)
- Brown Rice (215 cal)
- Mixed Salad (50 cal)
- Salmon Fillet (280 cal)

#### 🍎 Snacks (4 items)
- Apple (95 cal)
- Banana (105 cal)
- Almonds - 10 pieces (70 cal)
- Protein Bar (200 cal)

#### 🌙 Dinner (4 items)
- Baked Fish (200 cal)
- Quinoa (220 cal)
- Steamed Vegetables (80 cal)
- Mixed Salad (50 cal)

### Menu Features
- **Visual Icons**: Each food has an emoji icon
- **Quick Preview**: Shows calories directly on menu item
- **One-Tap Selection**: Instant nutritional analysis
- **Complete Info**: Full macros after selection

### UI Design
- Modal sliding from bottom
- Grid layout (3 columns)
- Category headers with colors
- Close button top-right
- Scrollable content

## 🔧 Technical Implementation

### Updated Components

#### 1. Food Database (parseFoodText)
```typescript
const foodDatabase = {
  'egg': { calories: 70, protein: 6, ... },
  'bread': { calories: 80, protein: 4, ... },
  // 15+ items
}
```

#### 2. Text Parser
- Regex pattern matching
- Quantity extraction
- Multi-food support
- Total calculation

#### 3. Menu Modal
- 20+ predefined items
- Category organization
- Grid layout
- Selection handling

### Key Functions

#### `parseFoodText(text: string)`
- Detects food keywords in text
- Extracts quantities
- Calculates total nutrition
- Returns NutritionalInfo or null

#### `handleMenuFoodSelection(item: FoodMenuItem)`
- Adds user message with selection
- Shows AI response with nutrition
- Same format as photo/text analysis

#### `renderFoodMenu()`
- Modal UI component
- Category-based layout
- Grid of food items
- Touch handling

## 📊 Usage Statistics

### Text Entry
- **Speed**: Instant (<1 second)
- **Accuracy**: Based on standard portions
- **Flexibility**: Supports combinations
- **Learning Curve**: None (natural language)

### Menu Selection
- **Speed**: Instant selection
- **Accuracy**: Pre-calculated precise values
- **Convenience**: Visual browsing
- **Best For**: Common foods, quick logging

## 🎨 User Experience

### Text Entry Flow
1. User types food name (e.g., "2 eggs and toast")
2. Sends message
3. AI detects food items
4. Returns nutritional card
5. Option to log to diary

### Menu Selection Flow
1. User taps "Food Menu" button
2. Modal opens with categories
3. Browse and select item
4. Modal closes
5. AI shows nutritional card
6. Option to log to diary

## 💡 Smart Features

### Auto-Detection
- No special commands needed
- Just type natural food descriptions
- Works alongside regular chat

### Flexible Input
- "2 eggs" ✓
- "two eggs" ✗ (numbers only for now)
- "eggs + bread" ✓
- "chicken and rice" ✓

### Contextual Responses
- Food query → Nutritional card
- Regular question → Normal AI response
- Photo upload → Image analysis
- Menu selection → Item nutrition

## 🚀 Future Enhancements

### Text Entry
- [ ] Support text numbers ("two", "three")
- [ ] Custom portion sizes ("small", "large")
- [ ] Recipe names ("caesar salad")
- [ ] Restaurant meals
- [ ] Regional cuisines
- [ ] Meal time context

### Menu System
- [ ] Expandable menu (50+ items)
- [ ] Custom food creation
- [ ] Recent/favorite foods
- [ ] Search/filter functionality
- [ ] Barcode scanning
- [ ] Restaurant menus integration

### Integration
- [ ] Save to meal history automatically
- [ ] Daily calorie tracking
- [ ] Macro goals comparison
- [ ] Meal planning suggestions
- [ ] Shopping list generation

## 📱 UI Elements

### Quick Actions Bar
```
[Food Menu] [Workout] [Progress]
```

### Input Placeholder
```
"Type food name or ask anything..."
```

### Food Menu Modal
```
┌─────────────────────────┐
│ Select Food Item    [X] │
├─────────────────────────┤
│ Breakfast              │
│ [🥚][🍞][🥣][🥛]      │
│                         │
│ Lunch                   │
│ [🍗][🍚][🥗][🐟]      │
│                         │
│ Snacks                  │
│ [🍎][🍌][🥜][🍫]      │
│                         │
│ Dinner                  │
│ [🐠][🌾][🥦]           │
└─────────────────────────┘
```

## 🎯 Benefits

### For Users
- **Multiple Options**: Choose preferred input method
- **Speed**: Quick calorie logging (5 seconds)
- **Accuracy**: Consistent nutritional data
- **Convenience**: No manual calculation
- **Flexibility**: Type, select, or upload

### For Fitness Goals
- **Easy Tracking**: Low friction logging
- **Better Adherence**: More likely to log consistently
- **Accurate Counting**: Precise macro tracking
- **Informed Choices**: See nutrition before eating

## 📝 Testing Checklist

### Text Entry
- [ ] Single food detection works
- [ ] Multiple foods combine correctly
- [ ] Quantities multiply properly
- [ ] Unknown foods show normal AI response
- [ ] Nutritional card displays
- [ ] Log button functional

### Menu Selection
- [ ] Modal opens on button tap
- [ ] All categories display
- [ ] Items are properly organized
- [ ] Selection triggers response
- [ ] Modal closes after selection
- [ ] Nutritional card displays correctly

### Cross-Feature
- [ ] Photo, text, menu all work together
- [ ] Same nutritional card format
- [ ] Log button works for all methods
- [ ] Chat history maintains all types
- [ ] Dark mode compatibility

## 📖 User Guide

### Quick Start: Text Entry
```
Step 1: Type food name in chat
Example: "chicken and rice"

Step 2: Press send
AI instantly analyzes

Step 3: View nutrition card
See calories and macros

Step 4: Log to diary (optional)
Tap "Log to Nutrition Diary"
```

### Quick Start: Menu Selection
```
Step 1: Tap "Food Menu" button

Step 2: Choose category
Breakfast, Lunch, Snacks, or Dinner

Step 3: Tap food item
Example: "Grilled Chicken Breast"

Step 4: View results
Nutritional card appears

Step 5: Log to diary (optional)
```

## 🔗 Related Features
- Photo Upload Calorie Estimation
- Nutrition Diary Integration
- Meal Planning System
- Daily Calorie Goals
- Macro Tracking

---

**Version**: 2.0  
**Last Updated**: January 10, 2026  
**Features**: Text Entry + Menu Selection + Photo Upload  
**Total Methods**: 3 ways to log food
