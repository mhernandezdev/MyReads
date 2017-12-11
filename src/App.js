import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount(){
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    onShelfChange = (e, changedBook) => {
        // because search uses the results array make sure books is being updated
        const updateBook = this.state.books.filter( book => ( book.id === changedBook.id));
        let myBook;
        if(updateBook.length===0){
            myBook = changedBook;
            this.state.books.push(changedBook);
        }else{
            myBook = updateBook[0];
        }
        myBook.shelf = e.target.value;

        this.setState({ books:this.state.books })

        BooksAPI.update(myBook, e.target.value);
    }

    render() {
        return (
        <div className="app">
            <Route path='/search' render={({ history }) => (
                <BookSearch books={this.state.books} onShelfChange={this.onShelfChange} />
            )}/>

            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>

                    <BookShelves books={this.state.books} onShelfChange={this.onShelfChange} />

                    <div className="open-search">
                        <Link
                            to='/search'
                            className='open-search'
                        >Add a book</Link>
                    </div>

                </div>
            )}/>
        </div>
        )
    }
}

export default BooksApp
