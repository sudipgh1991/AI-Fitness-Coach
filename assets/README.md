# Assets Folder

This folder contains all the app assets including:

## Required Assets (to be added):

1. **icon.png** (1024x1024px)
   - App icon for all platforms
   - Should be a square PNG file

2. **splash.png** (1242x2436px)
   - Splash screen image
   - Will be displayed while app is loading

3. **adaptive-icon.png** (1024x1024px)
   - Android adaptive icon
   - Foreground image for Android

4. **favicon.png** (48x48px)
   - Web favicon

## To Generate Icons:

You can use online tools like:
- [App Icon Generator](https://appicon.co/)
- [Expo Icon Generator](https://icon.kitchen/)

Or use this command after adding your base icon:
```bash
npx expo-optimize
```

## Placeholder Colors:

For now, the app uses:
- Primary Color: #6C63FF (Purple)
- Secondary Color: #FF6584 (Pink)

You can customize these in `/constants/theme.ts`
