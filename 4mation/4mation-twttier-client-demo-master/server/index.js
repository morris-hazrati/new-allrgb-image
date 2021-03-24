const { ApolloServer, gql } = require('apollo-server');

const TWITTER_COMSUMER_KEY = process.env.TWITTER_COMSUMER_KEY;
const TWITTER_COMSUMER_SECRET = process.env.TWITTER_COMSUMER_SECRET;

if (!TWITTER_COMSUMER_SECRET || !TWITTER_COMSUMER_KEY) {
  console.error('Please provide TWITTER_COMSUMER_KEY and TWITTER_COMSUMER_SECRET in env variables');
  process.exit(1);
}

const schema = require('./schemas');
const server = new ApolloServer({ schema });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});