import { gql } from "apollo-boost";
import _ from 'lodash';

import APIClient from '../../../utils/APIClient';

function getAccessToken(user) {
  return _.omit(user.accessToken, ['__typename']);
}

export default {
  search(user, params) {
    return APIClient.query({
      query: gql`
        query($user: Credentials!, $params: SearchParams!) {
          searchUser(
            credentials: $user,
            params: $params
          ) {
            id
            name
            screen_name
            profile_image_url_https
            profile_banner_url
          }
        }
      `,
      variables: {
        params,
        user: getAccessToken(user)
      }
    }).then(res => res.data);
  }
}