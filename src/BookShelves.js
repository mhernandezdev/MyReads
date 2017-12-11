import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import { shelves } from './helper'

class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    render() {
        const { books, onShelfChange } = this.props;

        return (
            <div className="list-books-content">
                {shelves.map((shelfTitles) => (
                    <div key={(shelfTitles.shelf)}>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{shelfTitles.title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.filter((book) =>(book.shelf===shelfTitles.shelf)).map((book) => (
                                        <Book key={book.id} book={book} onShelfChange={onShelfChange} />
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        )
    }
}

export default BookShelves
