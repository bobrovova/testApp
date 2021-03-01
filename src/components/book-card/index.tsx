import { Button, Card } from 'antd';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { BOOK_ROUTE } from 'src/constants/routes';
import IBook from 'src/types/book';

interface IBookCardProps {
  book: IBook;
}

const BookCard = ({book}: IBookCardProps) => {
  const history = useHistory();

  const onClickDetails = () => {
    history.push(BOOK_ROUTE, { book })
  }

  return (
    <Card title={book.name} bordered={false}>
      <p>
        Authors:&nbsp;
        {
          book.authors.join(', ')
        }
      </p>
      <p>Country: {book.country}</p>
      <p>Year: {(new Date(book.released)).getFullYear()}</p>
      <Button onClick={onClickDetails}>
        Details
      </Button>
    </Card>
  )
}

export default memo(BookCard);
