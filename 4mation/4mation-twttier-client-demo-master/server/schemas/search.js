const { getAuthorizedClient } = require('../utils/OauthClient');
const qs = require('query-string');
const _ = require('lodash');

function searchTweets(parent, args) {
  const { credentials, params } = args;

  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).get(`/search/tweets.json?${qs.stringify(params)}`, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body.statuses);
    });
  });
}

const typeDef = `
  extend type Query {
    searchTweets(credentials: Credentials!, params: SearchTweetsParams!): [Tweet!]!
  }

  input SearchTweetsParams {
    q: String!,
    geocode: String,
    lang: String,
    locale: String,
    result_type: String,
    count: Int,
    until: String,
    since_id: String,
    max_id: String,
    include_entities: Boolean
  }
`;

const resolvers = {
  Query: {
    searchTweets
  }
};

module.exports = {
  typeDef,
  resolvers
};