//Important variables
const bookShelf = document.querySelector("#library");
const addBookBtn = document.querySelector("#addBook");
const addBookDiv = document.querySelector("#addBookDiv")
const stats = document.querySelector("#stats");
const bookForm = document.querySelector("#bookForm");
const closeFormBtn = document.querySelector("#closeForm");
const submitBtn = document.querySelector("#submit");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        let readText = "not read yet";
        if (read)
        {
            readText = "have already read"
        }
        return `${title} by ${author}, ${pages} pages, ${readText}`;
    };

}

//Declaring the library object and associated attributs and functions
let library = {
    shelf: new Array(),
    //Function to create a new div element to add to DOM
    addToDOM: function(book) {
        let newBook = document.createElement("div");
        newBook.classList.add("book");
        let bookText = document.createElement("h2");
        bookText.textContent = book.title;
        bookText.classList.add("bookText");
        newBook.appendChild(bookText);
        let info = document.createElement("button");
        info.textContent = "info";
        info.addEventListener("click", function(e){
            showInfo(e);
        });
        info.classList.add("infoBtn");
        newBook.appendChild(info);
        bookShelf.insertBefore(newBook, addBookDiv);
    },
    //Function to add a new book to the shelf array
    addToLibrary: function(book) {
        this.shelf.push(book);
        this.displayBooks();
    },
    //Function for displaying current books in console
    displayBooks: function() {
        let numOfBooks = this.shelf.length;
        for (let i = 0; i < numOfBooks; i++) 
        {
            this.addToDOM(library.shelf[i]);
        }
    },
};

//Function to make form appear when clicking addBookBtn
function openForm() {
    bookForm.style.display = "inline-block";
}

//Function to close form when clicking the x button
function closeForm() {
    bookForm.style.display = "none";
}

//Function to add book to library after submitting form (NOT IMPLEMENTED)
function addBookToLib() {
    let newTitle = document.querySelector("#titleInput").value;
    let newAuthor = document.querySelector("#authorInput").value;
    let newPages = document.querySelector("#pagesInput").value;
    let newRead = document.querySelector("#readInput").value;
    newBook = new Book(newTitle, newAuthor, newPages, newRead);
    library.addToLibrary(newBook);
}

//Function to add book when clickling submit
submitBtn.addEventListener("click", () => {
    addBookToLib();
    bookForm.style.display = "none";
});

//Function for info button functionality (NOT IMPLEMENTED)
function showInfo(e) {
    return;
}



//Test books
let hp = new Book("Harry Potter and the Halfblood Prince", "J. K. Rowling", "hella", "not read yet");
let hobbit = new Book("The Hobbit", "J. R. R. Tolkien", "HELLA", "not read yet");