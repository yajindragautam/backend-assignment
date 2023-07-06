const Users = require("../models/users");
const moment = require('moment');
const  {generateRandomNumber,hashPassword,comparePassword} = require("../helpers/commonHelpers");
const {sendVerificationToken} = require("../helpers/emailHelpers");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");



// Sign Up
exports.singUp = async(req,res) =>{
  try {
    const data = {
      first_name: req.body.first_name,
      last_name:req.body.last_name,
      email: req.body.email,
      password:req.body.password
    }
    // check if the user exit og not
    const existingUser = await Users.findOne({where:{email:data.email}});
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    //Hash the password
    const securePass = await hashPassword(data.password);
    data.password = securePass;
    // Create a user
    const user = await Users.create(data);  
    return res.status(200).json({ 
      message: 'User created success.',
      data : user
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
}

// Login
exports.login = async(req,res) =>{
  try {
    const data = {
      email: req.body.email,
      password:req.body.password
    }
    const checkUser = await Users.findOne({where:{email:data.email}});
    if(!checkUser){
      return res.status(401).json({ message: 'Authentication failed ! Invalid Password or Email !' });
    }
    const matchPass = await comparePassword(data.password,checkUser.password);
   
    if(matchPass !== true){
      return res.status(401).json({ message: 'Authentication failed ! Invalid Password or Email !' });
    }
    // req.session.isLogged = true;
    // Generate JWT
    const secretKey = process.env.JWT_SECRET || "DKLFJLDJFOHFGBKLJALFF";
    const token = jwt.sign({ username: checkUser.email }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Authentication successful', token });

  } catch (err) {
    console.log(err);
  }
}


// Forgot Password
exports.forgotPassword = async(req,res)=>{
  try {
    // Get email from body and check if the email exit or not
    // If false throw error "Your email is not registered"
    // If yes generate 6 digits random token
    // Send that token to user email
    // Update token and token expiry time
    const {email} = req.body;
    const data = await User.findOne({email:email});
    if(!data){
      req.flash("error_msg","Your Email Is Not Registered In The System..!");
      return res.redirect('back');
    }

    const token = generateRandomNumber();
    await sendVerificationToken(token);
    const linkExpiryTime = process.env.LINK_EXPIRY_TIME || 20;
    let expiryDate = moment().add(linkExpiryTime, "m");
    let updateData = {
      'resetPasswordToken': token,
      'resetPasswordExpires': expiryDate
    };

    await User.findOneAndUpdate({_id:data._id},updateData);
    req.flash("success_msg","Email Sent Success. Check your Email?");
    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
}




exports.resetPassword = async(req,res)=>{
  try {
    if(req.session.user){
      return res.redirect("/yg_admin");
    }
    const token = req.params.token;
    const currentDate= new Date();
    const user = await User.findOne({resetPasswordToken:token});
    if (user && user.resetPasswordToken !== token) {
      req.flash('error_msg', 'Invalid Token');
      let url = '/wp_admin';
      return res.redirect(url);
    }

    if (user && user.resetPasswordExpires !== null && currentDate > user.resetPasswordExpires) {
      req.flash('error_msg', 'Reset link is invalid or expired.');
      req.flash('error_msg', 'Invalid Token');
      let url = '/wp_admin';
      return res.redirect(url);
    }

    // Take password from body
    // Check if the password are same
    // Update the password
    const {password,confirmPassword} = req.body;
    if(password !== confirmPassword){
      req.flash("error_msg","Password and Conform Password Do't Matched");
      return res.redirect('back');
    }
    const hashedPass = await hashPassword(password);
    const updateData = {
      password:hashedPass,
      resetPasswordToken:'',
      resetPasswordExpires:'',
      updateAt: new Date()
    }
    await User.findOneAndUpdate({_id:user._id},updateData);
    req.flash("success_msg","Password Chnaged Success");
    return res.redirect('/yg_admin');
  } catch (err) {
    console.log(err);
  }
}