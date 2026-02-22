require('dotenv').config();
const nodemailer = require('nodemailer');


//transporter use smtp protocol to send email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});
// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"bank-backend" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = 'Welcome to Our Bank!';
  const text = `Dear ${name}, welcome to our bank! We're excited to have you on board.`;
  const html = `<p>Dear <strong>${name}</strong>, welcome to our bank! We're excited to have you on board.</p>`;
  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, fromAccount, toAccount) {
  const subject = 'Transaction Alert';
  const text = `Dear ${name}, a transaction of ${amount} has been made from account ${fromAccount} to account ${toAccount}.`;
  const html = `<p>Dear <strong>${name}</strong>, a transaction of <strong>${amount}</strong> has been made from account <strong>${fromAccount}</strong> to account <strong>${toAccount}</strong>.</p>`;
  await sendEmail(userEmail, subject, text, html);
}

async function failedTransactionEmail(userEmail, name, amount, fromAccount, toAccount) {
  const subject = 'Transaction Failed';
  const text = `Dear ${name}, a transaction of ${amount} from account ${fromAccount} to account ${toAccount} has failed. Please try again.`;
  const html = `<p>Dear <strong>${name}</strong>, a transaction of <strong>${amount}</strong> from account <strong>${fromAccount}</strong> to account <strong>${toAccount}</strong> has failed. Please try again.</p>`;
  await sendEmail(userEmail, subject, text, html);
}

module.exports ={
    sendRegistrationEmail,
    sendTransactionEmail,
    failedTransactionEmail,
    sendEmail
}
