class ColorblindPlayer {
    static applySettings(settings) {
      this.applyColorblindMode(settings.colorblindMode);
      this.applyContrast(settings.contrast);
      this.applyBrightness(settings.brightness);
    }
  
    static applyColorblindMode(mode) {
      const video = document.querySelector('video');
      switch (mode) {
        case 'protanopia':
          video.style.filter = 'brightness(1.2) saturate(1.5) hue-rotate(-20deg)';
          break;
        case 'deuteranopia':
          video.style.filter = 'brightness(1.2) saturate(1.5) hue-rotate(20deg) contrast(1.2) sepia(0.1)';
          break;
        case 'tritanopia':
          video.style.filter = 'brightness(1.2) saturate(1.5) hue-rotate(-50deg)';
          break;
        default:
          video.style.filter = 'none';
          break;
      }
    }
  
    static applyContrast(value) {
      const video = document.querySelector('video');
      video.style.filter += ` contrast(${value}%)`;
    }
  
    static applyBrightness(value) {
      const video = document.querySelector('video');
      video.style.filter += ` brightness(${value}%)`;
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'applySettings') {
      ColorblindPlayer.applySettings(request);
    }
  });
  