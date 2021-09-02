// capturing all elements by id
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

// displaying searched books.
const displayBooks = (books) => {
    toggleSpinner('none');
    results.innerText = `Total Search Results: ${books.length}`; //number of total search results.
    // error handling
    if (books.length === 0) {
        toggleSpinner('none');
        errorMsg.innerHTML = `
            <h5 class="text-center  w-25 mx-auto p-3 bg-danger text-white">
                NO RESULTS FOUND!
            </h5>`;
        results.innerText = ''; //clear previous result
    }
    // single book
    books.forEach(book => {
        console.log(book.cover_i);
        const { title, publisher, author_name, first_publish_year, cover_i } = book; //destructuring
        const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        const defaultImg = 'image/download.png';
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col h-75">
            <div class="card h-100">
                <img src="${cover_i ? imgUrl : defaultImg}" class="card-img-top h-50 p-1" alt="book image">
                <div class="card-body overflow-auto pt-2">
                    <h4 class="card-title">${title.slice(0, 30)}</h4>
                    <h6 class="card-text"><strong>By:</strong> ${author_name ? author_name : 'no name found'}</h6>
                    <h6 class="card-text"><strong>Publisher:</strong> ${publisher ? publisher[0] : 'no name found'}</h6>
                    <h6 class="card-text">First published in <strong>${first_publish_year ? first_publish_year : '...'}</strong></h6>
                </div>
                <div class="card-footer bg-dark py-2 text-center pt-1">
                    <small class="text-white">Read Now</small>
                </div>
            </div>
        </div>
        `;
        booksContainer.appendChild(div);
    })
}