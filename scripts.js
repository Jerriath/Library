//Important variables
const bookShelf = document.querySelector("#library");
const addBookBtn = document.querySelector("#addBook");
const addBookDiv = document.querySelector("#addBookDiv")
const stats = document.querySelector("#stats");
const bookForm = document.querySelector("#bookForm");
const closeFormBtn = document.querySelector("#closeForm");
const submitBtn = document.querySelector("#submit");
const libraryContainer = document.querySelector("#library");
const statsBar = document.querySelector("#stats");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = null;
    this.info = () => {
        let readText = "Not Read Yet";
        if (read)
        {
            readText = "Already Read"
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
        let infoPage = createInfo(book);
        newBook.appendChild(infoPage);
        let bookText = document.createElement("h2");
        if (book.title.length > 40) 
        {
            let displayTitle = book.title;
            displayTitle = displayTitle.slice(0, 40);
            displayTitle = displayTitle + "...";
            bookText.textContent = displayTitle;
        }
        else 
        {
            bookText.textContent = book.title;
        }
        bookText.classList.add("bookText");
        newBook.appendChild(bookText);
        let info = document.createElement("button");
        info.textContent = "info";
        let removeBook = document.createElement("button");
        removeBook.textContent = "x";
        removeBook.classList.add("closeFormBtn");
        removeBook.addEventListener("click", function(e) {
            removeFromLib(e);
        });
        newBook.appendChild(removeBook);
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
        localStorage.setItem("libraryShelf", JSON.stringify(library.shelf));
        this.displayBooks();
        refreshStats();
    },
    //Function for displaying current books in console
    displayBooks: function() {
        let numOfBooks = this.shelf.length;
        if (libraryContainer.children.length != 1)
        {
            for (let i = 0; i < numOfBooks - 1; i++) 
            {
                if (libraryContainer.children[0] != addBookDiv)
                {
                    libraryContainer.removeChild(libraryContainer.children[0]);
                }
            }
        }
        for (let i = 0; i < numOfBooks; i++) 
        {
            library.shelf[i].index = i;
            this.addToDOM(library.shelf[i]);
        }
    },
    refreshLibrary: function() {
        let numOfBooks = this.shelf.length;
        for (let i = 0; i < numOfBooks; i++)
        {
            if (libraryContainer.children[0] != addBookDiv)
                {
                    libraryContainer.removeChild(libraryContainer.children[0]);
                }
        }
        for (let i = 0; i < numOfBooks; i++) 
        {
            library.shelf[i].index = i;
            this.addToDOM(library.shelf[i]);
        }
    }
};

//Checks localStorage to see if there is a library
if (localStorage.getItem("libraryShelf"))
{
    console.log("localLib");
    library.shelf = JSON.parse(localStorage.getItem("libraryShelf"));
    library.refreshLibrary();
}

//Function to make form appear when clicking addBookBtn
function openForm() {
    bookForm.style.display = "inline-block";
}

//Function to close form when clicking the x button
function closeForm() {
    bookForm.style.display = "none";
}

//Function to close infoPage when clicking the x button
function closeInfoPage(e) {
    e.target.parentElement.style.display = "none";
    e.target.parentElement.parentElement.children[2].style.display = "block";
}

//Function to add book to library after submitting form
function addBookToLib() {
    let newTitle = document.querySelector("#titleInput").value;
    let newAuthor = document.querySelector("#authorInput").value;
    let newPages = document.querySelector("#pagesInput").value;
    let newRead = document.querySelector("#readInput").value;
    if (newRead == "on")
    {
        newRead = true;
    }
    else {
        newRead = false;
    }
    newBook = new Book(newTitle, newAuthor, newPages, newRead);
    library.addToLibrary(newBook);
}

//Function to add book when clickling submit
submitBtn.addEventListener("click", () => {
    addBookToLib();
    document.querySelector("#titleInput").value = "";
    document.querySelector("#authorInput").value = "";
    document.querySelector("#pagesInput").value = "";
    document.querySelector("#readInput").checked = false;
    bookForm.style.display = "none";
});

