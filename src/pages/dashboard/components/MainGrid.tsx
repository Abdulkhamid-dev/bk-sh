import { Stack, Typography } from '@mui/material'
import React, { FC, useEffect } from 'react'
import BookCard from './book-card'
import { getAllBooks } from '@/utils'
import { useAppSelector } from '@/redux/hooks'

import "./MainGrid.css"

const MainGrid: FC = () => {
    const { books } = useAppSelector((state) => state.books)

    useEffect(() => {
        getAllBooks();
    }, [])

    return (
        <div className="books-main">
            <div className="books-wrapper">
                {!books?.length && <Typography variant='h3'>No Books</Typography>}
                {books?.map((bk, inx) => {
                    return <BookCard book={bk} key={inx} />
                })}
            </div>
        </div>
    )
}

export default MainGrid
