const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // 1. Configure the transporter to use Gmail's SMTP servers
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Automatically pulls qioseonlabs@gmail.com
      pass: process.env.EMAIL_PASS  // Automatically pulls your App Password
    }
  });

  // 2. Set up the email parameters
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'qioseonlabs@gmail.com', // Where you want to receive notifications
    replyTo: email,              // Lets you reply directly to the sender
    subject: `New Qioseon Labs Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    // 3. Send the mail
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
}
