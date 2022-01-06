let myLibrary = []

function Book(name, author, pagesTotal, pagesRead, status) {
	this.name = name
	this.author = author
	this.pagesRead = pagesRead
    this.pagesTotal = pagesTotal
	this.status = status
	this.insertion = new Date()

    console.log(this.pagesRead, this.pagesTotal)
    if (parseInt(this.pagesRead) >= parseInt(this.pagesTotal)) {
        this.pagesRead = this.pagesTotal 
        this.status = 'Finished'
    }
}


function addBookToLibrary(item) {
	myLibrary.push(item);
}

let bookOne = new Book('Dunno', 'Nicco', 20, false);


let submitBtn = document.getElementById('submit');
let addBookBtn = document.getElementById('addBookBtn');
let formPopup = document.getElementById('form-popup');
let popup = document.getElementById('popup-container');
let header = document.getElementById('header');
let sticky = header.offsetTop;

let infoBookCount = document.getElementById('total-book-count');
let infoBookFinished = document.getElementById('total-book-finished');
let infoBookReading = document.getElementById('total-book-reading');
let infoBookDropped = document.getElementById('total-book-dropped');

let Title = document.getElementById('title');
let Author = document.getElementById('author');
let PagesTotalInput = document.getElementById('pagesTotal');
let PagesReadInput = document.getElementById('pagesRead');
let Status = document.getElementById('status');

let gridContainer = document.getElementById('grid-container');

addBookBtn.addEventListener('click', unhidePopup);
formPopup.addEventListener('submit', hidePopup);
formPopup.addEventListener('submit', createBook);
window.addEventListener('scroll', stickyNav);

function unhidePopup(e) {
	popup.classList.remove('hidden');
	document.addEventListener('click', closeForm);
}

function hidePopup(e) {
	e.preventDefault();
	popup.classList.add('hidden');
}

function createBook() {
	let newBook = new Book(Title.value, Author.value, PagesTotalInput.value, PagesReadInput.value, Status.value);
	myLibrary.push(newBook);
	formPopup.reset();

	createGridLayout();
}

function closeForm(e) {
	let path = e.composedPath();
	const withinBoundaries = path.includes(formPopup) || path.includes(addBookBtn);

	if (!(withinBoundaries)) {
		popup.classList.add('hidden');
	}
}

function stickyNav() {
	if (window.pageYOffset > sticky) {
		header.classList.add('sticky');
		header.classList.add('headerSticky');
	} else {
		header.classList.remove('sticky');
		header.classList.remove('headerSticky');
	}
}

function createGridLayout() {
	let rows = Math.ceil(myLibrary.length / 3);
	gridContainer.style.gridTemplateRows = `repeat(${rows},400px)`;
	gridContainer.innerText = '';

	myLibrary.forEach(createBookCard);

	function createBookCard(book) {
		let bookCard = document.createElement('div');
		bookCard.classList.add('book-card');
		gridContainer.append(bookCard);

        let container = document.createElement('div')
        container.classList.add('card-container')
        bookCard.append(container)


		let Title = document.createElement('div');
		Title.textContent = `Title: ${book.name}`;
		Title.classList.add('book-card-text');
		container.append(Title);

		let Author = document.createElement('div');
		Author.textContent = `Author: ${book.author}`;
		Author.classList.add('book-card-text');
		container.append(Author);

		let PagesTotal = document.createElement('div');
		PagesTotal.textContent = `Pages Total: ${book.pagesTotal}`;
		PagesTotal.classList.add('book-card-text');
		container.append(PagesTotal);

        let PagesRead = document.createElement('div');
		PagesRead.textContent = `Pages Read: ${book.pagesRead}`;
		PagesRead.classList.add('book-card-text');
		container.append(PagesRead);

		let Status = document.createElement('button');
		Status.textContent = `${book.status}`;
		Status.classList.add('book-card-btn');
		bookCard.append(Status);
		Status.addEventListener('click', readingToFinished);

		function readingToFinished(e) {
			Status.addEventListener('click', finishedToDropped);
			Status.removeEventListener('click', readingToFinished);
			book.status = 'Finished';
			e.target.textContent = book.status;
		}

		function finishedToDropped(e) {
			Status.addEventListener('click', droppedToReading);
			Status.removeEventListener('click', finishedToDropped);
			book.status = 'Dropped';
			e.target.textContent = book.status;
		}

		function droppedToReading(e) {
			Status.addEventListener('click', readingToFinished);
			Status.removeEventListener('click', droppedToReading);
			book.status = 'Reading';
			e.target.textContent = book.status;
		}

		let deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Delete';
		deleteBtn.classList.add('book-card-btn');
		bookCard.append(deleteBtn);
		deleteBtn.addEventListener('click', e => {
			myLibrary.pop(book);
			bookCard.remove();
		});

	}
}

function updateInfo() {
	tally = myLibrary.reduce(tallyStatus, {
		Reading: 0,
		Finished: 0,
		Dropped: 0
	});

	infoBookCount.textContent = `Total Books : ${myLibrary.length}`
	infoBookFinished.textContent = `Books Finished : ${tally['Finished']}`
	infoBookReading.textContent = `Currently Reading : ${tally['Reading']}`
	infoBookDropped.textContent = `Books Dropped : ${tally['Dropped']}`

	function tallyStatus(total, book) {
		if (book.status in total) {
			total[book.status]++
		}
		return total
	}
}

function sortLibraryInsertion(order) {
	if (order === 'ascending') {
		myLibrary.sort(sortInsertion)
	} else {
		myLibrary.sort(sortInsertionReverse)
	}
	createGridLayout()

	function sortInsertionReverse(a, b) {
		return b.insertion - a.insertion

	}

	function sortInsertion(a, b) {
		return a.insertion - b.insertion

	}
}

