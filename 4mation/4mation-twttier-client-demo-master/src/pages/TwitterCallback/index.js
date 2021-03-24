import { useEffect } from 'react';
import qs from 'query-string';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../store/actions';
import { twitter } from '../../api';

export default (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const search = props.location.search;
  const requestToken = useSelector(state => state.user.data.requestToken);

  useEffect(() => {
    const params = qs.parse(search);

    twitter.getOAuthAccessToken(
      params.oauth_token,
      requestToken.oauth_token_secret,
      params.oauth_verifier
    ).then(({ accessToken }) => {
      return dispatch(actions.user.setUserToken({
        accessToken
      }));
    }).then(() => {
      history.replace('/');
    }).catch(err => {
      console.error(err);
      history.replace('/login');
    });
  }, [dispatch, search, requestToken, history]);
  return null;
}