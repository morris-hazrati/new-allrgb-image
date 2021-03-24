import React from 'react';
import {
  Container,
  Badge
} from 'reactstrap';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import TweetTimeline from '../../components/TweetTimeline';

const query = gql`
  query(
    $user: Credentials!,
    $showUserParams: ShowUserParams!
    $userTimelineParams: UserTimelineSearchParams!
  ) {
    showUser(
      credentials: $user,
      params: $showUserParams
    ) {
      id
      name
      screen_name
      profile_image_url_https
      profile_banner_url
    }
    userTimeline(credentials: $user, params: $userTimelineParams) {
      id
      text
      created_at
      favorite_count
      id_str
      favorited
    }
  }
`;

export default props => {
  const twiiterId = _.get(props.match, 'params.id');
  const user = useSelector(state => state.user.data);

  return (
    <Query query={query} variables={{
      user: _.omit(user.accessToken, ['__typename']),
      showUserParams: { user_id: twiiterId },
      userTimelineParams: { user_id: twiiterId }
    }}>{({loading, error, data}) => {
      const { showUser: twitter, userTimeline: timeline } = data;
      return (
        <Container>
          {loading ? <div className="text-center"><Badge color="primary">Loading...</Badge></div> : (
            <div>
              <h1 className="text-center">{twitter.name}</h1>
              <h6 className="text-center">Latest Tweets</h6>
              <TweetTimeline timeline={timeline} err={error}/>
            </div>
          )}
        </Container>
      );
    }}</Query>
  );
}