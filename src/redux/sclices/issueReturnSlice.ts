// features/issueReturn/issueReturnSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const issueReturnSlice = createSlice({
  name: "issueReturn",
  initialState: {
    getIssuedBooks: {
      status: "idle", // idle | loading | success | failed
      data: [],
      error: null,
    },
    issueBook: {
      status: "idle",
      error: null,
    },
    returnBook: {
      data : null,
      status: "idle",
      error: null,
    },
  },
  reducers: {
    issueBookRequest: (state) => {
      state.issueBook.status = "loading";
    },
    issueBookSuccess: (state) => {
      state.issueBook.status = "success";
      state.issueBook.error = null;
    },
    issueBookFailure: (state, action) => {
      state.issueBook.status = "failed";
      state.issueBook.error = action.payload;
    },
    returnBookRequest: (state) => {
      state.returnBook.status = "loading";
    },
    returnBookSuccess: (state, action) => {
      const updatedIssueEntry = action.payload
      state.getIssuedBooks.data  = state.getIssuedBooks.data.map((issueEntry)=>{
        if(issueEntry.id == updatedIssueEntry.id) return updatedIssueEntry
        else return issueEntry
      })
      state.returnBook.status = "success";
      state.returnBook.error = null;
    },
    returnBookFailure: (state, action) => {
      state.returnBook.status = "failed";
      state.returnBook.error = action.payload;
    },
     getIssuedBooksRequest: (state) => {
      state.getIssuedBooks.status = "loading"
      state.getIssuedBooks.error = null
    },
    getIssuedBooksSuccess: (state, action) => {
      state.getIssuedBooks.status = "success"
      state.getIssuedBooks.data = action.payload
    },
    getIssuedBooksFailure: (state, action) => {
      state.getIssuedBooks.status = "failed"
      state.getIssuedBooks.error = action.payload
    },
  },
});


export const issueReturActions = issueReturnSlice.actions
export default issueReturnSlice.reducer;
