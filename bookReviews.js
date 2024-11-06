const apiKey = "AIzaSyDL_J47JCIjjrfrT0rVw9IvlGACWx1fTSQ"; // Google Books API key

    window.addEventListener("load", function() {
      fetchTrendingBooks();
    });

    document.getElementById("search-button").addEventListener("click", function () {
      const query = document.getElementById("search-input").value;
      searchBooks(query);
    });

    // Fetch trending/bestselling books
    function fetchTrendingBooks() {
      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=25&key=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => displaySuggestions(data))
        .catch(error => console.error("Error fetching trendy books:", error));
    }

    function searchBooks(query) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error("Error fetching data:", error));
    }

    // Display popular/trendy book suggestions
    function displaySuggestions(data) {
      const suggestionsContainer = document.getElementById("suggestions-container");
      suggestionsContainer.innerHTML = ""; // Clear previous suggestions

      if (data.items) {
        data.items.forEach(item => {
          const title = item.volumeInfo.title || "No title available";
          const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No authors available";
          const coverImage = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x192.png?text=No+Cover";
          const description = item.volumeInfo.description || "No description available";

          const suggestionDiv = document.createElement("div");
          suggestionDiv.classList.add("book-suggestion");
          suggestionDiv.innerHTML = `
            <img src="${coverImage}" alt="${title} cover" class="book-cover" />
            <div class="book-details">
              <h4 class="book-title">${title}</h4>
              <p>Authors: ${authors}</p>
              <p class="book-description" style="display: none;"><strong>Description:</strong> ${description}</p>
            </div>
          `;
          
          suggestionsContainer.appendChild(suggestionDiv);

          // Add click event to toggle description
          const titleElement = suggestionDiv.querySelector('.book-title');
          const coverElement = suggestionDiv.querySelector('.book-cover');
          const descriptionElement = suggestionDiv.querySelector('.book-description');

          const toggleDescription = () => {
            if (descriptionElement.style.display === "none") {
              descriptionElement.style.display = "block"; // Show description
            } else {
              descriptionElement.style.display = "none";  // Hide description
            }
          };

          titleElement.addEventListener("click", toggleDescription);
          coverElement.addEventListener("click", toggleDescription);
        });
      } else {
        suggestionsContainer.innerHTML = "<p>No suggestions found.</p>";
      }
    }

    function displayResults(data) {
      const resultsContainer = document.getElementById("search-results");
      resultsContainer.innerHTML = ""; // Clear previous results

      if (data.items) {
        data.items.forEach(item => {
          const title = item.volumeInfo.title || "No title available";
          const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No authors available";
          const rating = item.volumeInfo.averageRating ? item.volumeInfo.averageRating : "Not rated";
          const description = item.volumeInfo.description || "No description available";
          const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150";

          const bookDiv = document.createElement("div");
          bookDiv.classList.add("book-item");
          bookDiv.innerHTML = `
            <img src="${thumbnail}" alt="Book cover" class="book-cover" />
            <h3 class="book-title">${title}</h3>
            <p><strong>Authors:</strong> ${authors}</p>
            <p><strong>Average Rating:</strong> ${rating}</p>
            <p class="book-description" style="display: none;"><strong>Description:</strong> ${description}</p>
            <input type="number" min="1" max="5" placeholder="Rate this book" class="rating-input" />
            <button class="rate-button">Rate</button>
          `;

          resultsContainer.appendChild(bookDiv);

          // Add click event to toggle description
          const titleElement = bookDiv.querySelector('.book-title');
          const coverElement = bookDiv.querySelector('.book-cover');
          const descriptionElement = bookDiv.querySelector('.book-description');

          const toggleDescription = () => {
            if (descriptionElement.style.display === "none") {
              descriptionElement.style.display = "block"; // Show description
            } else {
              descriptionElement.style.display = "none";  // Hide description
            }
          };

          titleElement.addEventListener("click", toggleDescription);
          coverElement.addEventListener("click", toggleDescription);
        });

        // Add functionality to the rating buttons
    function saveRating(bookId) {
      const ratingInput = document.querySelector(`.rating-input[data-book-id="${bookId}"]`);
      const userRating = ratingInput.value;
      if (userRating >= 1 && userRating <= 5) {
        localStorage.setItem(bookId, userRating);
        document.getElementById(`rating-${bookId}`).textContent = `Your Rating: ${userRating} star(s)`;
        alert(`You rated this book ${userRating} star(s)!`);
    } else {
        alert("Please enter a rating between 1 and 5.");
      }
      }

// Load saved ratings from local storage
    function loadSavedRatings() {
      const allRatingElements = document.querySelectorAll(".user-rating");
      allRatingElements.forEach((ratingElement) => {
        const bookId = ratingElement.id.replace("rating-", "");
        const savedRating = localStorage.getItem(bookId);
        if (savedRating) {
          ratingElement.textContent = `Your Rating: ${savedRating} star(s)`;
          const ratingInput = document.querySelector(`.rating-input[data-book-id="${bookId}"]`);
          ratingInput.value = savedRating;
     }
  });
}
