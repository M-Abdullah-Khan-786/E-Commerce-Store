const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MP,
        },
    });

    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Hello 👻" <abc@gmail.com>', // sender address
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text: data.text, // plain text body
            html: data.html, // html body (corrected key from 'htm' to 'html')
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email: %s", error);
        res.status(500).send("Failed to send email");
    }
});

module.exports = sendEmail;
