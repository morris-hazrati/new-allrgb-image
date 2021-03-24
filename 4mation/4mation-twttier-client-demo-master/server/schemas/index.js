const { makeExecutableSchema } = require('graphql-tools');
const _ = require('lodash');

const oauth = require('./oauth');
const user = require('./user');
const statuses = require('./statuses');
const search = require('./search');
const favorites = require('./favorites');

const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  input Credentials {
    oauth_token: String!
    oauth_token_secret: String!
  }

  type Tweet {
    id: String!,
    id_str: String!,
    text: String!,
    created_at: String!,
    favorite_count: Int!,
    favorited: Boolean!
  }
`;
const resolvers = {};

module.exports = makeExecutableSchema({
  typeDefs: [
    Query,
    oauth.typeDef,
    user.typeDef,
    statuses.typeDef,
    search.typeDef,
    favorites.typeDef
  ],
  resolvers: _.merge(
    resolvers,
    oauth.resolvers,
    user.resolvers,
    statuses.resolvers,
    search.resolvers,
    favorites.resolvers
  )
});