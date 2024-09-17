const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../services/booksService.js");
const validationBook = require("../utils/validationBook.js");

const getAllBooksHandler = (request, h) => {
  try {
    const { name, reading, finished } = request.query;
    const books = getAllBooks({ name, reading, finished });

    return h
      .response({
        status: "success",
        data: {
          books,
        },
      })
      .code(200);
  } catch (error) {
    console.error("Error in getAllBooksHandler:", error);
    return h
      .response({
        status: "error",
        message: "An internal server error occurred",
      })
      .code(500);
  }
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = getBookById(id);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      data: {
        book,
      },
    })
    .code(200);
};

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const validationMessage = validationBook({ name, pageCount, readPage });
  if (validationMessage) {
    return h
      .response({
        status: "fail",
        message: validationMessage,
      })
      .code(400);
  }

  const newBook = addBook({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newBook,
      },
    })
    .code(201);
};

const updateBookHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const validationMessage = validationBook({ name, pageCount, readPage });
  if (validationMessage) {
    return h
      .response({
        status: "fail",
        message: validationMessage,
      })
      .code(400);
  }

  const success = updateBook(id, {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  if (!success) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
    })
    .code(200);
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;
  const success = deleteBook(id);

  if (!success) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
};

module.exports = {
  getAllBooksHandler,
  getBookByIdHandler,
  addBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
