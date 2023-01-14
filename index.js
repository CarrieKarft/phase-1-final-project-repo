
function getingUserInput() {
    // 1 grab the text entered into search bar by user
    const searchBar = document.getElementById('searchBar');
    const submitButton = document.getElementById('submitButton');
    // console.log(submitButton)
    submitButton.addEventListener('click', e => {
        // 2 when submit button 'clicked' (event) send that input text to our fetch request
        e.preventDefault()
        let searchBarText = searchBar.value
        fetchinBookData(searchBarText)
        // console.log(searchBarText)
    })
}
getingUserInput()

function fetchinBookData(searchBarText) {
    // 3 fetch specified book title form Open Library API
    fetch(`https://openlibrary.org/search.json?title=${searchBarText}`)
    .then(resp => resp.json())
    // 4 return data from api
    .then(bookData => {
        // console.log(bookData)
        gettingTitleFromBookData(bookData)
    });
}

function gettingTitleFromBookData(bookData) {
    // 5 parse through data and select title and author values 
    const docs = bookData.docs
    for (const element of docs) {
        const bookObj = {
            bookTitle: `${element.title}`,
            bookAuthor: `${element.author_name}`,
        }
        // console.log(bookObj)
        creatingBookResultElements(bookObj)
    }
}

function creatingBookResultElements(bookObj) {
    // 6 send these values to function to create elements and apppend these values to DOM for each book
     if (bookObj.bookAuthor === 'undefined') {
        console.log("Author Not Available")
     } else {
        console.log(bookObj.bookAuthor)
     }
    // console.log(bookObj.bookAuthor)
}


// 7 create event listener when creating elements that listens for the 'keydown' event of user pressing up arrow

// 8 when event is fired take book that event was triggerd for and send data to function to create element in reading list and append to DOM

// 9 when creating reading list element add event listener 'mouseover' that enlarges the text of the target of the event

// 10 when creating reading list element also add event listener that listens for the 'keydown' event of user pressing down arrow and delets the targeted element from the reading list







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