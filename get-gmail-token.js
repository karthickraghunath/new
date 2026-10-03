const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Note: You need to download credentials.json from Google Cloud Console first

const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');
const TOKEN_PATH = path.join(__dirname, 'gmail-token.json');

async function getNewToken() {
  // Check if credentials.json exists
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('❌ Error: google-credentials.json not found');
    console.error('\nSteps:');
    console.error('1. Go to: https://console.cloud.google.com/');
    console.error('2. Create a new project');
    console.error('3. Enable Gmail API');
    console.error('4. Create OAuth 2.0 Client ID (Desktop app)');
    console.error('5. Download the JSON credentials');
    console.error('6. Save as: google-credentials.json in this directory');
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const { client_id, client_secret, redirect_uris } = credentials.installed;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  console.log('\n🔐 Gmail API Authentication\n');
  console.log('1. Sign in with: hn.enterpriseexport@gmail.com');
  console.log('2. Grant permissions to send emails');
  console.log('3. Copy the authorization code\n');

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  });

  console.log('📍 Open this link in your browser:');
  console.log(authorizeUrl);
  console.log('\n');

  // Get the authorization code from stdin
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the authorization code: ', async (code) => {
    rl.close();

    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log('\n✅ Authentication successful!\n');
      console.log('🔑 Add these to your .env file:\n');
      console.log(`GMAIL_API_CLIENT_ID=${client_id}`);
      console.log(`GMAIL_API_CLIENT_SECRET=${client_secret}`);
      console.log(`GMAIL_API_REFRESH_TOKEN=${tokens.refresh_token}`);
      console.log(`GMAIL_SEND_FROM=hn.enterpriseexport@gmail.com`);
      console.log(`GMAIL_SEND_TO=hn.enterpriseexport@gmail.com\n`);

      // Save tokens to file
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
      console.log('✅ Tokens saved to gmail-token.json');
      console.log('\nNow restart the server!');
    } catch (err) {
      console.error('❌ Error exchanging code for tokens:', err.message);
      process.exit(1);
    }
  });
}

getNewToken();
