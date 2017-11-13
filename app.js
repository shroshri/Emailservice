var express = require('express'),
    path = require('path');
    // nodeMailer = require('nodemailer');
    var app = express();
    port = process.env.PORT || 5000,
    bodyParser = require('body-parser');
    
app.set('view engine', 'ejs');
app.use(express.static('public'));
// var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.render('index');
});

app.post('/send-email', function (req, res) {
      // using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
          from: '"shriny" shriny.savio@gmail.com', // sender address
          to: req.body.to, // list of receivers
          cc: req.body.cc,
          // bcc: ['req.body.to', 'req.body.to'],
          replyTo: req.body.replyto,
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          html: '<b>NodeJS Email Service</b>' // html body
      };

      sgMail
		.send(msg)
		.then(() => console.log('Mail sent successfully'))
		.catch(error => console.error(error.toString()));

      // sgMail.send(msg, (error, info) => {
      //     if (error) {
      //         return console.log(error);
      //     }
      //     console.log('Message %s sent: %s', info.messageId, info.response);
      //         res.render('index');
      //     });
      });

app.listen(process.env.PORT || 5000);
console.log('Server is running on port 5000...');

// app.listen(port, function(req, res){
//   console.log('Server is running at port: ',port);
// });
    
