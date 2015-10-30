'use strict';
var mongoose    = require('mongoose');
var swig        = require('swig');
var path        = require('path');
var transporter = require('../../../emails/nodemailer.transporter');
var User        = mongoose.model('User');


module.exports = {

  sendConfirmationEmail: function(req, res, next){

	if(req.body.orderStatus =='completed'){
		
			
		var sendTo   = req.body.recipient;
		var shipTo   = req.body.shipTo;
		// var items	 = req.body.items;
		var items =[];
		for (var item in req.body.items){
			items.push(req.body.items[item].product + ' x ' + req.body.items[item].quantity)
		}
		var template = swig.compileFile(__dirname+'../../../../emails/template.html');

		var output = template({
			name           :sendTo,
			shippingAddress: shipTo,
			items          : items

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
		next();	
			
		
	}
	else{
		next();	
	}

	}
}

