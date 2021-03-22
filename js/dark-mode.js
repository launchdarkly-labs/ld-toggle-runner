
const darkModeButton = document.getElementById("dark-mode-button")
darkModeButton.addEventListener("click", onDarkModeButtonClick)

function onDarkModeButtonClick() {
  // Toggle dark mode state
  setActive(!isActive())
}

export function isActive() {
  return document.body.classList.contains("dark-mode")
}

export function setButtonVisible(visible) {
  if (visible) {
    darkModeButton.classList.remove("hidden")
  } else {
    darkModeButton.classList.add("hidden")
  }
}

export function setActive(darkModeOn) {
  if (darkModeOn) {
    // Add the dark-mode class to the document body
    document.body.classList.add("dark-mode");
    // Update our button text
    darkModeButton.textContent = "Light Mode";    
  } else {
    // Remove the dark-mode class to the document body
    document.body.classList.remove("dark-mode");

    darkModeButton.textContent = "Dark Mode";
  }
}

