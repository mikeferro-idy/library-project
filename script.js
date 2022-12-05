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
            const para = document.createElement('div');
            para.classList.add(property);
            if (property === 'read')
                para.textContent = readBooleanTranslator(myLibrary[book][property]);
            else    
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

function readBooleanTranslator(isRead) {
    if (isRead) return "Read";
    else return "Not Read"
}

addBookToLibrary("Meditations","Marcus Aurelius","99",true);
addBookToLibrary("Backyard Guide to the Night Sky", "Andrew Fazekas", "283", false);

const form = document.querySelector("#book-form");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Radio button for if the book is read 
    let isRead = false;
    if (form[4].checked) 
        isRead = true;

    addBookToLibrary(form[0].value, form[1].value, form[2].value, isRead);
    refreshCards();
} );

const newBook = document.querySelector(".new-book-btn")
newBook.addEventListener ('click', (event) =>{
    document.querySelector('.form-container').style.display = 'block';
    document.querySelector('.top-box').style.display = 'none';
} );

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        const index = Number(event.target.parentElement.id);
        myLibrary.splice(index,1);
        refreshCards();
    }
    if (event.target.classList.contains('read')) {
        const index = event.target.parentElement.id;
        myLibrary[index].read = !(myLibrary[index].read);
        refreshCards();
    }
    if (event.target.classList.contains('asdf')) {
        document.querySelector('.form-container').style.display = 'none';
        document.querySelector('.top-box').style.display = 'flex';
        console.log('yes');
    }
});


displayBooks();
