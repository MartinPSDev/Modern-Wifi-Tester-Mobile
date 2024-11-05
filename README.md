## WiFi Tester Pro - React Native App

A modern WiFi password testing application built with React Native and NativeScript.

### Prerequisites

- Node.js 14 or higher
- NativeScript CLI: `npm install -g nativescript`
- For Android development:
  - Android Studio
  - Android SDK
- For iOS development:
  - Xcode (Mac only)
  - CocoaPods

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd wifi-tester-pro
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
ns run android  # for Android
# or
ns run ios      # for iOS (Mac only)
```

### Features

- Modern dark mode UI
- Dictionary generator with multiple input fields
- Password testing simulation
- Real-time progress tracking
- Support for special characters and leet speak

### Project Structure

```
src/
├── components/         # React components
│   ├── MainStack.tsx  # Navigation setup
│   ├── DictionaryGenerator.tsx
│   └── PasswordTester.tsx
├── NavigationParamList.ts  # Navigation types
└── app.ts             # Entry point
```

### Development

To start development:

1. Make changes to the source code
2. Run `ns run android` or `ns run ios` to test on a device/emulator
3. Use `ns preview` for quick testing in the NativeScript Preview app

### Note

This is a development version and should be used responsibly and in accordance with applicable laws and regulations.