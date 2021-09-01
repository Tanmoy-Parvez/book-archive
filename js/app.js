const booksContainer = document.getElementById('books-container');
const searchField = document.getElementById('input-field');
const results = document.getElementById('results');
const errorMsg = document.getElementById('error');


// load books data
const loadBooks = () => {
    const searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    if (searchField.value === '') {
        errorMsg.innerText = 'Please enter a book name!'
        return;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
        .finally(() => searchField.value = '')
}

const displayBooks = (books) => {
    results.innerText = `${books.length}`
    if (books.length === 0) {
        errorMsg.innerText = 'No Results Found!'
    }
    books.forEach(book => {

        const { title, publisher, author_name, first_publish_year, cover_i } = book;
        const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top h-50 img-fluid" alt="book image">
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