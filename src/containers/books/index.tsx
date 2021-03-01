import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { fetchBooks } from 'api';
import useStateWithCallback from 'hooks/use-state-with-callback';
import BookCard from 'components/book-card';
import Loader from 'components/loader';
import IBook from 'entities/book';

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
  }, []);

  const renderBookCard = (book: any) => {
    return (
      <Col span={8}>
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
