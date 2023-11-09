module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
      // This example will make sure `globalThis` is available in Electron
      if (browser.family === 'chromium' && browser.name !== 'chrome') {
        launchOptions.args.push('--js-flags=--harmony-global-this');
      }
  
      return launchOptions;
    });
  };