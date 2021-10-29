import config from './config.js';
import Runner from './runner.js';

// Copy the Client ID for your environment from https://app.launchdarkly.com/settings/projects
const LD_CLIENT_ID = '<YOUR CLIENT ID HERE>';

// The user object for flag evaluation (this is explained in lesson 3)
let lduser = {"key": "user123"};

// LDClient loads from a script tag in index.html.
// Initialize it with the client ID we defined above and the user object
const ldclient = LDClient.initialize(LD_CLIENT_ID, lduser);

// Locate the image elements in the document by their ID
// You can see these elements defined in index.html
const smallSprites = document.getElementById("resources-1x");
const largeSprites = document.getElementById("resources-2x");
// Locate the game name heading
const heading = document.getElementById("heading");

function drawGame() {
  // Before we start the game, let's confirm that space mode is enabled for this user.
  // We will use `false` as the fallback value, so that if the client fails
  // to initialize or the flag has not yet been created, the game will use the dinosaur sprite sheet.
  if (ldclient.variation("space-mode", false)) {
    // Change the source URL used for the sprite sheets
    smallSprites.src = "/images/100-percent/100-sprite-space.png";
    largeSprites.src = "/images/200-percent/200-sprite-space.png";
    // Change the game name heading
    heading.innerText = "Toggle Runner";
  }
  const runner = new Runner('.interstitial-wrapper', config);
}

ldclient.on('ready', drawGame);

ldclient.on('change:space-mode', function (currentValue, previousValue) {
  if (currentValue == true) {
      // switch to Space Mode
      smallSprites.src = "/images/100-percent/100-sprite-space.png";
      largeSprites.src = "/images/200-percent/200-sprite-space.png";
      // Change the game name heading
      heading.innerText = "Toggle Runner";
  }
  else {
      // switch to Dinosaur Mode
      smallSprites.src = "/images/100-percent/100-sprite.png";
      largeSprites.src = "/images/200-percent/200-sprite.png";
      // Change the game name heading
      heading.innerText = "T-Rex Runner";
  }
});