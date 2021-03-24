import React, { useCallback, useState } from 'react';
import { Badge, ListGroup, ListGroupItem, Button } from 'reactstrap';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";
import _ from 'lodash';
import { useSelector } from 'react-redux';

import constants from '../constants';

const { DATE_TIME_FORMAT, TWITTER_DATE_TIME_FORMAT } = constants;

const LIKE_TWEET = gql`
  mutation($user: Credentials!, $payload: CreateFavoritesParams!) {
    createFavorites(credentials: $user, payload: $payload) {
      id
      text
      created_at
      favorite_count
    }
  }
`;

export default props => {
  const { timeline, err } = props;
  const user = useSelector(state => state.user.data);

  if (timeline.length === 0 || err) {
    return <div className="text-center"><Badge>No Tweet Found!</Badge></div>;
  }
  return (
    <ListGroup>{timeline.map(line => {
      const [liked, setLiked] = useState(false);
      const onLikeTweetClick = useCallback((likeTweet, tweet) => {
        likeTweet({
          variables: {
            user: _.omit(user.accessToken, ['__typename']),
            payload: { id: tweet.id_str }
          }
        }).then(() => setLiked(true));
      }, []);

      return (
        <Mutation mutation={LIKE_TWEET} key={line.id}>
          {
            likeTweet => {
              return (
                <ListGroupItem key={line.id}>
                  <div className="float-right">
                    <Button
                      disabled={line.favorited || liked}
                      color="info"
                      size="sm"
                      onClick={() => onLikeTweetClick(likeTweet, line)}
                    >
                      {(line.favorited || liked) ? 'Liked' : 'Like it'}
                    </Button>
                  </div>
                  <p dangerouslySetInnerHTML={{__html: line.text}}/>
                  <p className="small text-black-50">Created At: {moment(line.created_at, TWITTER_DATE_TIME_FORMAT).format(DATE_TIME_FORMAT)}</p>
                  <p className="small text-black-50">Likes: {line.favorite_count + (liked ? 1 : 0)}</p>
                </ListGroupItem>
              );
            }
          }
        </Mutation>
      );
    })}</ListGroup>
  );
}