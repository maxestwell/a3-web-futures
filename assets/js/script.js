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
