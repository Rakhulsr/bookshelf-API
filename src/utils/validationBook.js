const validationBook = ({ name, pageCount, readPage }) => {
  if (!name) {
    return "Gagal menambahkan buku. Mohon isi nama buku";
  }
  if (readPage > pageCount) {
    return "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
  }
  return null;
};

module.exports = validationBook;
