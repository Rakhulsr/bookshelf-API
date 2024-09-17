const { nanoid } = require("nanoid");
const books = require("../models/books.js");

const addBook = ({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
}) => {
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);
  return id;
};

const getAllBooks = ({ name, reading, finished }) => {
  try {
    let filteredBooks = books;

    if (name) {
      filteredBooks = filteredBooks.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (reading !== undefined) {
      const isReading = reading === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.reading === isReading
      );
    }

    if (finished !== undefined) {
      const isFinished = finished === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.finished === isFinished
      );
    }

    return filteredBooks.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher,
    }));
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    throw error;
  }
};
const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

const updateBook = (
  id,
  { name, year, author, summary, publisher, pageCount, readPage, reading }
) => {
  const book = books.find((book) => book.id === id);
  if (!book) {
    return null;
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  Object.assign(book, {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  });

  return true;
};

const deleteBook = (id) => {
  const i = books.findIndex((book) => book.id === id);
  if (i === -1) return false;

  books.splice(i, 1);
  return true;
};

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };
