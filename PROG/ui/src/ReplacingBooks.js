import React, { useState } from 'react';
import './ReplacingBooks.css';

let data = [
    {
        id: 1,
        name: "The Potato",
        author: "Burton W G",
        call: "635.217"
    },
    {
        id: 2,
        name: "Past, Present and Future",
        author: "Isaac Saruman",
        call: "500.500"
    },
    {
        id: 3,
        name: "The Lord of the Rings",
        author: "Tolkien J R R",
        call: "750.003"
    },
    {
        id: 4,
        name: "Harry Potter",
        author: "Rowling J K",
        call: "737.554"
    },
    {
        id: 5,
        name: "The Strategic President",
        author: "George Edwards",
        call: "352.230"
    },
    {
        id: 6,
        name: "British Potatoes in Perspective",
        author: "Potato man",
        call: "666.217"
    },
    {
        id: 7,
        name: "Sherlock Holmes",
        author: "Arthur Doyle",
        call: "785.235"
    },
    {
        id: 8,
        name: "Moby Dick",
        author: "Herman Melville",
        call: "712.009"
    },
    {
        id: 9,
        name: "David Copperfield",
        author: "Charles Dickens",
        call: "123.456"
    },
    {
        id: 10,
        name: "How to Choke Slam a Guy",
        author: "Brock Lesner 10",
        call: "595.789"
    },
    {
        id: 11,
        name: "War and Peace",
        author: "Sally Gold",
        call: "248.357"
    },
    {
        id: 12,
        name: "Bride and PreJuice",
        author: "Jack Smith",
        call: "459.326"
    },
    {
        id: 13,
        name: "40 shades of prostate exams",
        author: "William Shatner PHD",
        call: "656.321"
    },
    {
        id: 14,
        name: "Himself",
        author: "Joey Tribiani",
        call: "786.786"
    },
    {
        id: 15,
        name: "Gorgeous Lies",
        author: "Martha Stuart",
        call: "800.012"
    },
    {
        id: 16,
        name: "Toll The Hounds",
        author: "Rex Luthor",
        call: "596.300"
    },
    {
        id: 17,
        name: "The art of War",
        author: "Xiao Mao",
        call: "863.210"
    },
    {
        id: 18,
        name: "Mein Kampf",
        author: "Hiltler Adolf",
        call: "999.999"
    },
    {
        id: 19,
        name: "Turning Cheeks",
        author: "Jose Murrino",
        call: "492.197"
    },
    {
        id: 20,
        name: "Isle De Muerta",
        author: "John",
        call: "124.364"
    },
]

const ReplaceBooks = () => {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState({
        name: null,
        author: null,
        call: null
    })
    const [score, setScore] = useState(0)

    const generateBooks = (books) => {
        const generateBooks = []
        const randomNumbers = []
        let randomBookID = Math.floor(Math.random() * 20) + 1
        console.log(`randomBookID: ${randomBookID}`)
        randomNumbers.push(randomBookID)

        for (let i = 0; i < 10; i++) {
            while (randomNumbers.includes(randomBookID)) {
                randomBookID = Math.floor(Math.random() * 20) + 1
            }

            randomNumbers.push(randomBookID)
            books.forEach(book => {
                if (book.id === randomBookID) {
                    console.log(`Pushing book ${book.name} to generateBooks`)
                    generateBooks.push(book)
                }
            })
        }
        setBooks(generateBooks)
    }

    const selectBook = ({ id, name, author, call }) => {
        console.log({ id, name, author, call })
        setSelectedBook({
            id: id,
            name: name,
            author: author,
            call: call
        })
    }

    const moveUp = () => {
        console.log(`Moving ${selectedBook} up`)
        let index = 0
        books.forEach(book => {
            if (book.id === selectedBook.id) {
                index = books.indexOf(book)
            }
        })
        console.log(`Index of ${selectedBook.name} is moving from ${index} to ${index - 1}`)
        if (index >= 0) {
            const newBooks = [...books]
            newBooks[index] = newBooks[index - 1]
            newBooks[index - 1] = selectedBook
            setBooks(newBooks)
        }
    }

    const moveDown = () => {
        console.log(`Moving ${selectedBook} up`)
        let index = 0
        books.forEach(book => {
            if (book.id === selectedBook.id) {
                index = books.indexOf(book)
            }
        })
        console.log(`Index of ${selectedBook.name} is moving from ${index} to ${index + 1}`)
        if (index < books.length - 1) {
            const newBooks = [...books]
            newBooks[index] = newBooks[index + 1]
            newBooks[index + 1] = selectedBook
            setBooks(newBooks)
        }
    }

    const checkAscendingOrder = () => {
        let isAscending = true
        for (let i=0; i<books.length-1; i++) {
            if (books[i].call > books[i+1].call) {
                isAscending = false
                break
            }
        }
        if (isAscending) {
            setScore((prevState) => {
                return prevState + 5
            })
            alert("Correct order!")
        } else {
            if (score => 0 && score <= 5) {
                setScore(0)
            } else {
                setScore((prevState) => {
                    return prevState - 5
                })
            }
            alert("Incorrect order!")
        }
    }

    return <div className="ReplaceBooks">
        <div className="Card">
            <div className="colOne">
                <div className="colOneUpper">
                    <button onClick={() => generateBooks(data)}>Replace Books</button>
                </div>
                <div className="colOneLower">
                    <h3>Dewey Points</h3>
                    <h1>{score}</h1>
                </div>
            </div>
            <div className="colTwo">
                <div className="list">
                    {books === undefined || books === null || books.length === 0 ? <h1 style={{ textAlign: 'center' }}>Generate Books</h1> : books.map((book) => {
                        return <div key={book.id} className={`eachBook ${book.call === selectedBook.call ? "selected" : ""}`} onClick={() => selectBook(book)}>{book.call} {book.author.substring(0, 3)}</div>
                    })}
                </div>
                <div className="selectorButtons">
                    <button className="one" onClick={moveUp}>Move Up</button>
                    <button className="two" onClick={moveDown}>Move Down</button>
                </div>
            </div>
            <div className="colOne">
                <div className="colOneUpper">
                    <button onClick={checkAscendingOrder}>Submit</button>
                </div>
                <div className="colOneLower">
                    <h3>Information</h3>
                    <h5>This is a simple program, the user is required to first press the replace books button, there after 10 randomly generated books will appear. The user will then be required to place books into the correct order, if the order is correct, the program will award the user with 5 points, if the user is wrong, 5 points will be subtracted</h5>
                </div>
            </div>
        </div>
    </div>
};

ReplaceBooks.propTypes = {};

ReplaceBooks.defaultProps = {};

export default ReplaceBooks;