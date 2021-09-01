// Follow the instructions here: https://learn-launchdarkly.netlify.app/
import config from './config.js';
import Runner from './runner.js';
// Import the code to enable the Dark Mode button
import * as DarkMode from './dark-mode.js';

// Press Run to start the game!

// Copy the Client ID for your environment from https://app.launchdarkly.com/settings/projects
const LD_CLIENT_ID = '<YOUR CLIENT ID HERE>';

// LDClient is loaded by a script tag in index.html
// Let's initialize it using the client id we defined above
const ldclient = LDClient.initialize(LD_CLIENT_ID, { anonymous: true });

// This function will be called once the LaunchDarkly client has initialized
function drawGame() {
  // Before we start the game, let's check space mode is enabled for this user
  // We will use `false` as the fallback value, so that if the client fails to initialize or the flag has not yet been created, the dinosaur sprite sheet will be used.
  if (ldclient.variation('space-mode', false)) {
    // Locate the image elements in the document by their ID
    // You can see these elements defined in index.html
    const smallSprites = document.getElementById('resources-1x');
    const largeSprites = document.getElementById('resources-2x');
    // Change the source url used for the sprite sheets
    smallSprites.src = 'images/100-percent/100-sprite-space.png';
    largeSprites.src = 'images/200-percent/200-sprite-space.png';
  }
  // Start the game!
  const runner = new Runner('.interstitial-wrapper', config);
}

// Register an event handler that calls `drawGame` once the client is ready
ldclient.on('ready', drawGame);

// Register an event handler that is triggered every time the `dark-mode` flag changes.
//
ldclient.on('change:dark-mode', (currentValue, previousValue) => {
  // currentValue will be true or false based on our flag rules
  DarkMode.setButtonVisible(currentValue);
});
