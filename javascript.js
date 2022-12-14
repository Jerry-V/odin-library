function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.getInfo = function(){
      let readYetText = '';
      if (read === true) {
          readYetText = 'has been read';
      } else {
          readYetText = 'not read yet';
      }
      return `${title} by ${author}, ${pages} pages, ${readYetText}`;
    }
}




const randomBook1 = new Book('titleText1', 'authorText1', 142, true);
const randomBook2 = new Book('titleText2', 'authorText2', 332, false);
const randomBook3 = new Book('titleText3', 'authorText3', 834, true);

// create array to hold 'Book' objects
let myLibrary = [];

myLibrary.push(randomBook1);
myLibrary.push(randomBook2);
myLibrary.push(randomBook3);

function addBookToLibrary(title, author, pages, read) {
  const addedBook = new Book(title, author, pages, read)
  if ((typeof(title) === 'string' && typeof(author) === 'string')
  && typeof(pages) === 'number' && typeof(read) === 'boolean') {
    myLibrary.push(addedBook);
  } else {
    console.log(`required input types: (string, string, number, boolean)`);
  }
}

// how to submit a form
// https://stackoverflow.com/questions/6799533/how-to-submit-a-form-with-javascript-by-clicking-a-link


function listLibraryBooks(library) {
  const container = document.querySelector('#bookCardsContainer');
  // Remove all previous child nodes within container
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (container.firstChild){
    container.removeChild(container.lastChild);
  }
  // Then generate the container's book cards:
  
  for (book in library){
      const bookDiv = document.createElement('div');
      const bookTitle = document.createElement('p');
      const bookAuthor = document.createElement('p');
      const bookPages = document.createElement('p');
      const bookRead = document.createElement('p');
      bookDiv.append(bookTitle);
      bookDiv.append(bookAuthor);
      bookDiv.append(bookPages);
      bookDiv.append(bookRead);
      bookTitle.innerText=library[book].title;
      bookAuthor.innerText=library[book].author;
      bookPages.innerText=library[book].pages;
      bookRead.innerText=library[book].read;
      bookDiv.classList.add('bookCard');
      container.appendChild(bookDiv);
  }
  console.table(library);
}

listLibraryBooks(myLibrary);


/* Grab form data, create new book object with data,
add new book to myLibrary array of book objects */
// This is a good way to utilize forms with Javascript:
// Sending a form using the FormData object – JavaScript Tutorial
// By: OpenJavaScript
// https://www.youtube.com/watch?v=EnWqnyUZ65Y
const form = document.querySelector('#book-form');
form.addEventListener('submit', (e)=>{
  // stops automatic page refresh
  e.preventDefault();
  // utilize FormData object to collect form inputs
  const formData = new FormData(form);
  
  // for (item of formData){
  //   console.log(item[0], item[1]);
  // }
  
  // for(const pair of formData.entries()){
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }
  
  // List of FormData commands:
  // https://www.javascripttutorial.net/web-apis/javascript-formdata/
  let title = formData.get('title');
  let author = formData.get('author');
  let pages = formData.get('pages');
  // if the checkbox exists (not null) set it to true, otherwise false
  let read = formData.get('read') ? true : false;
  // console.log(title +' '+ author +' '+ pages +' '+ read);
  
  myLibrary.push(new Book(title,author,pages,read));
  listLibraryBooks(myLibrary);
});

