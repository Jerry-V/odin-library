// Randomized background image
// https://stackoverflow.com/questions/27027480/choosing-a-random-background-html-css
// Any additional images MUST have their files added to "odin-library\mystBookTextures"
// and their file-name added to this image array in order to be selected by the
// "randomBackgroundImage" function
function randomBackgroundImage(){
  let imageArray = [
    'blueBook.png'
    , 'darkBlueBook.png'
    , 'greenBook.png'
    , 'lightBlueBook.png'
    , 'redBook.png'
    , 'tanBook.png'
  ];
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
addBookToLibrary('Channelwood Journal', 'Atrus', 24, true);
addBookToLibrary('Stoneship Journal', 'Atrus', 27, true);
addBookToLibrary('Selenitic Journal', 'Atrus', 30, false);
addBookToLibrary('Mechanical Journal', 'Atrus', 16, true);
addBookToLibrary('Atrus\' Riven Journal', 'Atrus', 18, true);
addBookToLibrary('Catherine\'s Journal', 'Catherine', 92, false);
addBookToLibrary('Gehn\'s Journal', 'Gehn', 26, true);

// An array to hold all book cover image file names.
// Previously the images would always change upon every refresh as
// they were only ever selected upon a refresh. This would cause clicking
// any button to refresh the page, and thus change every book's picture
// every time. This method of image assignment prevents that by creating
// a semi-randomly populated array of image names outside of any usage of
// the "listLibraryBooks" function (which would refresh the listed books)
var myLibraryBookCovers = [];

// A means of populating the "myLibraryBookCovers" array so that
// no neighboring array elements will have the same value. This will
// make no two neighboring books have the same background image.
let previousBook = 'placeholder';
let nextBook = 'placeholder';
let randomImage;

for (book in myLibrary) {
  while (previousBook === nextBook) {
    randomImage = randomBackgroundImage();
    nextBook = randomImage;
  }
  myLibraryBookCovers.push(randomImage);
  previousBook = nextBook;
}

// Adds another randomly picked book cover to myLibraryBookCovers 
// without neighboring items being duplicates.
function expandMyLibraryBookCovers(){
  while (previousBook === nextBook) {
    randomImage = randomBackgroundImage();
    nextBook = randomImage;
  }
  myLibraryBookCovers.push(randomImage);
  previousBook = nextBook;
}

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

function listLibraryBooks(library){
  const container = document.querySelector('#book-cards-container');
  
  // Remove all previous child nodes within container for a fresh
  // repopulation of said container with the updated myLibrary array.
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (container.firstChild){
    container.removeChild(container.lastChild);
  }
  
  // How to use <template> with dynamic IDs?
  // https://stackoverflow.com/questions/56341888/how-to-use-template-with-dynamic-ids  
  const templateInstance = document.getElementById("book-card-template");
  
  for(book in library){
    let clone = document.importNode(templateInstance .content, true);
    // Since "book" will return an index number of the "library" array,
    // I can use that to give each generated card div a unique ID value
    clone.querySelector('[data-bookCardDiv]').id = book;
    clone.querySelector('[data-bookTitle]').textContent = library[book].title;
    clone.querySelector('[data-bookAuthor]').textContent = library[book].author;
    clone.querySelector('[data-page-number]').textContent = library[book].pages;
    clone.querySelector('[data-read-status]').textContent = library[book].read;
    
    // "selectedBook" is needed, else only the final book is ever deleted. I suspect
    // it is b/c using "book" instead somehow (im not sure) always uses the final
    // value of book. This would cause "splice" to always use a number equal to or
    // greater than the current length of "myLibrary", thus always deleting the
    // final element.
    let selectedBook = clone.querySelector('[data-bookCardDiv]').id;
    
    // Adds the background image assigned to the element
    let text = myLibraryBookCovers[selectedBook];
    clone.querySelector('[data-bookIMG]').src = "odin-library/mystBookTextures/" + text;
    
    
    // Deletes the selected book's card
    clone.querySelector('[data-delete-button]').addEventListener('click', () => {
      myLibrary.splice(selectedBook, 1);
      myLibraryBookCovers.splice(selectedBook, 1);
      console.log('on deletion' + book);
      listLibraryBooks(myLibrary);
    });
    
    // Toggles the selected book's card's read boolean
    clone.querySelector('[data-read-status-button]').addEventListener('click', () => {
      myLibrary[selectedBook].read = !myLibrary[selectedBook].read;
      listLibraryBooks(myLibrary);
    })
    
    // Adds the finalized book card to the page
    document.getElementById('book-cards-container').appendChild(clone);
  }
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
  
  // If this array isn't expanded, then when "listLibraryBooks" is called it will
  // create a book without an image.
  expandMyLibraryBookCovers();
  
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

// Selected the overlay element to later make it show/hide as needed
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
  // Selects all modals but with ".modal.active" it selects
  // only the modals with the "active" class.
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
