/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Moves authentication strategy authenticates requests by delegating to
 * Moves using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Moves application's App ID
 *   - `clientSecret`  your Moves application's App Secret
 *   - `callbackURL`   URL to which Moves will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new MovesStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/moves/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://api.moves-app.com/oauth/v1/authorize';
  options.tokenURL = options.tokenURL || 'https://api.moves-app.com/oauth/v1/access_token';
  options.scope = options.scope || 'default';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'moves';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user info from Moves.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `moves`
 *   - `id`               unique identifier for this user.
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  var url = 'https://api.moves-app.com/oauth/v1/tokeninfo';
  this._oauth2.get(url, accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

    try {
      var json = JSON.parse(body);

      var profile = { provider: 'moves' };
      profile.id = json.user_id;

      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
