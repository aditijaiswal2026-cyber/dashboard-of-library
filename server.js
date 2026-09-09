const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const books = [
    {
        id: 1,
        name: "Harry Potter",
        author: "J.K. Rowling",
        status: "Available"
    },
    {
        id: 2,
        name: "Atomic Habits",
        author: "James Clear",
        status: "Issued"
    },
    {
        id: 3,
        name: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        status: "Available"
    }
];

app.get("/", (req, res) => {
    res.json({
        message: "Library Backend is running!"
    });
});

app.get("/api/books", (req, res) => {
    res.json(books);
});

app.get("/api/books/:id", (req, res) => {
    const book = books.find(
        b => b.id === parseInt(req.params.id)
    );

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});

app.post("/api/books", (req, res) => {

    const newBook = {
        id: books.length + 1,
        name: req.body.name,
        author: req.body.author,
        status: req.body.status || "Available"
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

app.delete("/api/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = books.findIndex(
        b => b.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(index, 1);

    res.json({
        message: "Book deleted successfully"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});