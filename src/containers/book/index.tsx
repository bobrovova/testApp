import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Input, Pagination, Table, Tag } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Loader from 'src/components/loader';
import useStateWithCallback from 'src/hooks/use-state-with-callback';
import IBook from 'src/types/book';
import ICharacter from 'src/types/character';
import { HOME_ROUTE } from 'src/constants/routes';

import './style.scss'

const PAGE_SIZE = 10;

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
  const [page, setPage] = useState(1);
  const totalPage = useMemo(() => {
    return book.characters.length / PAGE_SIZE
  }, [book])

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true);
    const data = await Promise.all([...book.characters].splice((page - 1) * PAGE_SIZE, PAGE_SIZE).map(async (url: string) => {
      const response = await fetch(`${url}`);
      const character: ICharacter[] = await response.json();
      return character;
    }))
    setCharacters(data, () => setIsLoading(false))
    // eslint-disable-next-line
  }, [book, page])

  const onChangeSearch = useCallback((e: any) => {
    setSearchValue(e.target.value.toLowerCase())
  }, [])

  const onClickBack = useCallback(() => {
    history.push(HOME_ROUTE)
  }, [history])

  useEffect(() => {
    fetchCharacters()
    // eslint-disable-next-line
  }, [page])

  const filteredCharacters = useMemo(() => {
    return characters.filter((character: ICharacter) => 
      character.name.toLowerCase().includes(searchValue) ||
      character.aliases.some((alias) => alias.toLowerCase().includes(searchValue))
    )
  }, [searchValue, characters])

  const onChangePage = (value: number) => {
    setPage(value);
  }

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
        rowKey={(item: ICharacter) => item.url}
        pagination={false}
        footer={() => (
          <Pagination current={page} onChange={onChangePage} total={totalPage} showSizeChanger={false} />
        )}
      />
    </Content>
  )
}

export default Book;
