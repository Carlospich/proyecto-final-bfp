import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

function SearchBook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function searchByTitleOrAuthor(searchTerm) {
      const booksRef = firebase.database().ref('books');
      const snapshot = await booksRef.once('value');
      const data = snapshot.val();
      const results = [];

      if (data) {
        Object.entries(data).forEach(([id, book]) => {
          if (
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            results.push({ id, ...book });
          }
        });
      }

      setSearchResults(results);
    }

    if (searchTerm !== '') {
      searchByTitleOrAuthor(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Buscar por título o autor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBook;