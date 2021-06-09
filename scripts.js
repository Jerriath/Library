function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    };

}


let library = {
    shelf: new Array(),
    addBookToLibrary: function(book) {
        this.shelf.push(book);
    },
    displayBooks: function() {
        let numOfBooks = this.shelf.length;
        for (let i = 0; i < numOfBooks; i++) 
        {
            console.log(this.shelf[i].info());
        }
    }
};

let hp = new Book("Harry Potter and the Halfblood Prince", "J. K. Rowling", "hella", "not read yet");
let hobbit = new Book("The Hobbit", "J. R. R. Tolkien", "HELLA", "not read yet");