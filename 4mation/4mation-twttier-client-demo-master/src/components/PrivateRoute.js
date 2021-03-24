import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import _ from 'lodash';

function mapState(state) {
  return {
    isAuthenticated: !_.isNil(_.get(state, 'user.data.accessToken'))
  };
}

export default ({ children, ...rest }) => {
  const storeState = useSelector(mapState);

  return (
    <Route {...rest} render={props => storeState.isAuthenticated ? children : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    )}/>
  );
}