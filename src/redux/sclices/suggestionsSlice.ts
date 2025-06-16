import { createSlice } from "@reduxjs/toolkit";


const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {
    suggestionsQuery: "",
    getSuggestions: {
      status: "idle", // idle | loading | succeeded | failed
      data: null,
      error: null,
    }
  },
  reducers: {
    // For currrent wheather
    getSuggestionsReuest: (state) => {
      state.getSuggestions.status = "loading";
      state.getSuggestions.error = null;
    },
    getSuggestionsSuccess: (state, action) => {
      (state.getSuggestions.status = "succeeded"), (state.getSuggestions.data = action.payload);
    },
    getSuggestionsFailure: (state, action) => {
      (state.getSuggestions.status = "failed"), (state.getSuggestions.error = action.payload);
    },
    clearGetsuggestionSatus: (state) => {state.getSuggestions.status = "idle"},
    clearGetsuggestionError: (state) => {state.getSuggestions.data = null},
    clearGetsuggestionData: (state) => {state.getSuggestions.error = null},
    
    setSuggestionsQuery: (state, action) => {
      state.suggestionsQuery = action.payload;
    }
  },
});

export const suggestionsActions  = suggestionsSlice.actions;
export default suggestionsSlice.reducer;