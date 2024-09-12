const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user: 'haidarali5464@gmail.com',
        pass: process.env.PASS_EMAIL,
    },
});
const sendEmail = (mail) => {
    return transporter.sendMail(mail, (err, info) => {
        if (err){
            console.log(err);
        }
        else{
            console.log('Email sent : ' + info.response);
        }
    });
}

module.exports = sendEmail