const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
const User=require("../models/user.models")
const { v4: uuidv4 } = require('uuid');

require("dotenv").config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2255/auth/google/callback"

  },
  async function(accessToken, refreshToken, profile, cb) {
    //console.log(accessToken,refreshToken,profile,cb)
    //email
   // console.log(profile._json.email)
    //password
    //console.log(uuidv4())

    let user=await User.findOne({email:profile?._json?.email}).lean().exec()

    if(!user){
      user=await User.create({
        email:profile._json.email,
        password:uuidv4(),
        role:["custemer"]
      })
    }

   console.log(user)
    return cb(null, user);
  })
)

module.exports=passport