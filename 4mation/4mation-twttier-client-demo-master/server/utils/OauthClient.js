const { OAuth } = require('oauth');

const TWITTER_COMSUMER_KEY = process.env.TWITTER_COMSUMER_KEY;
const TWITTER_COMSUMER_SECRET = process.env.TWITTER_COMSUMER_SECRET;
const TWITTER_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/twitter_callback';

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  // 'Y5svnpKUEgcyaoRNwo5oeOgcW',
  TWITTER_COMSUMER_KEY,
  // 'E1Q3eY8vVbSjfZgQgaULvKDc5AEsxEmZ2LSCwPQfUdJumbToxL',
  TWITTER_COMSUMER_SECRET,
  '1.0',
  // 'http://localhost:3000/twitter_callback',
  TWITTER_CALLBACK_URL,
  'HMAC-SHA1'
);

module.exports = oauth;
module.exports.getAuthorizedClient = credentials => {
  const { oauth_token, oauth_token_secret } = credentials;
  return {
    get(url, callback) {
      return oauth.get(
        `https://api.twitter.com/1.1/${url}`,
        oauth_token,
        oauth_token_secret,
        (err, body) => {
          try {
            if (err) {
              throw err;
            }
            body = JSON.parse(body);
            callback(err, body);
          } catch(e) {
            callback(e, body);
          }
        }
      );
    },
    post(url, payload, callback) {
      return oauth.post(`https://api.twitter.com/1.1/${url}`, oauth_token, oauth_token_secret, payload, "application/x-www-form-urlencoded", (err, body) => {
        try {
          if (err) {
            throw err;
          }
          body = JSON.parse(body);
          callback(err, body);
        } catch(e) {
          callback(e, body);
        }
      });
    }
  };
}