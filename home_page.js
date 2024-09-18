fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:YOUR_ISBN&format=json&jscmd=data`)
  .then(response => response.json())
  .then(data => console.log(data));
