import { createBrowserHistory } from 'history';
import React from 'react';
import queryString from 'query-string';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { privateRoutes, publicRoutes } from './index';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

export const history = createBrowserHistory();

const PrivateRoute = ({ path, component: Component, layout: Layout }) => {
  if (localStorage.getItem('token')) {
    return (
      <Route exact path={path}>
        <Layout>
          <Component />
        </Layout>
      </Route>
    );
  }
  return <Redirect to='/login' />;
};

PrivateRoute.propTypes = {
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

const PublicRoute = ({ path, component: Component, layout: Layout }) => {
  if (localStorage.getItem('token')) {
    return <Redirect to='/home' />;
  }
  if (path === '/') {
    return <Redirect to='/home' />;
  }
  return (
    <Route exact path={path}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  );
};

PublicRoute.propTypes = {
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

const Routes = () => {
  const { location } = history;
  const parsedQuery = queryString.parse(location.search);

  return (
    <Router history={history}>
      <Switch>
        {privateRoutes.map(({ path, component }, index) => {
          return (
            <PrivateRoute
              path={path}
              component={component}
              layout={MainLayout}
              key={index}
            />
          );
        })}
        {publicRoutes.map(({ path, component }, index) => {
          return (
            <PublicRoute
              path={path}
              component={component}
              layout={AuthLayout}
              key={index}
            />
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
