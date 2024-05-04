export default class Synth{

    constructor() {
        this.synth = new Tone.Synth().toDestination();
        this.btnPlay = document.getElementById('btn_play');
        this.noteLength = [1, 0.5, 0.25, 0.125];
    }

    playNote = (note) => {
        this.synth.triggerAttackRelease(note, '8n');
    }

}

