import { TBook } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TBookStore = {
  books: null,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<TBook[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<TBook>) => {
      return {
        ...state,
        books: state.books === null ? [action.payload]: [...state.books, action.payload],
      };
    },
  },
});
type TBookStore = {
  books: TBook[] | null;
};

export const { setBooks, addBook } = bookSlice.actions;
export default bookSlice.reducer;
