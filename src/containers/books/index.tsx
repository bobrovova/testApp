import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { fetchBooks } from 'src/api';
import useStateWithCallback from 'src/hooks/use-state-with-callback';
import BookCard from 'src/components/book-card';
import Loader from 'src/components/loader';
import IBook from 'src/types/book';

import './style.scss'

const Books = () => {
  const [books, setBooks] = useStateWithCallback([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateBooks = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchBooks();
    const books: IBook[] = await response.json();
    setBooks(books, () => setIsLoading(false))
  }, [setBooks, setIsLoading])

  useEffect(() => {
    updateBooks()
    // eslint-disable-next-line
  }, []);

  const renderBookCard = (book: IBook) => {
    return (
      <Col span={8} key={book.isbn}>
        <BookCard book={book} />
      </Col>
    )
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <Content className="books-container">
      <Row gutter={[16, 16]}>
        {books.map(renderBookCard)}
      </Row>
    </Content>
  )
}

export default Books;
