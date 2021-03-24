import React, { useCallback } from 'react';
import {
  Container,
  Jumbotron,
  Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';

import { twitter as twitterAPI } from '../../api';
import actions from '../../store/actions';

export default (props) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Jumbotron className="text-center m-5">
        <h1>Login</h1>
        <Button color="primary" onClick={useCallback(() => onLoginButtonClick(dispatch), [dispatch])}>Login With Twitter</Button>
      </Jumbotron>
    </Container>
  );
}

function onLoginButtonClick(dispatch) {
  return twitterAPI.getOAuthRequestToken().then(({ requestToken: { oauth_token, oauth_token_secret } }) => {
    dispatch(actions.user.setUserToken({
      requestToken: {
        oauth_token,
        oauth_token_secret,
      },
      accessToken: null
    }));

    if (typeof window !== 'undefined') {
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    }
  });
}