const { getAuthorizedClient } = require('../utils/OauthClient');
const qs = require('query-string');
const _ = require('lodash');

function searchUser(parent, args) {
  const { credentials, params } = args;

  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).get(`/users/search.json?${qs.stringify(params)}`, (err, body) => {
      if (err) {
        return reject(err);
      }
      const list = body.map(item => ({
        ...item,
        id: item.id.toString()
      }));
      resolve(list);
    });
  });
}

function showUser(parent, args) {
  const { credentials, params } = args;

  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).get(`/users/show.json?${qs.stringify(params)}`, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(_.pick(body, ['id', 'name', 'screen_name', 'profile_image_url_https', 'profile_banner_url']));
    });
  });
}

const typeDef = `
  extend type Query {
    searchUser(
      credentials: Credentials!,
      params: SearchParams!
    ): [TwitterUser!]!,

    showUser(
      credentials: Credentials!, params: ShowUserParams!
    ): TwitterUser
  }

  input SearchParams {
    q: String!,
    page: Int,
    count: Int,
    include_entities: Boolean
  }

  input ShowUserParams {
    user_id: String,
    screen_name: String,
    include_entities: Boolean
  }

  type TwitterUser {
    id: String!,
    name: String,
    screen_name: String,
    profile_image_url_https: String,
    profile_banner_url: String
  }
`;

const resolvers = {
  Query: {
    searchUser,
    showUser
  }
};

module.exports = {
  typeDef,
  resolvers
};