# 📸 Food Image Calorie Estimation Feature

## Overview
The AI Coach app now includes automatic calorie estimation when users upload food images in the chat session. The app analyzes the image and provides detailed nutritional information including calories, macros, and serving size.

## Features

### 🎯 Core Functionality
- **Image Upload**: Users can upload food images via camera or gallery
- **Automatic Analysis**: AI automatically detects food and estimates nutrition
- **Detailed Breakdown**: Shows calories, protein, carbs, fats, and fiber
- **Quick Logging**: One-tap to log food to nutrition diary
- **Visual Display**: Food image shown in chat with nutritional card

### 📊 Nutritional Information Displayed
- **Food Name**: AI-detected food type
- **Total Calories**: Large, prominent display
- **Macronutrients**:
  - Protein (grams)
  - Carbohydrates (grams)
  - Fats (grams)
  - Fiber (grams)
- **Serving Size**: Estimated portion information

## User Flow

### 1. Upload Image
```
Chat Screen → Camera Icon → Choose Option
  ├─ Take Photo (opens camera)
  └─ Choose from Gallery (opens photo library)
```

### 2. Automatic Analysis
- User selects/takes photo
- "Analyzing food image..." indicator appears
- AI processes image (2-second simulation)
- Results displayed automatically

### 3. View Results
- User message shows uploaded image
- AI response includes:
  - Nutritional info card
  - Calorie count (large display)
  - Macro breakdown grid
  - Serving size
  - "Log to Nutrition Diary" button

### 4. Log Food (Optional)
- Tap "Log to Nutrition Diary" button
- Food added to daily nutrition tracking
- Success confirmation shown

## Technical Implementation

### Updated Files
1. **`/frontend/types/index.ts`**
   - Added `NutritionalInfo` interface
   - Extended `ChatMessage` to support `imageUri` and `nutritionalInfo`

2. **`/frontend/screens/ChatScreen.tsx`**
   - Added image picker functionality
   - Implemented calorie estimation
   - Enhanced message rendering with images and nutrition cards
   - Added camera/gallery selection dialog

### Key Functions

#### `pickImage()`
- Requests media library permissions
- Launches image picker with editing enabled
- Processes selected image
- Triggers calorie estimation

#### `takePhoto()`
- Requests camera permissions
- Launches camera with editing
- Captures photo
- Triggers calorie estimation

#### `estimateCalories(imageUri: string)`
- Simulates AI food recognition
- Returns nutritional data including:
  - Food name
  - Calories
  - Protein, carbs, fats, fiber
  - Serving size

#### `showImageOptions()`
- Displays action sheet with:
  - Take Photo
  - Choose from Gallery
  - Cancel

### UI Components

#### Message with Image
```tsx
- Image (200px height, rounded corners)
- Caption text
- Timestamp
```

#### Nutritional Info Card
```tsx
- Header (food icon + name)
- Calorie Badge (large, centered)
- Macros Grid (4 columns)
- Serving Size (italic text)
- Log Button (primary color)
```

#### Analyzing Indicator
```tsx
- Activity spinner
- "Analyzing food image..." text
- Shown between upload and results
```

## Sample Nutritional Data

The feature currently includes demo data for 5 food types:

1. **Grilled Chicken Breast with Vegetables**
   - 350 cal | 42g protein | 18g carbs | 12g fats | 5g fiber

2. **Caesar Salad**
   - 280 cal | 15g protein | 12g carbs | 20g fats | 3g fiber

3. **Oatmeal with Berries**
   - 320 cal | 12g protein | 52g carbs | 8g fats | 9g fiber

4. **Avocado Toast**
   - 400 cal | 14g protein | 38g carbs | 24g fats | 12g fiber

5. **Protein Smoothie Bowl**
   - 380 cal | 28g protein | 45g carbs | 10g fats | 8g fiber

## Future Enhancements

### Production Integration
Replace mock `estimateCalories()` function with real AI service:

```typescript
// Example integration with AWS Rekognition + nutritional API
const estimateCalories = async (imageUri: string): Promise<NutritionalInfo> => {
  // 1. Upload image to S3
  // 2. Call AWS Rekognition for food detection
  // 3. Query nutritional database (USDA, Edamam, etc.)
  // 4. Return accurate nutritional data
};
```

### Recommended Services
- **AWS Rekognition**: Food detection and classification
- **Google Cloud Vision API**: Image analysis
- **Clarifai Food Model**: Specialized food recognition
- **Edamam API**: Nutritional database
- **USDA FoodData Central**: Government nutritional data

### Additional Features
- [ ] Multiple food items in one image
- [ ] Portion size adjustment
- [ ] Custom food database
- [ ] Barcode scanning
- [ ] Recipe recognition
- [ ] Meal planning integration
- [ ] Nutritional goals tracking
- [ ] Historical food analysis
- [ ] Export nutrition reports

## Permissions Required

### iOS
- `NSPhotoLibraryUsageDescription`: "We need access to your photos to analyze food images"
- `NSCameraUsageDescription`: "We need camera access to take food photos"

### Android
- `READ_EXTERNAL_STORAGE`: Gallery access
- `CAMERA`: Camera access

## Testing Checklist

- [ ] Image picker opens on camera icon tap
- [ ] Camera permission requested correctly
- [ ] Gallery permission requested correctly
- [ ] Image displays in chat message
- [ ] Nutritional card renders properly
- [ ] Calories shown prominently
- [ ] Macros grid layout correct
- [ ] Log button functional
- [ ] Analyzing indicator appears during processing
- [ ] Works on both iOS and Android
- [ ] Dark mode compatibility
- [ ] Handles permission denial gracefully
- [ ] Image quality maintained

## User Benefits

### 🎯 Quick Tracking
- No manual food entry required
- Instant nutritional information
- Visual confirmation of logged food

### 📈 Better Insights
- Accurate calorie tracking
- Macro balance visibility
- Portion awareness

### 💪 Fitness Goals
- Easier diet adherence
- Informed meal choices
- Progress monitoring

### 🕐 Time Saving
- 5 seconds vs 2 minutes manual entry
- Reduces tracking friction
- Increases logging consistency

## Support & Documentation

For issues or questions:
1. Check camera/gallery permissions in device settings
2. Ensure app has latest updates
3. Try re-uploading the image
4. Contact support with screenshot of issue

---

**Version**: 1.0  
**Last Updated**: January 10, 2026  
**Platform**: iOS & Android (React Native + Expo)
