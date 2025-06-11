const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit-feedback', async (req, res) => {
  const { name, location, message, rating } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'francewitness9@gmail.com',
      pass: 'vzrmylayvtnfjypl', // from Google App Passwords
    },
  });

  const mailOptions = {
    from: `"${name}"`,

    to: 'francewitness9@gmail.com',
    subject: '📩 New Feedback From BCR FM user',
    text: `
💬 New Feedback Submitted:

👤 Name: ${name}
📍 Location: ${location}
⭐ Rating: ${rating} stars

📝 Message:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending feedback email:', error);
    res.status(500).json({ message: 'Failed to send feedback.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
