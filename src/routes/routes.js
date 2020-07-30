import { createBrowserHistory } from 'history';
import React from 'react';
import queryString from 'query-string';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './index';

import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

export const history = createBrowserHistory();

const Routes = () => {
  const { location } = history;
  const parsedQuery = queryString.parse(location.search);

  return (
    <Router history={history}>
      <Switch>
        {privateRoutes.map(({ component: Component, ...rest }, index) => {
          return (
            <Route exact key={index} {...rest}>
              <MainLayout>
                <Component />
              </MainLayout>
            </Route>
          );
        })}
        {publicRoutes.map(({ component: Component, ...rest }, index) => {
          return (
            <Route exact key={index} {...rest}>
              <AuthLayout>
                <Component />
              </AuthLayout>
            </Route>
          );
        })}
        <Route exact path='/*'>
          <Redirect
            to={{
              //pathname: `${isAuthenticated ? '/products' : '/login'}`,
              state: parsedQuery,
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
