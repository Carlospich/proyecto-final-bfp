import React, { useState } from 'react';

export default function Searchbox({ books, setFilteredBooks }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredBooks = books.filter((book) => {
            return book.title.toLowerCase().includes(searchValue);
        });

        setFilteredBooks(filteredBooks);
    };

    return (
        <div className="mb-3">
            <input
                type="text"
                placeholder="Search by title"
                className="form-control"
                value={searchText}
                onChange={handleSearchChange}
            />
        </div>
    );
}