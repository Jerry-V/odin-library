// "Book" object template that stores relevent book information
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
const randomBook1 = addBookToLibrary('titleText1', 'authorText1', 142, true);
const randomBook2 = addBookToLibrary('titleText2', 'authorText2', 332, false);
const randomBook3 = addBookToLibrary('titleText3', 'authorText3', 834, true);

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
      const deleteButton = document.createElement('button');
      const readButton = document.createElement('button');
      
      // Add classes to elements
      bookDiv.classList.add('bookCard');
      deleteButton.classList.add('delete-button');
      readButton.classList.add('read-button');
      
      // Append elements to the card div
      bookDiv.append(bookTitle);
      bookDiv.append(bookAuthor);
      bookDiv.append(bookPages);
      bookDiv.append(bookRead);
      bookDiv.append(deleteButton);
      bookDiv.append(readButton);
      
      // Insert elements text
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
      deleteButton.addEventListener('click', (e) => {
        myLibrary.splice(selectedBook, 1);
        listLibraryBooks(myLibrary);
      });
      
      // Toggles the selected book's card's read boolean
      readButton.addEventListener('click', (e) => {
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