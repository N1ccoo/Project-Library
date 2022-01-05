let myLibrary = []

function Book(name,author,pages,status) {
    this.name = name
    this.author = author
    this.pages = pages
    this.status = status
}


function addBookToLibrary(item) {
    myLibrary.push(item)
}

let bookOne = new Book('Dunno','Nicco',20,false)


let submitBtn = document.getElementById('submit')
let addBookBtn = document.getElementById('addBookBtn')
let formPopup = document.getElementById('form-popup')
let popup = document.getElementById('popup-container')
let header = document.getElementById('header')
let sticky = header.offsetTop

let Title = document.getElementById('title')
let Author = document.getElementById('author')
let Pages = document.getElementById('pages')
let Status = document.getElementById('status')

let gridContainer = document.getElementById('grid-container')

addBookBtn.addEventListener('click',unhidePopup)
formPopup.addEventListener('submit',hidePopup)
formPopup.addEventListener('submit',createBook)
window.addEventListener('scroll',stickyNav)

function unhidePopup(e) {
 popup.classList.remove('hidden')
 document.addEventListener('click',closeForm)
}

function hidePopup(e) {
 e.preventDefault()
 popup.classList.add('hidden')
}

function createBook() {
   let newBook = new Book(Title.value, Author.value, Pages.value, Status.value)
   myLibrary.push(newBook)
   formPopup.reset()

   createGridLayout()
}

function closeForm(e) {
   let path = e.composedPath()
    const withinBoundaries = path.includes(formPopup) || path.includes(addBookBtn)
    
  if (!(withinBoundaries)) {
    popup.classList.add('hidden')
  }
}

function stickyNav() {
    if(window.pageYOffset > sticky) {
        header.classList.add('sticky')
        header.classList.add('headerSticky')
    } else {
        header.classList.remove('sticky')
        header.classList.remove('headerSticky')
    }
}

function createGridLayout() {
    let rows = Math.ceil(myLibrary.length / 3)
    gridContainer.style.gridTemplateRows = `repeat(${rows},600px)`
    gridContainer.innerText= ''

    myLibrary.forEach(createBookCard)

    function createBookCard(book) {
    let bookCard = document.createElement('div')
    bookCard.classList.add('book-card')
    gridContainer.append(bookCard)

    let Title = document.createElement('div')
    Title.textContent = `Title: ${book.name}`
    Title.classList.add('book-card-text')
    bookCard.append(Title)

    let Author = document.createElement('div')
    Author.textContent = `Author: ${book.author}`
    Author.classList.add('book-card-text')
    bookCard.append(Author)

    let Pages = document.createElement('div')
    Pages.textContent = `Pages: ${book.pages}`
    Pages.classList.add('book-card-text')
    bookCard.append(Pages)

    let Status = document.createElement('button')
    Status.textContent = `${book.status}`
    Status.classList.add('book-card-btn')
    bookCard.append(Status)
    Status.addEventListener('click',readingToFinished)
    
    function readingToFinished(e) {
    Status.addEventListener('click',finishedToDropped)
    Status.removeEventListener('click',readingToFinished)
    book.status = 'Finished'
    e.target.textContent = book.status
    }

    function finishedToDropped(e) {
    Status.addEventListener('click',droppedToReading)
    Status.removeEventListener('click',finishedToDropped)
    book.status = 'Dropped'
    e.target.textContent = book.status
    }

    function droppedToReading(e) {
    Status.addEventListener('click',readingToFinished)
    Status.removeEventListener('click',droppedToReading)
    book.status = 'Reading'
    e.target.textContent = book.status
    }
    
    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('book-card-btn')   
    bookCard.append(deleteBtn)
    deleteBtn.addEventListener('click',e => {
        myLibrary.pop(book)
        bookCard.remove()
    })

    }
}

