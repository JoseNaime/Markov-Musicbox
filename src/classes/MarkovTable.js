export default class MarkovTable{
    markovTableElement = document.getElementById('markov-table');

    constructor() {
        this.table = {
            'F#3': {'F#3': 0.00, 'G#3': 0.1, 'A3': 0.15, 'B3': 0.20, 'C#4': 0.30, 'D4': 0.1, 'E4': 0.15},
            'G#3': {'F#3': 0.15, 'G#3': 0.00, 'A3': 0.2, 'B3': 0.20, 'C#4': 0.1, 'D4': 0.2, 'E4': 0.15},
            'A3':  {'F#3': 0.1, 'G#3': 0.2, 'A3': 0.00, 'B3': 0.30, 'C#4': 0.1, 'D4': 0.15, 'E4': 0.15},
            'B3':  {'F#3': 0.2, 'G#3': 0.15, 'A3': 0.30, 'B3': 0.00, 'C#4': 0.2, 'D4': 0.1, 'E4': 0.05},
            'C#4': {'F#3': 0.30, 'G#3': 0.1, 'A3': 0.15, 'B3': 0.1, 'C#4': 0.00, 'D4': 0.2, 'E4': 0.15},
            'D4':  {'F#3': 0.15, 'G#3': 0.2, 'A3': 0.15, 'B3': 0.1, 'C#4': 0.30, 'D4': 0.00, 'E4': 0.1},
            'E4':  {'F#3': 0.15, 'G#3': 0.20, 'A3': 0.1, 'B3': 0.15, 'C#4': 0.2, 'D4': 0.1, 'E4': 0.00}
        }

        this.buildTable();
    }

    buildTable = () => {
        // Set headers in colum and leave first cell empty
        const headerContainer = document.createElement('tr');
        headerContainer.innerHTML = '<th></th>';
        for (let note in this.table) {
            let header = document.createElement('th');
            header.innerText = note;
            headerContainer.appendChild(header);
        }
        this.markovTableElement.appendChild(headerContainer);

        // insert rows
        for (let note in this.table) {
            let row = document.createElement('tr');
            let rowHeader = document.createElement('th');
            rowHeader.innerText = note;
            row.appendChild(rowHeader);
            for (let note2 in this.table[note]) {
                let cell = document.createElement('td');
                cell.innerText = this.table[note][note2].toFixed(2);
                row.appendChild(cell);
            }
            this.markovTableElement.appendChild(row);
        }
    }

    randomNote = (note) => {
        let notes = Object.keys(this.table[note]);
        let probabilities = Object.values(this.table[note]);
        let randomNote = '';
        let random = Math.random();
        let sum = 0;
        for (let i = 0; i < probabilities.length; i++) {
            sum += probabilities[i];
            if (random < sum) {
                randomNote = notes[i];
                break;
            }
        }
        return randomNote;
    }

    updateTable = (note) => {
        // higlight current note
        const rows = this.markovTableElement.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.backgroundColor = '';

            });

            if (row.querySelector('th').innerText === note) {
                const cells = row.querySelectorAll('td');
                cells.forEach(cell => {
                    cell.style.backgroundColor = '#0e59cc';
                });
            }

        });
    }


}
