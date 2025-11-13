# QuickTask App

**Author:** MD Mehedi Hasan  
**Contact:** mehedihasanrimon01@gmail.com

---

## Overview

QuickTask is a **React Native CLI app** for task management with a news feed. Users can create, edit, and delete tasks, set reminders using local notifications, and view news from NewsAPI. Tasks persist locally using AsyncStorage.

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
- React Navigation (Native Stack + Bottom Tabs)
- AsyncStorage
- `react-native-push-notification`

---

## Installation

### 1. Install Dependencies

```bash
yarn install
# or
npm install
2. Prebuild Native Folders
bash
Copy code
npx expo prebuild
3. Running Locally
Android (USB connected device)
bash
Copy code
npx expo run:android
Both Android/iOS (using Expo Go)
bash
Copy code
npx expo start
Install Expo Go on your Android/iOS device.

Scan the QR code to run the app.

Build
Android (APK)
bash
Copy code
cd android
./gradlew assembleRelease
Output APK will be in android/app/build/outputs/apk/release/app-release.apk.

iOS (Xcode)
Open the iOS project in Xcode:

bash
Copy code
npx expo prebuild
open ios/QuickTask.xcworkspace
Select your target device (simulator or connected iPhone).

Go to Signing & Capabilities → ensure your Apple ID is selected and a valid provisioning profile is used.

Build the app:

Simulator: Press Run (▶) in Xcode

Physical device: Press Run (▶) and ensure your device is trusted
```
