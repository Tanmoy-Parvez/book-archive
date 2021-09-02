const booksContainer = document.getElementById('books-container');
const searchField = document.getElementById('input-field');
const results = document.getElementById('results');
const errorMsg = document.getElementById('error');


// load books data
const loadBooks = () => {
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // error handling
    if (searchField.value === '') {
        errorMsg.innerHTML = `
            <h5 class="text-center w-25 mx-auto p-3 bg-danger text-white">
                Please enter a book name!
            </h5>`;
        booksContainer.innerHTML = '';
        results.innerText = '';
        return;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
        // clear input field
        .finally(() => searchField.value = '')
}

// displaying search results/books.
const displayBooks = (books) => {
    // number of total search results.
    results.innerText = `Total search results: ${books.length}`;
    errorMsg.innerHTML = '';
    booksContainer.innerHTML = '';
    // error handling
    if (books.length === 0) {
        errorMsg.innerHTML = `
            <h5 class="text-center w-25 mx-auto p-3 bg-danger text-white">
                No Results Found!
            </h5>`;
        results.innerText = '';
    }
    // single result/book
    books.forEach(book => {
        const { title, publisher, author_name, first_publish_year, cover_i } = book;
        const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top h-75 img-fluid" alt="book image">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <h6 class="card-text">By: ${author_name}</h6>
                <p class="card-text">Publisher: ${publisher}</p>
                <p class="card-text">First published in ${first_publish_year}</p>
            </div>
        </div>
        `;
        booksContainer.appendChild(div);
    })
}