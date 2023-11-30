import React, { useContext, useState} from 'react'
import { db } from '../firebase'

const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

export function DatabaseProvider({ children }) {
    const [books, setBooks] = useState([]);

    function addBook(title, author, genre, year, image) {
        return (db.collection('books').add({
            title: title,
            author: author,
            genre: genre,
            year: year,
            image: image
        }))
    }

    function listFilterBooks(searchText, authorFilter) {

        db.collection('books').onSnapshot((snapshot) => {


            const filteredBooks = snapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    image: `data:image/${doc.data().imageType};base64,${doc.data().image}`,
                }))
                .filter((book) =>
                    book.title.toLowerCase().includes(searchText.toLowerCase()) &&
                    book.author.toLowerCase().includes(authorFilter.toLowerCase())
                );

            setBooks(filteredBooks);
        })
        return (books)
    }
    
    const value = {
        addBook,
        listFilterBooks
    }

    return (
        <div>
            <DatabaseContext.Provider value={value}>
                {children}
            </DatabaseContext.Provider>
        </div>
    )

}