// This is a JavaScript code block
// You can start writing your code here

// Example: Print "Hello, World!" to the console
console.log("Hello, World!");

// Example: Declare a variable and assign a value
let message = "Welcome to JavaScript!";
console.log(message);

// Example: Create a function
function greet(name) {
  console.log("Hello, " + name + "!");
}

// Example: Call the function
greet("Max");

// Feel free to modify and add more code as needed
alert("Hello, world!");

console.clear();

// Create an audio context
const audioContext = new AudioContext();

document.getElementById("playButton").addEventListener("click", function () {
  // Create an oscillator
  var oscillator = audioContext.createOscillator();

  // Create a filter
  var filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";

  // Get the slider element
  var filterFrequencySlider = document.getElementById("filterFrequencySlider");

  // Set the initial filter frequency
  filter.frequency.value = filterFrequencySlider.value;

  // Update the filter frequency when the slider changes
  filterFrequencySlider.addEventListener("input", function () {
    filter.frequency.value = filterFrequencySlider.value;
  });

  // Get the dropdown menu element
  var waveformSelector = document.getElementById("waveformSelector");

  // Set the oscillator's type
  oscillator.type = waveformSelector.value;

  // Create a gain node
  var gainNode = audioContext.createGain();

  // Create a delay node
  var delay = audioContext.createDelay();

  // Connect the oscillator to the filter
  oscillator.connect(filter);

  // Connect the filter to the gain node
  filter.connect(gainNode);

  // Connect the gain node to the delay node
  gainNode.connect(delay);

  // Connect the delay node to the audio context's destination
  delay.connect(audioContext.destination);

  // Get the slider elements
  var frequencySlider = document.getElementById("frequencySlider");
  var volumeSlider = document.getElementById("volumeSlider");

  // Set the initial oscillator frequency, gain value, and delay time
  oscillator.frequency.value = frequencySlider.value;
  gainNode.gain.value = volumeSlider.value;
  delay.delayTime.value = delaySlider.value;

  // Update the oscillator frequency, gain value, and delay time when the sliders change
  frequencySlider.addEventListener("input", function () {
    oscillator.frequency.value = frequencySlider.value;
  });
  volumeSlider.addEventListener("input", function () {
    gainNode.gain.value = volumeSlider.value;
  });
  delaySlider.addEventListener("input", function () {
    delay.delayTime.value = delaySlider.value;
  });

  // Start the oscillator
  oscillator.start();

  // Stop the oscillator after 1 second
  // oscillator.stop(audioContext.currentTime + 1);
});
