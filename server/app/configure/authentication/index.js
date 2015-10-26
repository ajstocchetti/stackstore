'use strict';
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var _ = require('lodash');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var ENABLED_AUTH_STRATEGIES = [
    'local',
    //'twitter',
    //'facebook',
    //'google'
];

module.exports = function (app) {

    // First, our session middleware will set/read sessions from the request.
    // Our sessions will get stored in Mongo using the same connection from
    // mongoose. Check out the sessions collection in your MongoCLI.
    app.use(session({
        secret: app.getValue('env').SESSION_SECRET,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: false
    }));

    // Initialize passport and also allow it to read
    // the request session information.
    app.use(passport.initialize());
    app.use(passport.session());

    // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // When we receive a cookie from the browser, we use that id to set our req.user
    // to a user found in the database.
    passport.deserializeUser(function (id, done) {
        User.findById(id, done);
    });

    // We provide a simple GET /session in order to get session information directly.
    // This is used by the browser application (Angular) to determine if a user is
    // logged in already.
    app.get('/session', function (req, res) {
        if (req.user) {
            res.send({ user: _.omit(req.user.toJSON(), ['salt', 'password']) });
        } else {
            res.status(401).send('No authenticated user.');
        }
    });

    // Lets query the db for the email used and let them know if its taken, if not make an account
    app.post('/signup', function (req, res, next) {
        User.findOne({ email: req.body.email }).exec()
        .then(function(user) {
            if (user) {
                res.sendStatus(409)// Status code for conflict aka email is already taken
            } else {
                User.create({
                    email: req.body.email,
                    password: req.body.password
                })
                .then(function (user) {
                    // req.login(user, function () {
                        res.status(201).json(user);
                    // });
                })
                .then(null, function(err) {
                  res.sendStatus(400);
                })
            }
        })
        .then(null, next);
    });

    // Simple /logout route.
    app.get('/logout', function (req, res) {
        req.logout();
        res.status(200).end();
    });

    app.post('/reset', function(req, res, next) {
        console.log("in reset route");
        User.findOne({ 
            email: req.body.email,
            passwordResetTriggered: true 
        }).select('+password +salt +passwordResetTriggered').exec()
        .then(function(user) {
            if (!user || !user.correctPassword(req.body.oldPassword)) {
                return res.sendStatus(404);
            }
            console.log("About to update password")
            user.password = req.body.password;
            user.passwordResetTriggered = false;
            user.save()
        })
        .then(function(user) {
            console.log("successful save")
            res.sendStatus(200);
        })
        .then(null, next)

    })

    // Each strategy enabled gets registered.
    ENABLED_AUTH_STRATEGIES.forEach(function (strategyName) {
        require(path.join(__dirname, strategyName))(app);
    });

};
