function initStorage() {
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      if(localStorage.getItem(`${cards[0][i].replace(/\s/g, "")}_${cards[i+1][j].word.replace(" ", "-")}`) === null) {
        let obj = {
            train: 0, 
            play: 0,
            error: 0
        }
        let str = JSON.stringify(obj);
        localStorage.setItem(`${cards[0][i].replace(/\s/g, "")}_${cards[i+1][j].word.replace(" ", "-")}`, str);
      }
    }
  }
}
initStorage();

const table = document.querySelector('tbody');
function createTable() {
    for (let i = 0, j=0; i<64; i++,j=Math.trunc(i/8)) {
        const str = document.createElement('tr');
        str.id = `${cards[j+1][i%8].word.replace(" ", "")}cell${i}`;
        const cell1 = document.createElement('td');
        cell1.innerHTML = `${cards[0][j]}`;
        str.append(cell1);
        const cell2 = document.createElement('td');
        cell2.innerHTML = `${cards[j+1][i%8].word}`;
        str.append(cell2);
        const cell3 = document.createElement('td');
        cell3.innerHTML = `${cards[j+1][i%8].translation}`;
        str.append(cell3);
        let strObj = localStorage.getItem(`${cards[0][j].replace(/\s/g, "")}_${cards[j+1][i%8].word.replace(" ", "-")}`);
        let obj = JSON.parse(strObj);
        let perc  = obj.play+obj.error !== 0? rounding(100*obj.error/(obj.play+obj.error)) :0;        
        str.innerHTML += `<td>${obj.train}</td><td>${obj.play}</td><td>${obj.error}</td><td>${perc}</td>`;    
        table.append(str);
    }
}
createTable();
function updateTable() {
    for (let i = 0, j=0; i<64; i++,j=Math.trunc(i/8)) {
        let strObj = localStorage.getItem(`${cards[0][j].replace(/\s/g, "")}_${cards[j+1][i%8].word.replace(" ", "-")}`);
        let obj = JSON.parse(strObj);
        let m = cards[j+1][i%8].word.replace(" ", "-");
        document.querySelector(`#${cards[j+1][i%8].word.replace(" ", "")}cell${i}`).childNodes[3].innerHTML = `${obj.train}`;
        document.querySelector(`#${cards[j+1][i%8].word.replace(" ", "")}cell${i}`).childNodes[4].innerHTML = `${obj.play}`;
        document.querySelector(`#${cards[j+1][i%8].word.replace(" ", "")}cell${i}`).childNodes[5].innerHTML = `${obj.error}`;
        let perc  = obj.play+obj.error !== 0? rounding(100*obj.error/(obj.play+obj.error)) :0;
        document.querySelector(`#${cards[j+1][i%8].word.replace(" ", "")}cell${i}`).childNodes[6].innerHTML = `${perc}`;
    }    
}

function rounding(num) {
    return Math.trunc(num * 100) / 100;
}

let order = -1;
function sortTable(event, index) { 
    order *= -1;
    let prop;
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });

    const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
    );

    for (let tBody of document.querySelector("table").tBodies) {
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));
    }
    if (order === 1) prop = "increase" 
    else prop = "decrease";
    for(const cell of event.target.parentNode.cells){        
        cell.classList.toggle(`sorted`, cell === event.target);
        cell.classList.remove("increase");
        cell.classList.remove("decrease");
        cell.classList.toggle(`${prop}`, cell === event.target);
    }    
}

document.querySelectorAll('.table thead th').forEach(el => {
    el.addEventListener('click', (event) => {
        sortTable(event, event.target.cellIndex);
    });
});

const reset = document.querySelector('.btn-reset');
reset.addEventListener('click', () => {
    for (let i = 0, j=0; i<64; i++,j=Math.trunc(i/8)) {
        let strObj = localStorage.getItem(`${cards[0][j].replace(/\s/g, "")}_${cards[j+1][i%8].word.replace(" ", "-")}`);
        let obj = JSON.parse(strObj);
        obj.train = obj.play = obj.error = 0;
        let str = JSON.stringify(obj);
        localStorage.setItem(`${cards[0][j].replace(/\s/g, "")}_${cards[j+1][i%8].word.replace(" ", "-")}`, str);        
    }
    updateTable();
})