//Function to create info page and return it
function createInfo(book) {
    let infoPage = document.createElement("div");
    infoPage.classList.add("book");
    infoPage.classList.add("infoPage");
    let closeInfo = document.createElement("button");
    closeInfo.classList.add("closeFormBtn");
    closeInfo.textContent = "x";
    infoPage.appendChild(closeInfo);
    fillInfo(infoPage, book);
    closeInfo.addEventListener("click", function(e){
        closeInfoPage(e);
    });
    return infoPage;
}

//Function to fill in information elements on info page
function fillInfo(infoPage, book) {
    let title = document.createElement("p");
    title.textContent = "Title: " + book.title;
    let author = document.createElement("p");
    author.textContent = "Author: " + book.author;
    let pages = document.createElement("p");
    pages.textContent ="Pages: " +  book.pages;
    let index = document.createElement("p");
    index.textContent = book.index;
    index.classList.add("index");
    let readYet = document.createElement("p");
    if (book.read)
    {
        readYet.textContent = "Status: Already Read"
    }
    else
    {
        readYet.textContent = "Status: Not Read Yet";
    }
    let changeStatusBtn = document.createElement("button");
    infoPage.appendChild(title);
    infoPage.appendChild(author);
    infoPage.appendChild(pages);
    infoPage.appendChild(index);
    infoPage.appendChild(readYet);
    infoPage.appendChild(changeStatusBtn);
    changeStatusBtn.addEventListener("click", function(e){
        changeStatus(e);
    });
    if (book.read) {
        changeStatusBtn.textContent = "Unread";
    }
    else {
        changeStatusBtn.textContent = "Read";
    }
}

//Function for info button functionality
function showInfo(e) {
    e.target.parentElement.firstChild.style.display = "block";
    e.target.parentElement.children[2].style.display = "none";
}

//Function to change read status
function changeStatus(e) {
    let index = e.target.parentElement.children[4].textContent;
    library.shelf[index].read = !library.shelf[index].read;
    let infoPage = e.target.parentElement;
    let read = library.shelf[index].read;
    if (read)
    {
        infoPage.children[5].textContent = "Status: Already Read";
        infoPage.children[6].textContent = "Unread";
    }
    else
    {
        infoPage.children[5].textContent = "Status: Not Read Yet";
        infoPage.children[6].textContent = "Read";
    }
    refreshStats();
}

//Function for removing a book from library
function removeFromLib(e) {
    console.log(e.target.parentElement.children[1].outerText);
    let book = e.target.parentElement;
    index = book.firstChild.children[4].textContent;
    library.shelf.splice(index, 1);
    book.remove();
    library.refreshLibrary();
    localStorage.setItem("libraryShelf", JSON.stringify(library.shelf));
    refreshStats();
}

//Function to refresh the stats bar
function refreshStats() {
    //This section of function retrieves info from library
    let numOfBooks = library.shelf.length;
    let booksRead = 0;
    let booksNotRead = 0;
    let pagesRead = 0;
    for (let i = 0; i < numOfBooks; i++)
    {
       if (library.shelf[i].read)
       {
           booksRead++;
           pagesRead += parseInt(library.shelf[i].pages);
       }
       else {
           booksNotRead++;
       }
    }

    //This section actually alters the DOM to update info
    document.querySelector("#totalBooks").textContent = "Books: " + numOfBooks;
    document.querySelector("#booksRead"). textContent = "Already Read: " + booksRead;
    document.querySelector("#notRead").textContent = "Bot Read Yet: " + booksNotRead;
    document.querySelector("#pagesRead").textContent = "Total Pages Read: " + pagesRead;
}


//Test books
let hp = new Book("Harry Potter and the Halfblood Prince", "J. K. Rowling", "hella", "not read yet");
let hobbit = new Book("The Hobbit", "J. R. R. Tolkien", "HELLA", "not read yet");