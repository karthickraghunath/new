const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Gmail Setup
function createGmailClient() {
  // Check if using app password
  if (process.env.GMAIL_USE_APP_PASSWORD === 'true') {
    return {
      type: 'app-password',
      email: process.env.GMAIL_SEND_FROM,
      password: process.env.GMAIL_APP_PASSWORD
    };
  }

  // Otherwise try OAuth2
  const clientId = process.env.GMAIL_API_CLIENT_ID;
  const clientSecret = process.env.GMAIL_API_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_API_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'urn:ietf:wg:oauth:2.0:oob'
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return {
    type: 'oauth2',
    client: google.gmail({ version: 'v1', auth: oauth2Client })
  };
}

const gmailClient = createGmailClient();

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/send-email.php', async (req, res) => {
  try {
    console.log('📥 Received enquiry...');
    
    // Extract form data
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phone = req.body.phone;
    const country = req.body.country;
    const flowerVariety = req.body.flowerVariety;
    const enquiryType = req.body.enquiryType;
    const quantity = req.body.quantity;
    const quantityUnit = req.body.quantityUnit;
    const message = req.body.message;

    console.log('📨 Parsed fields:');
    console.log('  - Full Name:', fullName);
    console.log('  - Email:', email);
    console.log('  - Phone:', phone);
    console.log('  - Country:', country);
    console.log('  - Flower Variety:', flowerVariety);
    console.log('  - Enquiry Type:', enquiryType);
    console.log('  - Quantity:', quantity);
    console.log('  - Unit:', quantityUnit);
    console.log('  - Message:', message);

    // Validation
    if (!fullName) return res.json({ status: 'error', message: 'Full Name is required' });
    if (!email) return res.json({ status: 'error', message: 'Email is required' });
    if (!phone) return res.json({ status: 'error', message: 'Phone is required' });
    if (!country) return res.json({ status: 'error', message: 'Country is required' });
    if (!flowerVariety) return res.json({ status: 'error', message: 'Flower Variety is required' });
    if (!enquiryType) return res.json({ status: 'error', message: 'Enquiry Type is required' });
    if (!quantity) return res.json({ status: 'error', message: 'Quantity is required' });
    if (!quantityUnit) return res.json({ status: 'error', message: 'Unit is required' });
    if (!message) return res.json({ status: 'error', message: 'Message is required' });

    console.log('✅ All fields validated successfully!');

    // Build email body
    let emailBody = 'HN ENTERPRISES\n';
    emailBody += 'NEW EXPORT ENQUIRY\n';
    emailBody += '================================================\n\n';
    emailBody += `Full Name: ${fullName}\n`;
    emailBody += `Email Address: ${email}\n`;
    emailBody += `Phone Number: ${phone}\n`;
    emailBody += `Country: ${country}\n`;
    emailBody += `Flower Variety: ${flowerVariety}\n`;
    
    if (flowerVariety.includes('Other:')) {
      const customFlower = flowerVariety.substring(7);
      emailBody += `Custom Flower Type: ${customFlower}\n`;
    }
    
    emailBody += `Enquiry Type: ${enquiryType}\n`;
    emailBody += `Quantity / Volume: ${quantity} ${quantityUnit}\n\n`;
    emailBody += `Message:\n${message}\n\n`;
    emailBody += '================================================\n';
    emailBody += `Submitted: ${new Date().toLocaleString()}\n`;
    emailBody += `From: localhost:8000\n`;
    emailBody += `Reply To: ${email}\n`;

    // Save enquiry to file (backup)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const enquiriesDir = path.join(__dirname, 'enquiries');
    
    if (!fs.existsSync(enquiriesDir)) {
      fs.mkdirSync(enquiriesDir);
    }
    
    const filePath = path.join(enquiriesDir, `enquiry_${timestamp}.txt`);
    fs.writeFileSync(filePath, emailBody);
    console.log('✅ Enquiry saved to file:', filePath);

    // Send email via Gmail API or App Password
    console.log('📧 Attempting to send email via Gmail...');
    
    if (!gmailClient) {
      console.warn('⚠️  Gmail not configured. Enquiry saved locally.');
      return res.json({ 
        status: 'success', 
        message: 'Enquiry received! We will review it and get back to you soon.',
        enquiryId: timestamp,
        note: 'Email service not configured - enquiry saved locally'
      });
    }

    try {
      let sentSuccessfully = false;

      // Check if using app password
      if (gmailClient.type === 'app-password') {
        // Use nodemailer with app password
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailClient.email,
            pass: (gmailClient.password || '').replace(/\s/g, '')
          }
        });

        const mailOptions = {
          from: gmailClient.email,
          to: process.env.GMAIL_SEND_TO,
          replyTo: email,
          subject: 'New Export Enquiry - HN Enterprises',
          text: emailBody
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent via Gmail App Password!');
        console.log('   Message ID:', info.messageId);
        sentSuccessfully = true;

      } else if (gmailClient.type === 'oauth2') {
        // Use OAuth2
        const message = [
          `From: ${process.env.GMAIL_SEND_FROM}`,
          `To: ${process.env.GMAIL_SEND_TO}`,
          `Reply-To: ${email}`,
          'Subject: New Export Enquiry - HN Enterprises',
          'Content-Type: text/plain; charset="UTF-8"',
          'MIME-Version: 1.0',
          '',
          emailBody
        ].join('\n');

        const encodedMessage = Buffer.from(message).toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');

        const response = await gmailClient.client.users.messages.send({
          userId: 'me',
          requestBody: {
            raw: encodedMessage,
          },
        });

        console.log('✅ Email sent via Gmail OAuth2!');
        console.log('   Message ID:', response.data.id);
        sentSuccessfully = true;
      }

      if (sentSuccessfully) {
        return res.json({ 
          status: 'success', 
          message: 'Enquiry sent successfully! We will review it and get back to you soon.',
          enquiryId: timestamp
        });
      }

    } catch (gmailError) {
      console.error('❌ Gmail error:', gmailError.message);
      
      // Even if email fails, enquiry is saved locally
      return res.json({ 
        status: 'success', 
        message: 'Enquiry received! We will review it and get back to you soon.',
        enquiryId: timestamp,
        note: 'Saved locally due to email service issue'
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.json({ status: 'error', message: 'Failed to process enquiry: ' + error.message });
  }
});

// API endpoint to get all enquiries (for admin view)
app.get('/api/enquiries', (req, res) => {
  try {
    const enquiriesDir = path.join(__dirname, 'enquiries');
    
    if (!fs.existsSync(enquiriesDir)) {
      return res.json({ enquiries: [] });
    }

    const files = fs.readdirSync(enquiriesDir).sort().reverse();
    const enquiries = files.map(file => ({
      id: file.replace('.txt', ''),
      timestamp: file.replace('enquiry_', '').replace('.txt', ''),
      content: fs.readFileSync(path.join(enquiriesDir, file), 'utf8')
    }));

    res.json({ enquiries });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ HN Enterprises Server Running`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📧 Email Service: Gmail API`);
  console.log(`📂 Enquiries saved to: ./enquiries/\n`);
});
