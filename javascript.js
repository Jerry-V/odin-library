// To get live server withing Visual Studio Code:
// Ctrl + Shift + P
// Simple Browser: Show
// Paste server info:
// http://127.0.0.1:5500/index.html

// Randomized background image
// https://stackoverflow.com/questions/27027480/choosing-a-random-background-html-css
function randomBackgroundImage(){
  let imageArray = ['blueBook.png', 'darkBlueBook.png', 'greenBook.png', 'lightBlueBook.png', 'redBook.png', 'tanBook.png'];
  let randIndex = Math.floor(Math.random() * imageArray.length);
  // returns a random imageArray element
  return imageArray[randIndex];
}

// Making an array of file paths in JavaScript?
// https://stackoverflow.com/questions/41667237/making-an-array-of-file-paths-in-javascriptvar fs = require('fs');


// "Book" object constructor that stores relevent book information
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    
    // Superfluous function, no need to remove.
    this.getInfo = function(){
      let readYetText = '';
      if (read === true) {
          readYetText = 'has been read.';
      } else {
          readYetText = 'not read yet.';
      }
      return `${title} by ${author}, ${pages} pages, ${readYetText}`;
    }
}

// Create array to hold "Book" objects
var myLibrary = [];


// Intial posted books
addBookToLibrary('ABCDEabcde', 'JjKkLl', 142, true);
addBookToLibrary('titleText1', 'authorText1', 142, true);
addBookToLibrary('titleText2', 'authorText2', 332, false);
addBookToLibrary('titleText3', 'authorText3', 834, true);
addBookToLibrary('titleText4', 'authorText4', 142, true);
addBookToLibrary('titleText5', 'authorText5', 332, false);
addBookToLibrary('titleText6', 'authorText6', 834, true);
addBookToLibrary('titleText7', 'authorText7', 142, true);

function addBookToLibrary(title, author, pages, read) {
  const addedBook = new Book(title, author, pages, read)

  // Checks if values are valid input types
  if ((typeof(title) === 'string' && typeof(author) === 'string')
  && typeof(pages) === 'number' && typeof(read) === 'boolean') {
    myLibrary.push(addedBook);
  } else {
    // Message for when input types are invalid
    console.log(`required input types: (string, string, number, boolean)`);
  }
}

// Generates the book-cards according to the data within the myLibrary array.
function listLibraryBooks(library) {
  const container = document.querySelector('#bookCardsContainer');
  
  // Remove all previous child nodes within container for a fresh
  // repopulation of said container with the updated myLibrary array.
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (container.firstChild){
    container.removeChild(container.lastChild);
  }
  
  // Generate the container's book cards:
  for (book in library){
    const bookDiv = document.createElement('div');

    // Create elements
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    const buttonsDiv = document.createElement('div');
    const deleteButton = document.createElement('button');
    const readButton = document.createElement('button');
    
    // Add CSS classes to elements
    bookDiv.classList.add('bookCard');
    deleteButton.classList.add('delete-button');
    readButton.classList.add('read-button');
    buttonsDiv.classList.add('buttonsDiv');
    
    // Append elements to the card div
    bookDiv.append(bookTitle);
    bookDiv.append(bookAuthor);
    bookDiv.append(bookPages);
    bookDiv.append(bookRead);
    bookDiv.append(buttonsDiv);
    buttonsDiv.append(deleteButton);
    buttonsDiv.append(readButton);
    
    
    // Adds a random background image for the
    bookDiv.style.backgroundImage = "url('../mystBookTextures/"+ randomBackgroundImage() +"')";
    
    // Insert elements' text
    bookTitle.innerText=library[book].title;
    bookAuthor.innerText=library[book].author;
    bookPages.innerText=library[book].pages;
    bookRead.innerText=library[book].read;      
    
    // Append the manipulated card div to the card container
    container.appendChild(bookDiv);
    
    // Set each card-element-ID-value to correspond with the object-index-value
    // in the myLibrary array. This lets each card-element (AKA: "bookDiv")
    // "remember" which array item needs to be removed or modified when the
    // following events fire off.
    bookDiv.id = book;
    
    // Variable for code legibility
    let selectedBook = bookDiv.id;
    
    // Deletes the selected book's card
    deleteButton.addEventListener('click', () => {
      myLibrary.splice(selectedBook, 1);
      listLibraryBooks(myLibrary);
    });
    
    // Toggles the selected book's card's read boolean
    readButton.addEventListener('click', () => {
      myLibrary[selectedBook].read = !myLibrary[selectedBook].read;
      listLibraryBooks(myLibrary);
    })
  }
  console.table(myLibrary);
}

