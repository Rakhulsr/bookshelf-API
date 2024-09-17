const validationBook = ({ name, pageCount, readPage }) => {
  if (!name) {
    return "Gagal menambahkan buku. Mohon isi nama buku";
  }
  if (readPage > pageCount) {
    return "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
  }
  return null;
};
const validationUpdateBook = ({ name, pageCount, readPage }) => {
  if (!name) {
    return "Gagal memperbarui buku. Mohon isi nama buku";
  }
  if (readPage > pageCount) {
    return "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount";
  }
  return null;
};

module.exports = { validationBook, validationUpdateBook };
