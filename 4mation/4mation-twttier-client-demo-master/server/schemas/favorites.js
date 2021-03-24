const { getAuthorizedClient } = require('../utils/OauthClient');
const qs = require('query-string');
const _ = require('lodash');

function createFavorites(parent, args) {
  const { credentials, payload } = args;

  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).post(`/favorites/create.json`, payload, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

const typeDef = `
  extend type Mutation {
    createFavorites(credentials: Credentials!, payload: CreateFavoritesParams!): Tweet
  }

  input CreateFavoritesParams {
    id: String!,
    include_entities: Boolean
  }
`;

const resolvers = {
  Mutation: {
    createFavorites
  }
};

module.exports = {
  typeDef,
  resolvers
};