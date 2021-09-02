const booksContainer = document.getElementById('books-container');
const searchField = document.getElementById('input-field');
const results = document.getElementById('results');
const errorMsg = document.getElementById('error');

// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// clear previous elements
const removeElements = () => {
    error.innerHTML = '';
    booksContainer.innerHTML = '';
    results.innerText = '';
}

// load books data
const loadBooks = () => {
    removeElements(); //clear elements
    toggleSpinner('block'); //add spinner
    const searchText = searchField.value;
    // error handling
    if (searchField.value === '') {
        toggleSpinner('none');  //remove spinner
        errorMsg.innerHTML = `
        <h5 class="text-center w-25 mx-auto p-3 bg-danger text-white">
            Please enter a book name!
        </h5>`;
        return;
    }
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
        .finally(() => searchField.value = '') //clear input field
}

// displaying search books.
const displayBooks = (books) => {
    toggleSpinner('none');
    results.innerText = `Total search results: ${books.length}`; //number of total search results.
    // error handling
    if (books.length === 0) {
        toggleSpinner('none');
        errorMsg.innerHTML = `
            <h5 class="text-center  w-25 mx-auto p-3 bg-danger text-white">
                NO RESULTS FOUND!
            </h5>`;
        results.innerText = '';
    }
    // single book
    books.forEach(book => {
        const { title, publisher, author_name, first_publish_year, cover_i } = book; //destructuring
        const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top h-75 img-fluid" alt="book image">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <h6 class="card-text">By: ${author_name}</h6>
                <p class="card-text">Publisher: ${publisher[0]}</p>
                <p class="card-text">First published in ${first_publish_year}</p>
            </div>
        </div>
        `;
        booksContainer.appendChild(div);
    })
}