# Contributing to DigiMem Counter

Thank you for considering contributing to DigiMem Counter! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- **Expo CLI** (will be installed with dependencies)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/DigiMemCounter.git
   cd DigiMemCounter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Test with Expo Go**
   - Install Expo Go on your mobile device
   - Scan the QR code from the terminal
   - Verify the app runs correctly

## 💻 Code Style

This project uses ESLint and Prettier for code formatting and linting.

### Linting Rules

- **Indentation**: 4 spaces
- **Quotes**: Double quotes
- **Semicolons**: Required
- **Line breaks**: Unix style (LF)

### Running Linters

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Check formatting
npm run format

# Auto-format code
npm run format
```

### Code Conventions

- **Components**: Use functional components with hooks
- **PropTypes**: Always define PropTypes for components
- **Naming**: 
  - Components: PascalCase (e.g., `PlayerRow`)
  - Files: PascalCase for components (e.g., `PlayerRow.jsx`)
  - Functions: camelCase (e.g., `handlePress`)
  - Constants: UPPER_SNAKE_CASE (e.g., `TIMER_DURATION`)
- **Comments**: Add JSDoc comments for complex functions

### Example Component Structure

```javascript
import PropTypes from "prop-types";
import React from "react";
import { View, Text } from "react-native";

/**
 * PlayerRow component displays player information and controls
 * @param {Object} props - Component props
 * @param {string} props.playerName - Name of the player
 * @param {string} props.playerColor - Color theme for the player
 */
const PlayerRow = ({ playerName, playerColor }) => {
    return (
        <View>
            <Text>{playerName}</Text>
        </View>
    );
};

PlayerRow.propTypes = {
    playerName: PropTypes.string.isRequired,
    playerColor: PropTypes.string.isRequired,
};

export default PlayerRow;
```

## 📁 Project Structure

```
DigiMemCounter/
├── App.js                      # Main app entry point
├── src/
│   ├── components/             # Reusable components
│   │   ├── Button/            # Custom button component
│   │   └── Gradient/          # Gradient border components
│   ├── screens/               # Screen components
│   │   ├── Main/              # Main game screen
│   │   └── Settings/          # Settings screen
│   ├── redux/                 # State management
│   │   ├── store.js           # Redux store with persist config
│   │   ├── actions.js         # Action creators
│   │   └── settingsReducer.js # Settings reducer
│   ├── constants/             # App constants
│   │   └── index.js           # Game constants, timer values, etc.
│   └── assets/                # Static assets
│       ├── fonts/             # Custom fonts
│       ├── images/            # Images and backgrounds
│       └── sounds/            # Sound effects
├── package.json
└── README.md
```

## 🔧 Making Changes

### Before You Start

1. **Check existing issues** to see if someone is already working on it
2. **Create an issue** for major changes to discuss the approach
3. **Create a branch** from `main` for your changes

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the code style guidelines
   - Add PropTypes to new components
   - Extract constants instead of using magic numbers
   - Add comments for complex logic

3. **Test your changes**
   - Test on Expo Go
   - Verify no linting errors: `npm run lint`
   - Verify formatting: `npm run format`
   - Test all affected features

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

## 📤 Submitting Changes

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with:
     - Description of changes
     - Screenshots/videos (if UI changes)
     - Testing steps
     - Related issues

3. **Wait for review**
   - Address any feedback from reviewers
   - Make requested changes
   - Push updates to the same branch

## 🐛 Reporting Bugs

When reporting bugs, please include:
- **Description**: Clear description of the bug
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: 
  - Device (e.g., Pixel 6, iPhone 13)
  - OS version (e.g., Android 13, iOS 16)
  - App version

## 💡 Suggesting Features

When suggesting features, please include:
- **Description**: Clear description of the feature
- **Use case**: Why this feature would be useful
- **Mockups**: If applicable, include mockups or examples

## ❓ Questions?

If you have questions, feel free to:
- Open an issue with the "question" label
- Check existing issues and discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the WTFPL License.

---

**Thank you for contributing to DigiMem Counter! 🎴**
