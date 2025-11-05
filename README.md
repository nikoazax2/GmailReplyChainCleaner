# Gmail Reply Chain Cleaner

A Chrome extension that automatically removes reply chains from Gmail messages when composing or replying to emails.

## Features

- **Automatic Detection**: Identifies and removes quoted reply chains in Gmail
- **Pattern Recognition**: Detects common reply patterns like "On [date], [person] wrote:"
- **Gmail Native Support**: Works with Gmail's `.gmail_quote` class and blockquotes
- **Real-time Monitoring**: Continuously watches for new compose windows
- **Non-intrusive**: Works silently in the background

## Installation

### Method 1: Load Unpacked Extension (Development Mode)

1. Download or clone this extension
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right corner)
4. Click "Load unpacked"
5. Select the folder containing the extension files
6. The extension will be installed and active

### Method 2: Manual Installation

1. Extract all files to a folder
2. Follow the steps in Method 1

## Files Included

- `manifest.json` - Extension configuration
- `content.js` - Main script that removes reply chains
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons
- `README.md` - This file

## How It Works

The extension monitors Gmail's compose and reply areas for:

1. **Gmail Quote Blocks**: Divs with class `.gmail_quote`
2. **Blockquote Elements**: HTML blockquotes containing quoted text
3. **Reply Patterns**: Text matching common reply formats:
   - "On [date] [name] wrote:"
   - "From: [email]"
   - Date/time stamps
   - And other common reply indicators

When detected, these elements are automatically removed from the compose area.

## Privacy

This extension:
- Runs only on mail.google.com
- Does not collect any data
- Does not send information to external servers
- Only modifies the compose/reply interface locally

## Compatibility

- Chrome, Edge, and other Chromium-based browsers
- Manifest V3 compliant
- Works with the current Gmail interface

## Troubleshooting

**Extension not working?**
- Make sure you're on mail.google.com
- Refresh the Gmail page after installing
- Check the browser console for any error messages

**Some reply chains not being removed?**
- The extension targets common patterns. Some custom email formats may not be detected
- You can manually delete any remaining quoted text

## Development

To modify the extension:

1. Edit `content.js` to adjust reply detection patterns
2. Reload the extension in `chrome://extensions/`
3. Refresh Gmail to test changes

## License

Free to use and modify.

## Version

1.0.0 - Initial release
