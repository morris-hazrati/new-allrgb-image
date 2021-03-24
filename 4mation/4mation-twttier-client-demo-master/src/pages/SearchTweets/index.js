import React, { useState } from 'react';
import {
  Container,
  Badge
} from 'reactstrap';
import { ApolloConsumer } from 'react-apollo';
import { gql } from "apollo-boost";
import _ from 'lodash';
import { useSelector } from 'react-redux';

import TweetSearchForm from './TweetSearchForm';
import TweetTimeline from '../../components/TweetTimeline';

const TWEET_SEARCH_FORM = 'TWEET_SEARCH_FORM';

const SEARCH_TWEETS = gql`
  query($user: Credentials!, $params: SearchTweetsParams!) {
    searchTweets(credentials: $user, params: $params) {
      id
      text
      created_at
      favorite_count
      id_str
      favorited
    }
  }
`;

function searchTweets(APIClient, user, values) {
  return APIClient.query({
    query: SEARCH_TWEETS,
    variables: {
      params: {
        q: values.q
      },
      user: _.omit(user.accessToken, ['__typename'])
    }
  }).then(res => res.data.searchTweets);
}

export default props => {
  const user = useSelector(state => state.user.data);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <h1 className="text-center">Search Tweets</h1>
      <ApolloConsumer>
        {
          client => {
            return (
              <div className="mb-3">
                <TweetSearchForm form={TWEET_SEARCH_FORM} onSubmit={values => {
                  setLoading(true);
                  return searchTweets(client, user, values).then(res => {
                    setTweets(res);
                  }).catch(err => {
                    console.error(err);
                    setTweets([]);
                  }).then(() => setLoading(false));
                }}/>
              </div>
            );
          }
        }
      </ApolloConsumer>
      {loading ? <div className="text-center"><Badge color="primary">Loading...</Badge></div> : (
        <TweetTimeline timeline={tweets}/>
      )}
    </Container>
  );
}