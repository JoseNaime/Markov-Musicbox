import Synth from './classes/Synth.js';
import MarkovTable from './classes/MarkovTable.js';
import NotesHistory from './classes/NotesHistory.js';

// Elements
const txtCurrentNote = document.getElementById('current-note');
const btnAutoPlay = document.getElementById('btn_autoplay');
const inputBpm = document.getElementById('autoplay-BPM');
const bpmDisplay = document.getElementById('bpm-display');

const noteLength = [4, 2, 1, 1 / 2, 1 / 4];

let synth = new Synth();
let markovTable = new MarkovTable();
let notesHistory = new NotesHistory();
let currentNote = Object.keys(markovTable.table)[0];
let autoplay = false;
let bpm = 120;
let autoPlayTimeout;

const setCurrentNoteText = () => {
    txtCurrentNote.innerText = currentNote;
}

const handlePlayNoteClick = () => {
    playNote(currentNote)
}

const playNote = (note) => {
    synth.playNote(note);
    notesHistory.add(note);
    currentNote = markovTable.randomNote(note);
    markovTable.updateTable(currentNote);
    setCurrentNoteText();

    if (autoplay) {
        const randomNoteLength = noteLength[Math.floor(Math.random() * noteLength.length)];
        const delay = 60000 / bpm * randomNoteLength;

        autoPlayTimeout = setTimeout(() => {
            playNote(currentNote)
        }, delay);
    }
}

synth.btnPlay.addEventListener('click', function () {
    handlePlayNoteClick();
});

btnAutoPlay.addEventListener('click', function () {
    if (autoplay) {
        autoplay = false;
        clearTimeout(autoPlayTimeout);
        btnAutoPlay.innerText = 'Auto Play';
    } else {
        autoplay = true;
        btnAutoPlay.innerText = 'Stop Auto Play';
        playNote(currentNote);
    }
});

inputBpm.addEventListener('input', function () {
    bpm = inputBpm.value;
    bpmDisplay.innerText = bpm;
})

// main
const main = () => {
    setCurrentNoteText();
    inputBpm.value = bpm;
    bpmDisplay.innerText = bpm;
    markovTable.updateTable(currentNote);
}

main();