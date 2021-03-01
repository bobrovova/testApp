import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss'
import Books from 'containers/books';
import Book from 'containers/book';
import { BOOK_ROUTE, HOME_ROUTE } from 'constants/routes';

function App() {
  return (
    <Router>
      <Layout className="app-container">
        <Switch>
          <Route path={BOOK_ROUTE}>
            <Book />
          </Route>
          <Route path={HOME_ROUTE}>
            <Books />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
