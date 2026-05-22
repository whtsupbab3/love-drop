# love drop 💛

A browser extension that sends your significant other random reminders that they are loved — surprise notifications with personal photos and sweet messages at random intervals throughout the day.

## Features

- Pops up a notification with a random photo and message at a random time (every 30–300 minutes by default)
- Cute retro-style popup UI with animated floating hearts
- Toggle random notifications on/off from the settings panel
- Works in Chrome and Firefox (Manifest V3)

## Installation

### Chrome / Chromium

1. Clone or download this repository
2. Go to `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the project folder

### Firefox

1. Clone or download this repository
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on** and select `manifest.json`

## Customization

### Photos

Add your own photos to the `pics/` folder, then update `pics.json` to list the filenames:

```json
["IMG_001.jpeg", "IMG_002.jpeg"]
```

### Messages

Edit `messages.json` to add your own sweet messages:

```json
[
  "thinking of you 💛",
  "you're my favorite person",
  "just wanted you to know i love you"
]
```

### Notification frequency

The default interval is a random delay between 30 and 300 minutes. To change this, update the defaults in [background.js](background.js):

```js
const { enabled = true, minMinutes = 30, maxMinutes = 300 } = ...
```

## Project structure

```
love-drop/
├── manifest.json      # Extension manifest (MV3)
├── background.js      # Service worker — schedules and sends notifications
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic (random photo + message, settings)
├── popup.css          # Styles
├── pics/              # Your personal photos
├── pics.json          # List of photo filenames to use
└── messages.json      # Pool of messages to pick from
```
