const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 5000;

require('dotenv').config();

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint for handling form submission
app.post('/send-email', (req, res) => {
  const { name, email, feature } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., Gmail, Outlook
    auth: {
      user: 'shantanubwii76@gmail.com',
      pass: process.env.MAIL_PASS,
    },
  });

  // Email message options
  const mailOptions = {
    from: email,
    to: 'prabhatbwii@gmail.com',
    subject: 'New Feature Request',
    text: `
      Name: ${name}
      Email: ${email}
      Feature Description: ${feature}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
