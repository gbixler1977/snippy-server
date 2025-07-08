require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { addDonor, getCodeByEmail, isCodeValid } = require('./db');

const app = express();
app.use(express.json());

<<<<<<< HEAD
=======
// TEMP: Simulated in-memory database
const donors = [];

>>>>>>> 3b23258112d3f53da4e3d7ca4ef70837d08b4ca6
// Health check
app.get('/', (req, res) => {
  res.send('Snippy Server is running!');
});

<<<<<<< HEAD
// POST: Webhook from Zapier after BMAC donation
=======
// BMAC webhook route
>>>>>>> 3b23258112d3f53da4e3d7ca4ef70837d08b4ca6
app.post('/api/bmac-webhook', async (req, res) => {
  const { email, name, message, amount, referrer } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const code = uuidv4();

<<<<<<< HEAD
  try {
    await addDonor({ name, email, code });

=======
  // TEMP: Log it to console
  console.log('🎁 New Donor!');
  console.log({ name, email, message, amount, referrer, code });

  // Save in-memory
  donors.push({ email, name, code, timestamp: new Date() });

  // Email the code to the user
  try {
>>>>>>> 3b23258112d3f53da4e3d7ca4ef70837d08b4ca6
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
<<<<<<< HEAD
    console.log(`✅ Email sent to ${email}.`);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error processing webhook:', err);
    res.status(500).json({ error: 'Failed to process donation.' });
  }
});

// GET: Resend unlock code by email
app.get('/api/resend-code', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Missing email.' });

  try {
    const code = await getCodeByEmail(email);
    if (!code) return res.status(404).json({ error: 'No unlock code found for this email.' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Snippy the Extension" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🔁 Your Snippy Unlock Code (Resent)`,
      text: `You asked for your unlock code. Here it is:\n\n${code}\n\nPaste this into Snippy's Settings to unlock premium features.`,
    });

    console.log(`📬 Resent unlock code to ${email}`);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Resend email failed:', err);
    res.status(500).json({ error: 'Failed to resend unlock code.' });
  }
});

// Start server
=======
    console.log('✅ Email sent to donor.');
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Email failed:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Start the server
>>>>>>> 3b23258112d3f53da4e3d7ca4ef70837d08b4ca6
app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Snippy backend running on port 3000');
});
