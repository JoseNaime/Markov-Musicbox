export default class NotesHistory{
    notesHistoryListElement = document.getElementById('note-history-list');
    clearHistoryButton = document.getElementById('btn_clear-history');
    constructor(){
        this.history = [];

        this.clearHistoryButton.addEventListener('click', this.clearHistory);
    }
    add(note){
        this.history.push(note);
        this.notesHistoryListElement.innerText = this.history.join(' -> ');
    }

    clearHistory = () => {
        this.history = [];
        this.notesHistoryListElement.innerText = '';
    }
}
