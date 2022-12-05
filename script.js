let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    var entry = new Book(title, author, pages, read);
    myLibrary.push(entry);
}
function displayBooks() {
    for (const book in myLibrary){
   
        const sect = document.querySelector('.cards');
        
        const card = document.createElement('div');
        card.classList.add("card");
        card.setAttribute('id',book);
        
        for(const property in myLibrary[book]) {
            const para = document.createElement('p');
            para.classList.add(property);
            para.textContent = myLibrary[book][property];
            card.appendChild(para);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.textContent = "Remove"
        deleteBtn.style = 'padding: 4px 10px';
        card.appendChild(deleteBtn);

        sect.appendChild(card);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function refreshCards () {
    removeAllChildNodes(document.querySelector(".cards"));
    displayBooks();
}

addBookToLibrary("Meditations","Marcus Aurelius","99","Not Read");
addBookToLibrary("Backyard Guide to the Night Sky", "Andrew Fazekas", "283", "Read");

const form = document.querySelector("#book-form");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary(form[0].value, form[1].value, form[2].value, form[3].value);
    removeAllChildNodes(document.querySelector(".cards"));
    displayBooks();
} );

const newBook = document.querySelector(".new-book-btn")
newBook.addEventListener ('click', (event) =>{
    document.querySelector('.form-container').style.display = 'block';
} );


const cards = document.querySelector(".cards");
cards.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        const index = Number(event.target.parentElement.id);
        myLibrary.splice(index,1);
        console.table(myLibrary);
        refreshCards();
    }
})

displayBooks();
;