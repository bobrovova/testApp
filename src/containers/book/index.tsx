import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Input, Table, Tag } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Loader from 'components/loader';
import useStateWithCallback from 'hooks/use-state-with-callback';
import IBook from 'entities/book';
import ICharacter from 'entities/character';
import { HOME_ROUTE } from 'constants/routes';

import './style.scss'

const TABLE_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Aliases',
    key: 'aliases',
    dataIndex: 'aliases',
    render: (tags: string[]) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
]

const Book = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useStateWithCallback([]);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { book }: { book: IBook } = location.state as any;

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true);
    const data = await Promise.all(book.characters.map(async (url: string) => {
      const response = await fetch(url);
      const character: ICharacter[] = await response.json();
      return character;
    }))
    setCharacters(data, () => setIsLoading(false))
  }, [setCharacters, setIsLoading, book])

  const onChangeSearch = useCallback((e: any) => {
    setSearchValue(e.target.value)
  }, [setSearchValue])

  const onClickBack = useCallback(() => {
    history.push(HOME_ROUTE)
  }, [])

  useEffect(() => {
    fetchCharacters()
  }, [])

  const filteredCharacters = useMemo(() => {
    return characters.filter((character: ICharacter) => character.name.includes(searchValue))
  }, [searchValue, characters])

  if (isLoading) {
    return <Loader />
  }

  return (
    <Content className="book-container">
      <Button onClick={onClickBack} className="back-btn">
        Back to Books
      </Button>
      <Table
        columns={TABLE_COLUMNS}
        dataSource={filteredCharacters}
        title={() => (
          <Input
            placeholder="Type name of character"
            onChange={onChangeSearch}
          />
        )}
      />
    </Content>
  )
}

export default Book;