// Initial generation of book cards
listLibraryBooks(myLibrary);

/* ============================== FORM CODE ============================== */

// Grab form data and add the new book object to the myLibrary array of book objects. 
// YouTube video talking about using the new "FormData" object to collect form data:
//    Sending a form using the FormData object – JavaScript Tutorial
//    By: OpenJavaScript
//    https://www.youtube.com/watch?v=EnWqnyUZ65Y
const form = document.querySelector('#book-form');

// Adds functionality to the submit button
form.addEventListener('submit', (e)=>{
  // Stops the automatic page refresh, mentioned in project requirements:
  // https://www.theodinproject.com/lessons/node-path-javascript-library
  // Without this the page always resets to its initial state
  e.preventDefault();

  // Utilize the FormData object to collect form inputs
  // List of FormData commands:
  // https://www.javascripttutorial.net/web-apis/javascript-formdata/
  const formData = new FormData(form);
  let title = formData.get('title');
  let author = formData.get('author');

  // FormData only passes strings, but you can convert it back to a number afterwards.
  // The "pages" value is read as a string, "parseInt" converts it back to an integer.
  // https://stackoverflow.com/questions/68725067/formdata-dont-convert-number-inptu-field-to-string
  // https://stackoverflow.com/questions/33870800/send-integers-in-formdata
  let pages = parseInt(formData.get('pages'));
  
  // If the checkbox exists (not null) set it to true, otherwise false
  let read = formData.get('read') ? true : false;
  
  // Once the form's info is received, add another book to the library
  addBookToLibrary(title,author,pages,read);
  
  // Update the displayed books
  listLibraryBooks(myLibrary);
});

/* ============================== MODAL CODE ============================== */

// How to create a modal popup:
//  Build a Popup With JavaScript
//  By: Web Dev Simplififed
//  https://www.youtube.com/watch?v=MBaw_6cPmAw

// "querySelectorAll" used so this method can work with multiple buttons as well
// "data-modal-target" are the buttons for opening up the modal
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
// Selected overlay element so it will show/hide as needed
const overlay = document.getElementById('overlay');


openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    // "dataset" lets you access the data attributes as if they were
    // JS objects (and camel-case them for you).
    // Using querySelector to select based on the html "data-modal-target" target.
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  })
})

// Adds the ability to close modals by clicking outside the modal text-box area.
overlay.addEventListener('click', () => {
  // Selects all modals but with ".modal.active" it selects only our active modals.
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Accesses the parent modal of this button.
    // Can use "closest" b/c the button is inside our modal.
    // This takes a selector, "modal" in this case, and gets the closest
    // parent element with said class.
    // It goes up the element "tree" until it finds a parent with said class.
    // Then it executes the "closeModal" function which removes the "active"
    // class from said modal parent and also the overlay div, thus closing them.
    const modal = button.closest('.modal');
    closeModal(modal);
  })
})

function openModal(modal) {
  if (modal == null) return // If for some reason it is called w/o a modal, just return
  modal.classList.add('active'); // If there is a modal, just add "active" class
  overlay.classList.add('active'); // Want overlay to show everytime modal is shown
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active');
  overlay.classList.remove('active');
}