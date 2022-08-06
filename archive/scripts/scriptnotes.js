/*jshint esversion:6*/
console.log("Hello to pretty Notes Console !");
showNotes();
var cs = 0;
// Get Elements

var addbtn = document.getElementById('addBtn');
addbtn.addEventListener('click', () => {
    var addText = document.getElementById('noteHere');
    if (addText.value == "") { console.log("First Enter something"); } else {
        notes = localStorage.getItem('notes');
        if (notes == null) {
            myNotesarr = [];
        } else {
            myNotesarr = JSON.parse(notes);
        }
        myNotesarr.push(addText.value);
        localStorage.setItem('notes', JSON.stringify(myNotesarr));
        addText.value = "";
        showNotes();
    }
});

function showNotes() {
    var basic = "";
    var notesObj = localStorage.getItem('notes');
    var notesSpace;
    if (notesObj == null || JSON.parse(notesObj).length == 0) {
        notesSpace = document.getElementById('notes');
        notesSpace.innerHTML = `<em>You have no notes. Take down some notes and be organised.</em>`;
    } else {
        var ourNotes = JSON.parse(notesObj);
        ourNotes.forEach((element, index) => {
            basic += `
                <div class="card" style="width: 18rem; margin: 15px;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index+1}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="delNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
            `;
        });
        notesSpace = document.getElementById('notes');
        notesSpace.innerHTML = basic;
    }
}

function delNote(index) {
    console.log(`${index} Note is deleted`);
    var deleteNoteObj = localStorage.getItem('notes');
    var deleteNote = JSON.parse(deleteNoteObj);
    deleteNote.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(deleteNote));
    showNotes();
}

function n_search() {
    var cs_btn = document.getElementById('cs_btn');
    cs_btn.innerText = "Search";
    cs_btn.id = "s_btn";
    document.getElementById('s_text').value = "";
    showNotes();
    var s_Btn = document.getElementById('s_btn');
    s_Btn.addEventListener('click', search_t());
    cs_btn.removeEventListener('click', n_search);
    var notes_h = document.getElementById('notes_h');
    notes_h.innerText = "Your Notes :";
}

function search_t() {
    var notes_h = document.getElementById('notes_h');
    notes_h.innerText = "Notes from search results :";
    var allNotesObj = localStorage.getItem('notes');
    var allNotes = JSON.parse(allNotesObj);
    var s_text = document.getElementById('s_text');
    var r_text = s_text.value;
    if (r_text == "") {
        showNotes();
        return;
    }
    var temp = [];
    allNotes.forEach((element, index) => {
        if (element.includes(r_text)) {
            temp.push([element, index]);
        }
    });
    var basic = "";
    var notesSpace;
    if (temp.length != 0) {
        temp.forEach((element) => {
            basic += `
                <div class="card" style="width: 18rem; margin: 15px;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${element[1]+1}</h5>
                        <p class="card-text">${element[0]}</p>
                        <button id="${element[1]}" onclick="delNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
            `;
        });
        notesSpace = document.getElementById('notes');
        notesSpace.innerHTML = basic;
    } else {
        notesSpace = document.getElementById('notes');
        notesSpace.innerHTML = `<em>None of your notes matches you search.</em>`;
    }
    s_Btn.innerText = "Cancel Search";
    s_Btn.id = "cs_btn";
    var cs_btn = document.getElementById('cs_btn');
    cs_btn.addEventListener('click', n_search);
}

var s_Btn = document.getElementById('s_btn');
s_Btn.addEventListener('click', search_t);