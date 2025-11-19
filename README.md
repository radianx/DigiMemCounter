# DigiMem Counter

A memory counter app designed for the **Digimon Card Game** (TCG), built with React Native and Expo. Track memory values, manage turns, roll dice, and customize your gaming experience with a sleek landscape interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Expo SDK](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?logo=react)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)

## 📱 Features

### Core Gameplay
- **Memory Counter**: Track memory values from 0-10 for both players with an intuitive grid interface
- **Dual Player Support**: Simultaneous memory tracking for two players in landscape mode
- **Turn Management**: 
  - Track current turn and turn counter
  - "Start Turn" and "End Turn" buttons for organized gameplay
  - Visual indicators showing whose turn it is
- **Dice Rolling**: Built-in D20 dice roller to determine who goes first
- **Game Timer**: 
  - Stopwatch mode to track total game duration
  - 5-minute countdown timer (long-press to activate)
  - Visual timer display that highlights the current player's color

### Customization
- **Player Names**: Customize both player names
- **Color Themes**: 
  - Individual color customization for Player 1 and Player 2
  - Custom selection highlight color
  - Color picker with wheel interface
- **Custom Backgrounds**: Upload your own background images from your device
- **HUD Toggle**: Option to show/hide the player HUD overlay

### User Experience
- **Haptic Feedback**: Tactile vibration feedback for button presses and actions (toggle on/off)
- **Sound Effects**: 
  - Dice rolling sound
  - Button tap sounds
  - Game start/end sounds
  - Toggle sound on/off
- **Landscape Orientation**: Locked landscape mode optimized for tabletop gaming
- **Persistent Settings**: All customizations saved using Redux Persist

### Interface
- **Gradient Borders**: Beautiful gradient-bordered buttons with player colors
- **Mirrored Layout**: Player 2's interface is rotated 180° for face-to-face gameplay
- **Visual Feedback**: Selected memory values are highlighted with custom colors
- **Quick Reset**: Long-press the center "0" button or use the reset button to restart

## 🎮 How to Use

1. **Starting a Game**:
   - Each player presses the dice button (⚂) to roll
   - The player with the higher roll gets a "START TURN" button
   - Press "START TURN" to begin the game and start the timer

2. **Tracking Memory**:
   - Tap any number (1-10) on your side to set your memory
   - The opponent's memory automatically adjusts to the negative value
   - Tap "0" in the center to reset both players to 0

3. **Managing Turns**:
   - Press "END TURN" when your turn is complete
   - The turn counter increments and switches to the other player
   - Current turn is displayed with player name and turn number

4. **Timer**:
   - Automatically starts when the game begins
   - Long-press the timer to activate 5-minute countdown mode
   - Timer background highlights the current player's color

5. **Resetting**:
   - Press the reset button (↻) to start a new game
   - Long-press the center "0" button for quick reset
   - Access settings (...) to customize the app

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd todoReactNative

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Device
```bash
# Android
npm run android

# iOS
npm run ios
```

## 📦 Building APK

To build a production APK for Android:

```bash
# Login to Expo (if not already logged in)
eas login

# Build production APK
eas build --platform android --profile production
```

The APK will be built in the cloud and you'll receive a download link when complete.

## 🎨 Customization

Access the settings menu by pressing the "..." button in the bottom-right corner:

- **Player Names**: Set custom names for both players
- **Player Colors**: Choose custom colors for each player's interface
- **Selection Color**: Customize the highlight color for selected memory values
- **Background Image**: Upload a custom background from your device
- **Keep Player HUD**: Toggle the foreground HUD overlay
- **Haptics**: Enable/disable vibration feedback
- **Sound**: Enable/disable sound effects
- **Reset Options**: Reset background or all settings to defaults

## 🏗️ Tech Stack

- **React** 19.1.0
- **React Native** 0.81.5
- **Expo** SDK 54
- **Redux Toolkit** 2.10.1 for state management
- **Redux Persist** with AsyncStorage for persistent storage
- **React Navigation** 7.x for screen navigation
- **Expo AV** for audio playback
- **Expo Haptics** for tactile feedback
- **Expo Image Picker** for custom backgrounds

## 📁 Project Structure

```
├── App.js                 # Main app entry point
├── src/
│   ├── screens/
│   │   ├── Main/         # Main game screen
│   │   └── Settings/     # Settings screen
│   ├── components/
│   │   ├── Button/       # Custom button component
│   │   └── Gradient/     # Gradient border components
│   ├── redux/
│   │   ├── store.js      # Redux store configuration
│   │   ├── actions.js    # Redux actions
│   │   └── settingsReducer.js  # Settings state management
│   └── assets/
│       ├── fonts/        # Custom fonts
│       ├── images/       # App images
│       └── sounds/       # Sound effects
```

## 📄 License

This has the WTFPL license.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

For major changes, please open an issue first to discuss what you would like to change.

---

**Enjoy tracking your Digimon Card Game matches! 🎴**
