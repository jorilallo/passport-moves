# Passport-Moves

[Passport](http://passportjs.org/) strategy for authenticating with [Moves](http://www.moves-app.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Moves in your Node.js applications.
By plugging into Passport, Foursquare authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Usage

#### Configure Strategy

The Moves authentication strategy authenticates users using a Moves API
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new MovesStrategy({
        clientID: MOVES_CLIENT_ID,
        clientSecret: MOVES_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/moves/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ movesId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'moves'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/moves',
      passport.authenticate('moves'));

    app.get('/auth/moves/callback', 
      passport.authenticate('moves', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Credits

  - [Jori Lallo](http://github.com/jorilallo)

Build based on [Jared Hanson](http://github.com/jaredhanson)'s [passport-foursquare](https://github.com/jaredhanson/passport-foursquare).

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 [Jori Lallo](http://github.com/jorilallo)

