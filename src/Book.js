import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired
    }

    render() {
        const { book, onShelfChange } = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: 'url('+((book.imageLinks && book.imageLinks.thumbnail) ||
                                            ('https://books.google.com/googlebooks/images/no_cover_thumb.gif'))+')',
                            backgroundSize: '128px 193px'
                        }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => onShelfChange(e, book)} value={book.shelf || 'none'} >
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                </div>
            </li>
        )
    }
}

export default Book
