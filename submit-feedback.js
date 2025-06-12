// api/submit-feedback.js

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, location, message, rating } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name || 'User'}" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: '📩 New Feedback From BCR FM user',
      text: `
Name: ${name || 'Anonymous'}
Location: ${location || 'N/A'}
Rating: ${rating || 'N/A'}
Message:
${message}
      `,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending mail:', err);
    res.status(500).json({ error: 'Failed to send feedback.' });
  }
}
