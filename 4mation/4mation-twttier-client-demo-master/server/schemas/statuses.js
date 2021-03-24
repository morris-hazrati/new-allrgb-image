const { getAuthorizedClient } = require('../utils/OauthClient');
const qs = require('query-string');
const _ = require('lodash');

function loadUserTimeline(parent, args) {
  const { credentials, params } = args;
  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).get(`/statuses/user_timeline.json?${qs.stringify(params)}`, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

function loadHomeTimeline(parent, args) {
  const { credentials, params } = args;
  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).get(`/statuses/home_timeline.json?${qs.stringify(params)}`, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

function updateStatus(parent, args) {
  const { credentials, payload } = args;
  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).post('/statuses/update.json', payload, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

const typeDef = `
  extend type Query {
    userTimeline(credentials: Credentials!, params: UserTimelineSearchParams!): [Tweet!]!,
    homeTimeline(credentials: Credentials!, params: HomeTimelineSearchParams): [Tweet!]!,
  }

  extend type Mutation {
    updateStatus(credentials: Credentials!, payload: StatusUpdatePayload!): Tweet!
  }

  input HomeTimelineSearchParams {
    since_id: String,
    count: Int,
    max_id: String,
    trim_user: Boolean,
    exclude_replies: Boolean,
    include_rts: Boolean
  }

  input UserTimelineSearchParams {
    user_id: String,
    screen_name: String,
    since_id: String,
    count: Int,
    max_id: String,
    trim_user: Boolean,
    exclude_replies: Boolean,
    include_rts: Boolean
  }

  input StatusUpdatePayload {
    status: String!,
    in_reply_to_status_id: String,
    auto_populate_reply_metadata: Boolean,
    exclude_reply_user_ids: String,
    attachment_url: String,
    media_ids: String,
    possibly_sensitive: Boolean,
    lat: Float,
    long: Float,
    place_id: String,
    display_coordinates: Boolean,
    trim_user: Boolean,
    enable_dmcommands: Boolean,
    fail_dmcommands: Boolean,
    card_uri: String
  }
`;

const resolvers = {
  Query: {
    userTimeline: loadUserTimeline,
    homeTimeline: loadHomeTimeline
  },
  Mutation: {
    updateStatus
  }
};

module.exports = {
  typeDef,
  resolvers
};