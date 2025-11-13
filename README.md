# QuickTask App

**Author:** MD Mehedi Hasan
**Contact:** [mehedihasanrimon01@gmail.com](mailto:mehedihasanrimon01@gmail.com)

---

## Overview

QuickTask is a **React Native app** for task management with a news feed. Users can create, edit, and delete tasks, set reminders using local notifications, and view news from NewsAPI. Tasks persist locally using AsyncStorage.

---

## Features

- Add, view, edit, and delete tasks
- Mark tasks as complete/incomplete
- Persist tasks using AsyncStorage
- Set reminders (local notifications)
- News feed integration using [NewsAPI.org](https://newsapi.org/) with pull-to-refresh
- Bottom Tab navigation (Tasks, News, Profile)
- Stack navigation for task details
- Reusable TypeScript components
- Dark/Light theme toggle

---

## Tech Stack

- React Native + TypeScript
- Redux Toolkit
- React Navigation
- AsyncStorage
- `expo-push-notification`

---

## Installation

### 1. Install Dependencies

```bash
yarn install
# or
npm install
```

### 2. Prebuild Native Folders

```bash
npx expo prebuild
```

### 3. Running Locally

#### Android (USB connected device)

```bash
npx expo run:android
```

#### Both Android/iOS (using Expo Go)

```bash
npx expo start
```

- Install **Expo Go** on your Android/iOS device.
- Scan the QR code to run the app.

---

## Build

### Android (APK)

```bash
cd android
./gradlew assembleRelease
```

- Output APK will be in `android/app/build/outputs/apk/release/app-release.apk`.

### iOS (Xcode)

1. Open the iOS project in Xcode:

```bash
npx expo prebuild
open ios/QuickTask.xcworkspace
```

2. Select your **target device** (simulator or connected iPhone).
3. Go to **Signing & Capabilities** → ensure your Apple ID is selected and a valid provisioning profile is used.
4. Build the app:

   - **Simulator:** Press Run (▶) in Xcode
   - **Physical device:** Press Run (▶) and ensure your device is trusted.

---

## Project Structure Overview

```
TaskManagement/
├── android/                 # Native Android project files
├── ios/                     # Native iOS project files
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screens (Tasks, News, Profile)
│   ├── redux/               # Redux slices, store setup
│   ├── utils/               # Helper functions and constants
│   ├── routes/          # Stack and Tab navigators
|   |── types/               #
│   └── Context/             # Theme and other contexts
├── App.tsx                  # Root component
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

**Developed by MD Mehedi Hasan**
📧 [mehedihasanrimon01@gmail.com](mailto:mehedihasanrimon01@gmail.com)
