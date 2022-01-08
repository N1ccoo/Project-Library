let myLibrary = []

function Book(name, author, pagesTotal, pagesRead, status) {
	this.name = name
	this.author = author
	this.pagesRead = pagesRead
	this.pagesTotal = pagesTotal
	this.status = status
	this.insertion = new Date()


	if (parseInt(this.pagesRead) >= parseInt(this.pagesTotal)) {
		this.pagesRead = this.pagesTotal
		this.status = 'Finished'
	}
}

function addBookToLibrary(item) {
	myLibrary.push(item);

}

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
let infoBookPagesRead = document.getElementById('total-book-pages-read');

let Title = document.getElementById('title');
let Author = document.getElementById('author');
let PagesTotalInput = document.getElementById('pagesTotal');
let PagesReadInput = document.getElementById('pagesRead');
let Status = document.getElementById('status');

let searchOrder = document.getElementById('order')
let searchSort = document.getElementById('sort')
let searchBar = document.getElementById('search-bar')

searchBar.addEventListener('input',searchBookName)

function searchBookName(e) {
 let Library = Array.from(document.getElementsByClassName('names'))
	if (this.value.length > 0) { 
	 
	 Library.forEach(item => {
		 if (!(item.textContent.toLowerCase().includes(searchBar.value.toLowerCase()))){
			 item.parentElement.parentElement.parentElement.classList.add('hidden')
		 } else {
			 item.parentElement.parentElement.parentElement.classList.remove('hidden')
		 }
	 })
 } else {
	 Library.forEach(item => {
		item.parentElement.parentElement.parentElement.classList.remove('hidden')
	 })
 } 
}

function includesText(book) {
 

}

searchOrder.addEventListener('input',orderSortLogic)
searchSort.addEventListener('input',orderSortLogic)

function orderSortLogic() {
	if (searchSort.value === 'Insertion') {
		sortLibraryInsertion(searchOrder.value)
	} else if (searchSort.value === 'Title') {
		sortLibraryName(searchOrder.value)
	} else if (searchSort.value === 'Status') {
		sortLibraryStatus(searchOrder.value)
	}
}

let gridContainer = document.getElementById('grid-container');

addBookBtn.addEventListener('click', unhidePopup);
formPopup.addEventListener('submit', hidePopup);
formPopup.addEventListener('submit', createBook);
formPopup.addEventListener('submit', updateInfo)
window.addEventListener('scroll', stickyNav);

PagesReadInput.addEventListener('input',formPagesLogic)
PagesTotalInput.addEventListener('input',formPagesLogic)

function formPagesLogic(e) {
    if (PagesTotalInput.value === PagesReadInput.value) {
        Status.value = 'Finished'
    } else if (Status.value === 'Finished' && PagesTotalInput.value > PagesReadInput.value) {
        Status.value = 'Reading'
    }
}

Status.addEventListener('input',formStatusLogic)
PagesReadInput.addEventListener('input',updatePreviousReadValue)

let formPreviousReadValue = 1

PagesTotalInput.addEventListener('input',limitReadPages)

function limitReadPages(e) {
    console.log(this.value)
    PagesReadInput.setAttribute('max',`${this.value}`)
}

function formStatusLogic(e) {
    console.log(e)
    if (Status.value === 'Finished') {
        PagesReadInput.value = PagesTotalInput.value
        PagesReadInput.textContent = PagesReadInput.value
    } else {
        PagesReadInput.value = formPreviousReadValue
    }
}

function updatePreviousReadValue(e) {
    formPreviousReadValue = e.target.value
}

function unhidePopup(e) {
	popup.classList.remove('hidden');
	document.addEventListener('click', closeForm);
	overlayBlur()
}

function hidePopup(e) {
	e.preventDefault();
	popup.classList.add('hidden');
	removeOverlayBlur()
}

function createBook() {
	if (parseInt(PagesReadInput.value) > parseInt(PagesTotalInput.value)) {
		PagesReadInput.value = PagesTotalInput.value
	}

	let newBook = new Book(Title.value, Author.value, parseInt(PagesTotalInput.value), parseInt(PagesReadInput.value), Status.value);
	myLibrary.push(newBook);
	formPopup.reset();

	createGridLayout();
}

