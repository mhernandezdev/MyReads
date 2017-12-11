import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class BookSearch extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    state = {
        results: []
    }

    handleSearch = (e) => {
        e.preventDefault()

        // empty no reasone to call api // clear out the state
        if(e.target.value===""){
            this.setState({ results: [] })
        }else{
            BooksAPI.search(e.target.value, 20).then(
                (results) => {
                    if(!results || results.error){
                        this.setState({ results:[] })
                    }else{
                        // loop results tell its it shelf // if on shelf
                        results.map((resultBook => (
                            this.props.books.map(book => resultBook.id===book.id && (resultBook.shelf = book.shelf) )
                        )))

                        this.setState({ results:results })
                    }
            })
        }
    }

    render() {
        const { onShelfChange } = this.props;
        const results = this.state.results;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                        {results.map((book) => (
                            <Book key={book.id} book={book} onShelfChange={onShelfChange} />
                        ))}

                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch
