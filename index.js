
function getingUserInput() {
    // 1 grab the text entered into search bar by user
    const searchBar = document.getElementById('searchBar');
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', e => {
        // 2 when submit button 'clicked' (event) send that input text to our fetch request
        e.preventDefault()
        document.getElementById('results').innerHTML = ''
        let searchBarText = searchBar.value
        fetchinBookData(searchBarText)
        document.getElementById('bookForm').reset()
    })
}
getingUserInput()

function fetchinBookData(searchBarText) {
    // 3 fetch specified book title form Open Library API
    fetch(`https://openlibrary.org/search.json?title=${searchBarText}`)
    .then(resp => resp.json())
    // 4 return data from api
    .then(bookData => {
        bookData.numFound > 0 ? gettingTitleFromBookData(bookData) : noResultsFoundElement();
        /*if (bookData.numFound > 0) {
            gettingTitleFromBookData(bookData)
        } else {
            noResultsFoundElement()
        }*/
    });
}

function noResultsFoundElement() {
    const noResultsDiv = document.createElement('div');
    noResultsDiv.textContent = "No results found. Please check your spelling and try again.";
    noResultsDiv.style.color = "red";
    noResultsDiv.style.fontSize = "larger"
    const searchResultsDiv = document.getElementById('results');
    searchResultsDiv.appendChild(noResultsDiv);

}

function gettingTitleFromBookData(bookData) {
    console.log(bookData)
    // 5 parse through data and select title and author values 
    const docsArray = bookData.docs
    let mapping = docsArray.map(element => {
        const bookObj = {
            bookTitle: `${element.title}`,
            bookAuthor: `${element.author_name}`,
        }
        creatingBookResultElements(bookObj)
    })
}

function creatingBookResultElements(bookObj) {
    // console.log(bookObj)
    // 6 send these values to function to create elements and apppend these values to DOM for each book
    const resultDiv = document.createElement('div');
    // 7 create event listener when creating elements that listens for the 'dragend' event of user dragging search result elemt over to reading list
    resultDiv.addEventListener('dragend', e => {
        creatingTheReadingListElements(bookObj);
    })
    const resultTitle = document.createElement('h4');
    resultTitle.textContent = bookObj.bookTitle;
    const resultAuthor = document.createElement('p');
    if (bookObj.bookAuthor === 'undefined') {
        resultAuthor.textContent = "Author Not Available"
     } else {
        resultAuthor.textContent = bookObj.bookAuthor;
     }
    resultDiv.appendChild(resultTitle)
    resultDiv.appendChild(resultAuthor)
    resultDiv.setAttribute('class', 'theResults')
    resultDiv.setAttribute('draggable', 'true')
    const results = document.getElementById('results')
    results.appendChild(resultDiv);
}

function creatingTheReadingListElements(bookObj) {
    // 8 when event is fired take book that event was triggerd for and send data to function to create element in reading list and append to DOM
    const bookListDiv = document.createElement('div');
    // 9 when creating reading list element add event listener 'mouseover' that enlarges the text of the target of the event
    bookListDiv.textContent = bookObj.bookTitle + "  ";
    const btn = document.createElement('button');
    btn.textContent = "X"
    btn.style.display = "none"
    bookListDiv.appendChild(btn)
    bookListDiv.style.fontSize = '16px';
    bookListDiv.setAttribute('class', 'readLater');
    let readingListArray = document.getElementsByClassName('readingListDiv');
    const readingList = readingListArray[0];
    readingList.appendChild(bookListDiv);
    addingEventListenersToReadinList(bookListDiv, btn)
   
}

function addingEventListenersToReadinList(bookListDiv, btn) {
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
    // 10 when creating reading list element also add event listener that listens for the 'click' event of user clicking X button and deletes the targeted element from the reading list
    btn.addEventListener('click', e => {
        const readingElementDiv = btn.parentElement
        readingElementDiv.remove()
    })
}




// change styling for bigger search bar and submit button
// refactor code






/* Psudeo Code
1 grab the text entered into search bar by user
2 when submit button 'clicked' send that input text to our fetch request
3 fetch specified book title form Open Library API
4 return data from api
5 parse through data and select title and author values 
6 send these values to function to create elements and apppend these values to DOM for each book
7 create event listener when creating elements that listens for the 'keydown' event of user pressing up arrow
8 when event is fired take book that event was triggerd for and send data to function to create element in reading list and append to DOM
9 when creating reading list element add event listener 'mouseover' that enlarges the text of the target of the event
10 when creating reading list element also add event listener that listens for the 'keydown' event of user pressing down arrow and delets the targeted element from the reading list
*/

/*
Click event
To click the search button to look up a book in the API

Keydown event
To add a book to their read later list, and delete book from read later list

Mouseover event 
To enlarge the title text of each book once it is in their read later list (just in case the user forgot to wear their reading glasses)
*/


/*
    The core features	will include:
A search bar where a user can enter in the title of the book that they are looking for.
Once they have searched for a book the results of that search will be displayed on the webpage.
The user will then be able to add that book to a list of books to read later by hitting the up arrow on their keyboard.
The users read later list will be located on a separate portion of the page 
If the user scrolls over the title of the books in their read later list the title text will appear larger for better visibility.
The user will also be able to delete books from their read later list by pressing the down arrow key.
*/