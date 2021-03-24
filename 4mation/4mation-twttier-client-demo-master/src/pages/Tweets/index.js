import React, { useCallback } from 'react';
import {
  Container,
  Badge
} from 'reactstrap';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { useSelector } from 'react-redux';
import _ from 'lodash';

import TweetTimeline from '../../components/TweetTimeline';
import PostTweetForm from './PostTweetForm';

const LOAD_HOME_TIMELINE = gql`
  query($user: Credentials!, $params: HomeTimelineSearchParams) {
    homeTimeline(credentials: $user, params: $params) {
      id,
      text,
      created_at
      favorite_count,
      id_str,
      favorited
    }
  }
`;

const POST_TWEET = gql`
  mutation($user: Credentials!, $payload: StatusUpdatePayload!) {
    updateStatus(credentials: $user, payload: $payload) {
      id,
      text,
      created_at,
      favorite_count,
      id_str,
      favorited
    }
  }
`;

const POST_TWEET_FORM = 'POST_TWEET_FORM';

function refetchQueries(user) {
  return [{
    query: LOAD_HOME_TIMELINE,
    variables: {
      user: _.omit(user.accessToken, ['__typename'])
    }
  }];
}

export default props => {
  const user = useSelector(state => state.user.data);
  const onPostTweetFormSubmit = useCallback((values, postTweet) => postTweet({
    variables: {
      user: _.omit(user.accessToken, ['__typename']),
      payload: {
        status: values.text
      }
    }
  }), [user]);
  const onTweetCreated = useCallback(() => refetchQueries(user), [user]);

  return (
    <Container>
      <h1 className="text-center">My Tweets</h1>
      <Mutation mutation={POST_TWEET} refetchQueries={onTweetCreated}>
        {
          postTweet => {
            return <PostTweetForm form={POST_TWEET_FORM} onSubmit={values => onPostTweetFormSubmit(values, postTweet)}/>
          }
        }
      </Mutation>
      <Query query={LOAD_HOME_TIMELINE} variables={{
        user: _.omit(user.accessToken, ['__typename'])
      }}>
        {
          ({ loading, error, data }) => {
            if (loading) {
              return <div className="text-center"><Badge color="primary">Loading...</Badge></div>;
            }
            if (error) {
              return <div className="text-center"><Badge color="danger">There is an error, please try again later</Badge></div>;
            }
            const { homeTimeline: timeline } = data;
            return <TweetTimeline timeline={timeline}/>;
          }
        }
      </Query>
    </Container>
  );
}