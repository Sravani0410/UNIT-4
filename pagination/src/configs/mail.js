const nodemailer = require("nodemailer");
module.exports= nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:"a5c59adb970477", // generated ethereal user
      pass:"7e55bf3bdd06b6", // generated ethereal password
    },
  });