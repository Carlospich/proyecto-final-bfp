import React,{useContext,useState,useEffect} from 'react'
import {db} from '../firebase'

const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

export function DatabaseProvider({children}){

    function addBook(title,author,genre,year,image){
        return(db.collection('books').add({
            title: title,
            author: author,
            genre: genre,
            year: year,
            image: image
        }))
    }
    const value = {
        addBook
    }

    return(
        <div>
            <DatabaseContext.Provider value={value}>
                {children}
            </DatabaseContext.Provider>
        </div>
    )

}