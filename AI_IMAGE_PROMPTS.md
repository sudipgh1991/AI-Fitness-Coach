# AI Image Generation Prompts for Transformation Gallery

Use these prompts in Midjourney, DALL-E, or Stable Diffusion to generate your transformation images.

**Current Status:** App is using placeholder images. Once you generate and save the images, update the code in `FounderStoryScreen.tsx` to use local files.

## Quick Setup After Generating Images

1. Save all generated images to `frontend/assets/transformations/` with the filenames below
2. In `FounderStoryScreen.tsx`, replace the placeholder sections with:

```typescript
// Replace this:
beforeImage: { uri: PLACEHOLDER_BEFORE },
afterImage: { uri: PLACEHOLDER_AFTER },

// With this:
beforeImage: require('../assets/transformations/before1.jpg'),
afterImage: require('../assets/transformations/after1.jpg'),

// And replace founder image:
source={{ uri: PLACEHOLDER_FOUNDER }}
// With:
source={require('../assets/transformations/founder.jpg')}
```

---

## Founder Profile Image
**Prompt:** `Professional fitness coach portrait, Indian woman, confident smile, athletic wear, clean white background, professional photography, 1:1 aspect ratio, high quality, natural lighting`

**Save as:** `frontend/assets/transformations/founder.jpg`

---

## Transformation 1 - Sarah M. (Postpartum)

**Before:**
```
Indian woman in casual loose clothing, standing pose, indoor home setting, slightly tired appearance, post-pregnancy body, realistic photography, full body shot, neutral expression, natural lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before1.jpg`

**After:**
```
Same Indian woman in fitted athletic wear, confident standing pose, home setting, fit and energetic appearance, toned physique, realistic photography, full body shot, bright smile, natural lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after1.jpg`

---

## Transformation 2 - Priya K. (PCOS)

**Before:**
```
Indian woman in comfortable casual clothes, standing front view, indoor setting, slightly overweight, realistic photography, full body portrait, neutral lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before2.jpg`

**After:**
```
Same Indian woman in sporty activewear, confident pose, indoor gym setting, healthier appearance, moderate weight loss, glowing skin, realistic photography, full body portrait, happy expression, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after2.jpg`

---

## Transformation 3 - Anjali R. (Muscle Gain - Vegetarian)

**Before:**
```
Slim Indian woman in casual t-shirt and jeans, standing pose, home background, lean build, minimal muscle definition, realistic photography, full body shot, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before3.jpg`

**After:**
```
Same Indian woman in tank top and athletic shorts, flexing pose, gym environment, defined muscles, athletic build, proud expression, realistic photography, full body shot, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after3.jpg`

---

## Transformation 4 - Meera S. (Busy Professional)

**Before:**
```
Indian woman in business casual attire, standing pose, office background, slightly overweight, tired appearance, realistic photography, full body portrait, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before4.jpg`

**After:**
```
Same Indian woman in professional athletic wear, confident stance, modern office gym, fit appearance, energetic look, realistic photography, full body portrait, vibrant expression, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after4.jpg`

---

## Transformation 5 - Divya P. (Postpartum)

**Before:**
```
Young Indian mother in loose comfortable clothes, standing in living room, postpartum body, gentle expression, realistic photography, full body view, soft lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before5.jpg`

**After:**
```
Same young Indian mother in fitness clothing, strong pose, home workout space, toned physique, confident smile, realistic photography, full body view, bright lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after5.jpg`

---

## Transformation 6 - Kavya N. (PCOS Management)

**Before:**
```
Indian woman in oversized casual wear, standing front facing, home interior, fuller figure, realistic portrait photography, full body, natural daylight, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before6.jpg`

**After:**
```
Same Indian woman in fitted gym clothes, active pose, modern fitness studio, leaner physique, radiant skin, realistic portrait photography, full body, bright studio lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after6.jpg`

---

## Transformation 7 - Sneha D. (Vegetarian Weight Loss)

**Before:**
```
Overweight Indian woman in traditional kurta, standing pose, kitchen background, realistic photography, full body shot, warm home lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before7.jpg`

**After:**
```
Same Indian woman in modern sportswear, confident stance, bright kitchen with healthy food, significant weight loss, happy expression, realistic photography, full body shot, natural lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after7.jpg`

---

## Transformation 8 - Ritu M. (Busy Mom)

**Before:**
```
Indian mother in casual home clothes, standing in children's playroom, slightly overweight, realistic photography, full body view, indoor lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before8.jpg`

**After:**
```
Same Indian mother in athletic wear, energetic pose, organized playroom background, fit and toned, enthusiastic smile, realistic photography, full body view, natural lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after8.jpg`

---

## Transformation 9 - Pooja L. (Muscle Building)

**Before:**
```
Petite Indian woman in casual clothing, simple standing pose, home setting, slim untrained physique, realistic photography, full body portrait, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before9.jpg`

**After:**
```
Same Indian woman in workout gear, strong athletic pose, gym background, muscular definition, athletic build, confident expression, realistic photography, full body portrait, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after9.jpg`

---

## Transformation 10 - Nisha T. (Body Recomposition)

**Before:**
```
Indian woman in baggy clothes, standing neutrally, home background, soft body composition, realistic photography, full body shot, ambient lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/before10.jpg`

**After:**
```
Same Indian woman in form-fitting activewear, powerful stance, home gym setup, lean muscular physique, triumphant smile, realistic photography, full body shot, good lighting, 2:3 aspect ratio
```
**Save as:** `frontend/assets/transformations/after10.jpg`

---

## Tips for AI Image Generation:

### For Midjourney:
- Add `--ar 2:3` for aspect ratio
- Add `--style raw` for more realistic photos
- Add `--v 6` for latest version
- Example: `[prompt above] --ar 2:3 --style raw --v 6`

### For DALL-E 3:
- Use natural language, prompts work well as-is
- Request "photorealistic" style
- Generate at highest quality setting

### For Stable Diffusion:
- Use checkpoint: "Realistic Vision" or "DreamShaper"
- Add negative prompt: `cartoon, anime, illustration, painting, drawing, art, sketch, unrealistic, bad anatomy, distorted`
- Use 512x768 resolution for 2:3 ratio

### Consistency Tips:
- Generate all "before" images first with similar prompts
- Then generate "after" images
- Try to maintain consistent facial features by adding descriptive details
- Keep lighting and angle similar within each pair
