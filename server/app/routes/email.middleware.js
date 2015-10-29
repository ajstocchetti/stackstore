'use strict';
var mongoose    = require('mongoose');
var swig        = require('swig');
var path        = require('path');
var transporter = require('../../../emails/nodemailer.transporter');
var User        = mongoose.model('User');


module.exports = {

  sendConfirmationEmail: function(req, res, next){
  	console.log('inside sendConfirmationEmail', req.session.passport.user);

	if(req.body.orderStatus =='completed'){
		console.log('status completed');
		console.log(req.body);
			
		var sendTo   = req.body.recipient;
		var shipTo   = req.body.shipTo;
		var template = swig.compileFile(__dirname+'../../../../emails/template.html');

		var output = template({
			name:sendTo,
			shippingAddress: shipTo
		})
		// NB! No need to recreate the transporter object. You can use
		// the same transporter object for all e-mails

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Order Droid <team.brotein.stackstore@gmail.com>', // sender address
		    to: sendTo, // list of receivers
		    subject: 'Your order is on the way!', // Subject line
		    text: 'the plain text', // plaintext body
		    html: output // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions);
			
			
		
	}
	else{
		next();	
	}

	}
}


  