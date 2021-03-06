/* Two-Factor Auth Tutorial Code Sample
  `nexmo.verify.request` to send a temp code to a user's phone, then
  `nexmo.verify.check` to validate the code entered by the user (on te web interface)

  In this sample app, upon a user registartion, store the user's phone number
  (as a key) and the generated request ID (as the value) in the persist storage.

  When the user enter the PIN code, look the info up and match the PIN with the
  requerst ID fromt he storage to verify.

  Verify API Reference: https://docs.nexmo.com/verify/api-reference/api-reference
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.use(bodyParser.json()); // for parsing POST req
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views'); // Render on browser
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/views'));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

// Web UI ("Registration Form")
app.get('/', function (req, res) {
  res.render('index');
});

app.post('/register', (req, res) => {
  // A user registers with a mobile phone number
  let phoneNumber = req.body.number;
  phoneNumber = phoneNumber.replace(/\D/g,'');

  console.log(phoneNumber);
  nexmo.verify.request({number: phoneNumber, brand: 'Awesome Company'}, (err, result) => {
    if(err) {
      res.render('status', {message: 'Server Error'});
    } else {
      console.log(result);
      let requestId = result.request_id;
      if(result.status == '0') {
        res.render('verify', {requestId: requestId});
      } else {
        res.render('status', {message: result.error_text, requestId: requestId});
      }
    }
  });
});

app.post('/verify', (req, res) => {
  // Checking to see if the code matches
  let pin = req.body.pin;
  let requestId = req.body.requestId;

  nexmo.verify.check({request_id: requestId, code: pin}, (err, result) => {
    if(err) {
      res.render('status', {message: 'Server Error'});
    } else {
      console.log(result);
      // Error status code: https://docs.nexmo.com/verify/api-reference/api-reference#check
      if(result && result.status == '0') {
        res.render('status', {message: 'Account verified! 🎉'});
      } else {
        res.render('status', {message: result.error_text, requestId: requestId});
      }
    }
  });
});
