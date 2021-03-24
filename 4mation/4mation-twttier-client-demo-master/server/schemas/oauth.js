const oauth = require('../utils/OauthClient');

function requestToken(parent, args, context, info) {
  return new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
      if (error) {
        return reject(error);
      }
      resolve({
        oauth_token,
        oauth_token_secret,
        oauth_callback_confirmed: results.oauth_callback_confirmed === 'true'
      });
    });
  });
}

function accessToken(parent, args) {
  return new Promise((resolve, reject) => {
    oauth.getOAuthAccessToken(args.oauth_token, args.oauth_token_secret, args.oauth_verifier, (error, oauth_token, oauth_token_secret, results) => {
      if (error) {
        return reject(error);
      }
      resolve({
        oauth_token,
        oauth_token_secret
      });
    });
  });
}

const typeDef = `
  extend type Query {
    requestToken: TwitterOauthToken,
    accessToken(oauth_verifier: String!, oauth_token: String!, oauth_token_secret: String!): TwitterAccessToken
  }

  type TwitterOauthToken {
    oauth_token: String!,
    oauth_token_secret: String!,
    oauth_callback_confirmed: Boolean!
  }

  type TwitterAccessToken {
    oauth_token: String!,
    oauth_token_secret: String!
  }
`;

const resolvers = {
  Query: {
    requestToken,
    accessToken
  }
};

module.exports = {
  typeDef,
  resolvers
};