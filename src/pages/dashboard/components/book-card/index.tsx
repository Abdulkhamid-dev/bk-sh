import React, { FC, useState } from 'react'
import "./index.css";
import { TBook } from '@/type';
import { Button, MenuItem, NativeSelect, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material';
import { CustomAxiosRequestConfig, apiClient } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setBooks } from '@/redux/reducers/bookSlice';

type TProps = {
  book: TBook
}
const bookStatus: { [key: number]: string } = {
  0: "New",
  1: "Reading",
  2: "Finished",
}

const MenuProps = {
  PaperProps: {
    style: {
      width: "140px",
    },
  },
};
const BookCard: FC<TProps> = ({ book }) => {
  const dispatch = useAppDispatch()
  const { books } = useAppSelector((state) => state.books);
  const [readingStatus, setReadingStatus] = useState(book?.status || 0)
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (event: SelectChangeEvent) => {
    setLoading(true)
    setReadingStatus(Number(event.target.value))
    try {
      const data = await apiClient.patch(`/books/${book.book?.id}`, { status: Number(event.target.value) }, { useAuthHeaders: true, } as CustomAxiosRequestConfig);
      let updatedBooks: TBook[] = books?.map((bk) => {
        if (bk.book?.id === book.book?.id) {
          return data.data.data;
        }
        return bk;
      }) || []
      dispatch(setBooks(updatedBooks))
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  const deleteBook = async () => {
    setLoading(true)
    try {
      const data = await apiClient.delete(`/books/${book.book?.id}`, { useAuthHeaders: true, } as CustomAxiosRequestConfig);
      console.log({data});
      let updatedBooks: TBook[] = books?.filter((bk) => bk.book?.id !== book.book?.id) || []
      dispatch(setBooks(updatedBooks))
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false)
    }
  }


  return (
    <div className="book-card">
      <img className="book-img" src={book.book?.cover} alt="book-image" />
      <h4 className="book-title">{book.book?.title ? book.book.title : "No title"}</h4>
      <p className="book-info">
        {book.book?.author ? book.book.author : "No author"},
        {book.book?.published ? book.book.published : "No year"}
      </p>
      <Typography variant="body2">status: {bookStatus[book?.status]}</Typography>
      <div className="actions">
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={String(readingStatus)}
          onChange={handleStatusChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          disabled={!book.book?.id || loading}
        >
          <MenuItem value={0}>New</MenuItem>
          <MenuItem value={1}>Reading</MenuItem>
          <MenuItem value={2}>Finished</MenuItem>
        </Select>
        <Button variant="contained" size='small' color='error' disabled={!book.book?.id || loading} onClick={deleteBook}>Delete</Button>
      </div>
    </div>
  )
}

export default BookCard
