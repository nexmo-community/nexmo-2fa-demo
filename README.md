# Nexmo Two-Factor Authentication Demo

A simple 2FA demo written in Node.js, with a minimal web interface.

![2FA Screenshot](https://github.com/nexmo-community/nexmo-2fa-demo/blob/master/views/screenshot.png?raw=true)

## Why 2FA?

2FA works by combining something that you know (e.g. your password) and something
that you have (e.g. your phone), to verify your identity.

This method made it more difficult for malicious people to steal your password
and spoof your mobile phone number.

In addition to providing added security, 2FA is also very useful for verification
when a new user signs up for a service or app by ensuring that each user has a mobile number.
By requiring a phone number capable of receiving an SMS, apps are able to dramatically cut down on email spam.

## Live Demo
Hosted on Heroku.

Enter your mobile phone number and submit the form.
You should receive an SMS message with a 4-digit PIN code.
Enter the code at the next form to verify.
