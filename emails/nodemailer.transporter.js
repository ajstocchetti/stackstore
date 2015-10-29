var nodemailer = require('nodemailer');
var config = require('../config');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.GMAIL.user,
        pass: config.GMAIL.password
    }
});

module.exports = transporter;