function closeForm(e) {
	let path = e.composedPath();
	const withinBoundaries = path.includes(formPopup) || path.includes(addBookBtn);

	if (!(withinBoundaries)) {
		popup.classList.add('hidden');
		removeOverlayBlur()
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
	gridContainer.style.gridTemplateRows = `repeat(${rows},500px)`;
	gridContainer.innerText = '';

	myLibrary.forEach(createBookCard);



	function createBookCard(book) {
		let bookCard = document.createElement('div');
		bookCard.classList.add('book-card');
		gridContainer.append(bookCard);

		let container = document.createElement('div')
		container.classList.add('card-container')
		bookCard.append(container)

		

		//Title

		let textContainer = document.createElement('div')
		textContainer.classList.add('flex')
		container.append(textContainer)


		let textDivision = document.createElement('div')
		textDivision.classList.add('book-card-text')
		textDivision.textContent = 'Title : '
		textContainer.append(textDivision)


		let TitleInfo = document.createElement('div');
		TitleInfo.textContent = book.name;
		TitleInfo.classList.add('book-card-text');
		TitleInfo.classList.add('names')
		textContainer.append(TitleInfo);

		//Author

		textContainer = document.createElement('div')
		textContainer.classList.add('flex')
		container.append(textContainer)


		textDivision = document.createElement('div')
		textDivision.classList.add('book-card-text')
		textDivision.textContent = 'Author : '
		textContainer.append(textDivision)

		let AuthorInfo = document.createElement('div');
		AuthorInfo.textContent = book.author;
		AuthorInfo.classList.add('book-card-text');	
		textContainer.append(AuthorInfo);

		//PagesTotalInfo

		textContainer = document.createElement('div')
		textContainer.classList.add('flex')
		container.append(textContainer)


		textDivision = document.createElement('div')
		textDivision.classList.add('book-card-text')
		textDivision.textContent = 'Total Pages : '
		textContainer.append(textDivision)

		let PagesTotalInfo = document.createElement('div');
		PagesTotalInfo.textContent = book.pagesTotal;
		PagesTotalInfo.classList.add('book-card-text');
		textContainer.append(PagesTotalInfo);

		//PagesReadInfo

		textContainer = document.createElement('div')
		textContainer.classList.add('flex')
		container.append(textContainer)

		textDivision = document.createElement('div')
		textDivision.classList.add('book-card-text')
		textDivision.textContent = 'Pages Read : '
		textContainer.append(textDivision)

		let PagesReadInfo = document.createElement('div');
		PagesReadInfo.textContent = book.pagesRead;
		PagesReadInfo.classList.add('book-card-text');
		textContainer.append(PagesReadInfo);

		let containerButton = document.createElement('div')
		containerButton.classList.add('card-button-container')
		container.append(containerButton)

		let Edit = document.createElement('button');
		Edit.addEventListener('click', editBook)
		Edit.classList.add('book-card-btn')
		Edit.classList.add('btn-grad')
		Edit.innerText = 'Edit'
		containerButton.append(Edit)

		let Status = document.createElement('button');
		Status.textContent = `${book.status}`;

		Status.classList.add('book-card-btn');
		Status.classList.add('btn-grad');
		containerButton.append(Status);

		Status.addEventListener('click', statusCycle);
		Status.addEventListener('click', updateInfo)

		if (Status.textContent === 'Reading') {
			bookCard.classList.add('reading')
		} else if (Status.textContent === 'Finished') {
			bookCard.classList.add('finished')
		} else if (Status.textContent === 'Dropped') {
			bookCard.classList.add('dropped')
		}

		let previousReadValue = 1

		function statusCycle(e) {

			if (Status.textContent === 'Reading') {
				readingToDropped(e)
				previousReadValue = book.pagesRead
			} else if (Status.textContent === 'Dropped') {
				droppedToFinished(e)
			} else if (Status.textContent === 'Finished') {
				finishedToReading(e)
			}

			function readingToDropped(e) {
				book.status = 'Dropped';
				e.target.textContent = book.status;
				bookCard.classList.add('dropped')
				bookCard.classList.remove('reading')
				previousReadValue = book.pagesRead
			}

			function droppedToFinished(e) {
				book.status = 'Finished';
				e.target.textContent = book.status;
				bookCard.classList.add('finished')
				bookCard.classList.remove('dropped')
				previousReadValue = book.pagesRead
				book.pagesRead = book.pagesTotal
				PagesReadInfo.textContent = book.pagesRead
			}

			function finishedToReading(e) {
				book.status = 'Reading';
				e.target.textContent = book.status;
				bookCard.classList.add('reading')
				bookCard.classList.remove('finished')

                if (previousReadValue !== book.pagesTotal) {
                    book.pagesRead = previousReadValue
				PagesReadInfo.textContent = book.pagesRead
                } else { 
                previousReadValue = 1
                book.pagesRead = previousReadValue
				PagesReadInfo.textContent = book.pagesRead
                }
			}
		}



		let deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Delete';
		deleteBtn.classList.add('red-background')
		deleteBtn.classList.add('book-card-btn');
		containerButton.append(deleteBtn);
		deleteBtn.addEventListener('click', e => {
			myLibrary.pop(book);
			bookCard.remove();
            updateInfo()
		});

		PagesReadInfo.addEventListener('input', cardCharLimit)
		PagesTotalInfo.addEventListener('input', cardCharLimit)
		AuthorInfo.addEventListener('input', cardCharLimit)
		TitleInfo.addEventListener('input', cardCharLimit)




		function cardCharLimit(e) {
			let pagesArray = PagesReadInfo.textContent.split('')
			let pagesTotalArray = PagesTotalInfo.textContent.split('')
			let titleArray = TitleInfo.textContent.split('')
			let authorArray = AuthorInfo.textContent.split('')

			if (pagesArray.length > 9) {
				let limit = pagesArray.slice(0, 9)
				PagesReadInfo.textContent = limit.join('')
				book.pagesRead = PagesReadInfo.textContent
				PagesReadInfo.blur()
			}

			if (pagesTotalArray.length > 9) {
				let limit = pagesTotalArray.slice(0, 9)
				PagesTotalInfo.textContent = limit.join('')
				book.pagesTotal = PagesTotalInfo.textContent
				PagesTotalInfo.blur()
			}

			if (titleArray.length > 19) {
				let limit = titleArray.slice(0, 25)
				TitleInfo.textContent = limit.join('')
				book.name = TitleInfo.textContent
				TitleInfo.blur()
			}

			if (authorArray.length > 19) {
				let limit = authorArray.slice(0, 25)
				AuthorInfo.textContent = limit.join('')
				book.author = AuthorInfo.textContent
				AuthorInfo.blur()
			}
		}

		function editBook(e) {
			PagesReadInfo.contentEditable = true
			PagesTotalInfo.contentEditable = true
			AuthorInfo.contentEditable = true
			TitleInfo.contentEditable = true
			Edit.textContent = 'Done'

			e.target.removeEventListener('click', editBook)
			e.target.addEventListener('click', updateInfo)
			e.target.addEventListener('click', editBookDone)
			emptyEdits()
			
			bookCard.classList.add('scale')


			function editBookDone(e) {
				e.target.textContent = 'Edit'
				PagesReadInfo.contentEditable = false
				PagesTotalInfo.contentEditable = false
				AuthorInfo.contentEditable = false
				TitleInfo.contentEditable = false
				emptyEdits()
				e.target.addEventListener('click', editBook)
				e.target.removeEventListener('click', editBookDone)

				bookCard.classList.remove('scale')
				book.name = TitleInfo.textContent
				book.author = AuthorInfo.textContent
				book.pagesRead = parseInt(PagesReadInfo.textContent)
				book.pagesTotal = parseInt(PagesTotalInfo.textContent)

				PagesReadInfo.textContent = book.pagesRead
				PagesTotalInfo.textContent = book.pagesTotal

				if (PagesReadInfo.textContent === 'NaN') {
					PagesReadInfo.textContent = 1
					book.pagesRead = 1
				}

				if (PagesTotalInfo.textContent === 'NaN') {
					PagesTotalInfo.textContent = 1
					book.pagesTotal = 1
				}


				if (parseInt(PagesReadInfo.textContent) > parseInt(PagesTotalInfo.textContent)) {
					book.pagesRead = book.pagesTotal
					PagesReadInfo.textContent = book.pagesRead
				}

                if (parseInt(PagesTotalInfo.textContent) === (parseInt(PagesReadInfo.textContent))) {
                    bookCard.classList.remove('reading')
                    bookCard.classList.remove('dropped')
                    bookCard.classList.add('finished')
                    book.status = 'Finished'
                    Status.textContent = book.status
                }

                if(book.status == 'Finished' &&  parseInt(PagesTotalInfo.textContent) > parseInt(PagesReadInfo.textContent)) {
                    bookCard.classList.remove('finished')
                    bookCard.classList.add('reading')
                    book.status = 'Reading'
                    Status.textContent = book.status
                }

			}

		}

		function emptyEdits() {
			if (PagesReadInfo.textContent === '') {
				PagesReadInfo.textContent = 1
			}
			if (PagesTotalInfo.textContent === '') {
				PagesTotalInfo.textContent = 1
			}
			if (AuthorInfo.textContent === '') {
				AuthorInfo.textContent = 'Unknown'
			}
			if (TitleInfo.textContent === '') {
				TitleInfo.textContent = 'Unknown'
			}

            if (parseInt(PagesReadInfo.textContent) < 1) {
                book.pagesRead = 1
                PagesReadInfo.textContent = book.pagesRead
                console.log('works')
            }

            if(parseInt(PagesTotalInfo.textContent) < 1) {
                book.pagesTotal = 1 
                PagesTotalInfo.textContent = book.pagesTotal
            }

		}
	}
}

function updateInfo() {
	ReadPages = myLibrary.reduce(totalPagesRead, 0)

	tally = myLibrary.reduce(tallyStatus, {
		Reading: 0,
		Finished: 0,
		Dropped: 0
	});

	infoBookCount.textContent = `Total Books : ${myLibrary.length}`
	infoBookPagesRead.textContent = `Total Pages Read : ${ReadPages}`
	infoBookFinished.textContent = `Books Finished : ${tally['Finished']}`
	infoBookReading.textContent = `Currently Reading : ${tally['Reading']}`
	infoBookDropped.textContent = `Books Dropped : ${tally['Dropped']}`


	function tallyStatus(total, book) {
		if (book.status in total) {
			total[book.status]++
		}
		return total
	}

	function totalPagesRead(total, book) {
		total += parseInt(book.pagesRead)
		return total
	}
}

function sortLibraryInsertion(order) {
	if (order === 'Ascending') {
		myLibrary.sort(sortInsertion)
	} else if (order === 'Descending') { 
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

function sortLibraryName(order) {
	if(order === 'Ascending') {
		myLibrary.sort(sortName)
	} else if (order === 'Descending'){
		myLibrary.sort(sortNameReverse)
	}

	createGridLayout()

	function sortNameReverse(a,b) {
		return a.name > b.name
	}

	function sortName(a,b) {
		return a.name < b.name
	}
}

function sortLibraryStatus(order) {
	if(order === 'Ascending') {
		myLibrary.sort(sortStatus)
	} else if (order === 'Descending') {
		myLibrary.sort(sortStatusReverse)
	}

	createGridLayout()

	function sortStatusReverse(a,b) {
		let valueOne = (a.status === 'Reading') ? 'a' : (a.status === 'Finished') ? 'b' : 'c'
		let valueTwo = (b.status === 'Reading') ? 'a' : (b.status === 'Finished') ? 'b' : 'c'
		return valueOne < valueTwo
	}

	function sortStatus(a,b) {
		let valueOne = (a.status === 'Reading') ? 'a' : (a.status === 'Finished') ? 'b' : 'c'
		let valueTwo = (b.status === 'Reading') ? 'a' : (b.status === 'Finished') ? 'b' : 'c'
		return valueOne > valueTwo
	}
}

function overlayBlur(){
	let overlay = document.createElement('div')
	overlay.setAttribute('id','overlay')
	overlay.classList.add('background-blur')
	document.body.append(overlay)
}


function removeOverlayBlur() {
	if (document.getElementsByClassName('background-blur').length >= 1) {
		let overlay = document.getElementById('overlay')
		overlay.remove()
	}
	
}