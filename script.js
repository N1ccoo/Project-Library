let myLibrary = []

function Book(name,author,pages,read) {
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
}


function addBookToLibrary(item) {
    myLibrary.push(item)
}


let bookOne = new Book('Dunno','Nicco',20,false)

