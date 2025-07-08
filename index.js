require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// TEMP: Simulated in-memory database
const donors = [];

// Health check
app.get('/', (req, res) => {
  res.send('Snippy Server is running!');
});

// BMAC webhook route
app.post('/api/bmac-webhook', async (req, res) => {
  const { email, name, message, amount, referrer } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const code = uuidv4();

  // TEMP: Log it to console
  console.log('🎁 New Donor!');
  console.log({ name, email, message, amount, referrer, code });

  // Save in-memory
  donors.push({ email, name, code, timestamp: new Date() });

  // Email the code to the user
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Snippy the Extension" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🎉 Your Snippy Unlock Code`,
      text: `Thanks for donating, ${name}!\n\nHere is your Snippy unlock code:\n\n${code}\n\nPaste this into the Snippy Editor under Settings → Unlock Premium Features.`,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to donor.');
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Email failed:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Snippy backend running on port 3000');
});
