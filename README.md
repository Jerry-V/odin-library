# odin-library
The Odin Project's javascript library assignment. Create a simple book reading application that records title, author, pages, and whether it was read.
This implementation is themed after the "MYST" game series, with the background image from "MYST IV: Revelation".

**Assignment:**
> https://www.theodinproject.com/lessons/node-path-javascript-library

**Requirements:**

- Function (not constructor) that takes user input to store book objects in an array.
- Function that loops through array and displays each book on the page.
- Button that brings up a form that users can add a new book to the library.
- Each displayed book should have buttons to remove itself and change its read status.

**Notes to self:**

Github's live environment and/or page system requires files to not have "_" at the begining of a file name. Also, it can be sensitive to file paths having a "/" at the begining. After changing the css file's links and "parched_002.png" to "parched002.png" it seems to load properly now. I suspect it was more due to the file path than to the name change.

Also, what appeared to me to be an error is infact normal behavior. Refreshing the page seemed to change the number of image files that would be listed in the developer "sources" tab after pressing f12. After adding a few books I realized that it is because it will only load into sources what it needs for the moment. Thus if no "red books" have been requested, it won't add that to the sources until it is requested by the javascript.
