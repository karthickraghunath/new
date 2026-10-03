const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

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

    // Save enquiry to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const enquiriesDir = path.join(__dirname, 'enquiries');
    
    // Create enquiries directory if it doesn't exist
    if (!fs.existsSync(enquiriesDir)) {
      fs.mkdirSync(enquiriesDir);
    }
    
    const filePath = path.join(enquiriesDir, `enquiry_${timestamp}.txt`);
    fs.writeFileSync(filePath, emailBody);

    console.log('✅ Enquiry saved to file:', filePath);
    console.log('📧 Ready to send - file saved at:', filePath);
    console.log('\n' + emailBody);

    // Response to client
    res.json({ 
      status: 'success', 
      message: 'Enquiry received successfully! We will review it and get back to you soon.',
      enquiryId: timestamp
    });

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
  console.log(`📧 Email Mode: File-Based Storage (due to SMTP network restrictions)`);
  console.log(`📂 Enquiries saved to: ./enquiries/\n`);
});
