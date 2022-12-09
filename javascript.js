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