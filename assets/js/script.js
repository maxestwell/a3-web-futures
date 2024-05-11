// const playBTN = document.getElementById("play-btn");
// const synth = new Tone.Synth();

// // const feedbackDelay = new Tone.FeedbackDelay("8n.", 0.7).toDestination();
// const feedbackDelay = new Tone.FeedbackDelay({
//   delayTime: 0.7,
//   feedback: 0.3,
//   maxDelay: 2,
//   wet: 0.3,
// });

// synth.connect(feedbackDelay);
// feedbackDelay.toDestination();

// playBTN.addEventListener("click", () => {
//   if (Tone.context.state !== "running") {
//     Tone.start();
//   }
//   synth.triggerAttackRelease("C4", "8n");
// });

const volumeControl = new Tone.Volume().toDestination();

// Create a polyphonic synth and connect it to the master output (your speakers)
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

document.getElementById("attack").addEventListener("input", function (e) {
  synth.set({ envelope: { attack: e.target.value } });
});

document.getElementById("decay").addEventListener("input", function (e) {
  synth.set({ envelope: { decay: e.target.value } });
});

document.getElementById("sustain").addEventListener("input", function (e) {
  synth.set({ envelope: { sustain: e.target.value } });
});

document.getElementById("release").addEventListener("input", function (e) {
  synth.set({ envelope: { release: e.target.value } });
});

const keyboard = new AudioKeys({
  rows: 1,
});

document.getElementById("volume").addEventListener("input", function (e) {
  volumeControl.volume.value = Tone.gainToDb(e.target.value);
});

let activeNotes = [];

keyboard.down((key) => {
  console.log(key);
  activeNotes.push(key.frequency);
  synth.triggerAttack(key.frequency);
});

keyboard.up((key) => {
  const noteIndex = activeNotes.indexOf(key.frequency);
  if (noteIndex > -1) {
    activeNotes.splice(noteIndex, 1);
  }
  synth.triggerRelease(key.frequency);
});

// Create a new waveform analyzer
const waveform = new Tone.Waveform();
synth.connect(waveform);

// Create a canvas to draw the waveform
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

// Function to draw the waveform
function drawWaveform() {
  requestAnimationFrame(drawWaveform);

  const waveformArray = waveform.getValue();

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(0, canvas.height / 2);
  for (let i = 0; i < waveformArray.length; i++) {
    const x = canvas.width * (i / waveformArray.length);
    const y = (waveformArray[i] / 2 + 0.5) * canvas.height;
    context.lineTo(x, y);
  }
  context.stroke();
}

// Start drawing the waveform
drawWaveform();
