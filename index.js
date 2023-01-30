
const form = document.querySelector('#bookForm')
const [searchBar, submitButton] = form.children

const results = document.getElementById('results')
const readingList = document.querySelector('.readingListDiv');


function getingUserInput() {
    submitButton.addEventListener('click', e => {
        e.preventDefault()
        results.innerHTML = '';
        let searchBarText = searchBar.value
        fetchinBookData(searchBarText)
        form.reset()
    })
}
getingUserInput()

function fetchinBookData(searchBarText) {
    return fetch(`https://openlibrary.org/search.json?title=${searchBarText}`)
    .then(resp => resp.json())
    .then(bookData => {
        // console.log(bookData)
        bookData.numFound > 0 ? gettingTitleFromBookData(bookData) : noResultsFoundElement();
    });
}

function noResultsFoundElement() {
    const noResultsDiv = document.createElement('div');
    noResultsDiv.textContent = "No results found. Please check your spelling and try again.";
    noResultsDiv.style.color = "red";
    noResultsDiv.style.fontSize = "larger"
    results.appendChild(noResultsDiv);

}

function gettingTitleFromBookData(bookData) {
    // console.log(bookData)
    const docsArray = bookData.docs
    docsArray.map(element => {
        const bookObj = {
            bookTitle: `${element.title}`,
            bookAuthor: `${element.author_name}`,
            subjects: `${element.subject}`,
        }
        creatingBookResultElements(bookObj)
    })
}

function creatingBookResultElements(bookObj) {
    const resultDiv = document.createElement('div');
    resultDiv.addEventListener('dragend', () => creatingTheReadingListElements(bookObj))
    const resultTitle = document.createElement('h4');
    resultTitle.textContent = bookObj.bookTitle;
    const resultAuthor = document.createElement('p');
    bookObj.bookAuthor === 'undefined' ? resultAuthor.textContent = "Author Not Available" : resultAuthor.textContent = bookObj.bookAuthor;
    const bookSubject = document.createElement('p');
    bookObj.subjects === 'undefined' ? bookSubject.textContent = "Subject Not Available" : bookSubject.textContent = bookObj.subjects;
    const dragInstructions = document.createElement('p');
    dragInstructions.textContent = "DRAG BOOK TO READING LIST TO SAVE FOR LATER";
    dragInstructions.setAttribute('class', 'drag')
    resultDiv.appendChild(bookSubject);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultAuthor);
    resultDiv.appendChild(bookSubject);
    resultDiv.appendChild(dragInstructions);
    resultDiv.setAttribute('class', 'theResults')
    resultDiv.setAttribute('draggable', 'true')
    results.appendChild(resultDiv);
}

function creatingTheReadingListElements(bookObj) {
    const bookListDiv = document.createElement('div');
    bookListDiv.textContent = bookObj.bookTitle + "  ";
    const btn = document.createElement('button');
    btn.textContent = "X"
    btn.style.display = "none"
    bookListDiv.appendChild(btn)
    bookListDiv.style.fontSize = '16px';
    bookListDiv.setAttribute('class', 'readLater');
    readingList.appendChild(bookListDiv);
    addingEventListenersToReadingList(bookListDiv, btn)
}

function addingEventListenersToReadingList(bookListDiv, btn) {
    bookListDiv.addEventListener('mouseenter', e => {
        btn.style.display = ""
        const eTarget = e.target;
        eTarget.style.fontSize = 'larger'
    })
    bookListDiv.addEventListener('mouseleave', e => {
        const eTarget = e.target;
        eTarget.style.fontSize = '16px'
        btn.style.display = "none"
    })
    btn.addEventListener('click', () => {
        const readingElementDiv = btn.parentElement
        readingElementDiv.remove()
    })
}

