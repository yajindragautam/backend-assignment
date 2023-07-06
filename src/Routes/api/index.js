const express = require('express');
const Route = express.Router();
const isLoggedIn = require('../../middlewares/isLoggedIn');
const {login,forgotPassword,resetPassword,singUp} = require('../../Controllers/authControllers');

//Sign up
Route.post('/api/signup',singUp);

//POST login
Route.post("/api/login",login);

// Forgot password
Route.post('/forgot',forgotPassword)

//GET Verify Password
// Route.get('/verify',loadVerifyPassPage)

//POST new Password
Route.post('/reset/:token',resetPassword)


module.exports = Route;