const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: 'haidarali5464@gmail.com',
        pass: process.env.PASS_EMAIL
    },
});
const sendEmail = async (mail) => {
    try {
        const info = await transporter.sendMail(mail);
        return info;
    } catch (err) {
        throw err;
    }
};

module.exports = sendEmail