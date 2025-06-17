import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    createBook: {
      status: "idle",
      data: null,
      error: null,
    },
    getBooks: {
      status: "idle",
      data: null,
      error: null,
    },
    updateBook: {
      status: "idle",
      data: null,
      error: null,
    },
    deleteBook: {
      status: "idle",
      data: null,
      error: null,
    },
  },
  reducers: {
    createBookRequest: (state) => {
      state.createBook.status = "pending";
      state.createBook.data = null;
      state.createBook.error = null;
    },
    createBookSuccess: (state, action) => {
      state.createBook.status = "success";
      state.createBook.data = action.payload;
      state.getBooks.data = [...state.getBooks.data, action.payload];
    },
    createBookError: (state, action) => {
      state.createBook.status = "failed";
      state.createBook.error = action.payload;
    },
    clearCreateBook: (state) => {
      state.createBook.error = null;
      state.createBook.status = "idle";
    },

    // get all books
    getBooksRequest: (state) => {
      state.getBooks.status = "pending";
      state.getBooks.data = null;
      state.getBooks.error = null;
    },
    getBooksSuccess: (state, action) => {
      state.getBooks.status = "success";
      state.getBooks.data = action.payload;
    },
    getBooksError: (state, action) => {
      state.getBooks.status = "failed";
      state.getBooks.error = action.payload;
    },
    clearGetBooks: (state) => {
      state.getBooks.error = null;
      state.getBooks.status = "idle";
    },

    // update book
    updateBookRequest: (state) => {
      state.updateBook.status = "pending";
      state.updateBook.error = null;
    },
    updateBookSuccess: (state, action) => {
      state.updateBook.status = "success";
      state.updateBook.data = action.payload;
      // Update book in getBooks.data list
      state.getBooks.data = state.getBooks.data.map((book: any) =>
        book.id === action.payload.id ? action.payload : book
      );
    },
    updateBookError: (state, action) => {
      state.updateBook.status = "failed";
      state.updateBook.error = action.payload;
    },

    //deleting the book
    deleteBookRequest: (state) => {
      state.deleteBook.status = "pending";
      state.deleteBook.data = null;
      state.deleteBook.error = null;
    },
    deleteBookSuccess: (state, action) => {
      state.deleteBook.status = "success";
      state.deleteBook.data = action.payload;
      state.getBooks.data = state.getBooks.data.filter(
        (book: any) => book.id !== action.payload
      );
    },
    deleteBookError: (state, action) => {
      state.deleteBook.status = "failed";
      state.deleteBook.error = action.payload;
    },
    clearDeleteBook: (state) => {
      state.deleteBook.status = "idle";
      state.deleteBook.data = null;
      state.deleteBook.error = null;
    },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;
