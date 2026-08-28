# Login Tester

Login Tester is a single-page demonstration application for testing **Google Sign-In** with the modern Google Identity Services (GSI) Client SDK. It displays the basic profile claims returned after consent. It does not access Gmail messages or use Gmail API scopes.

## Features Included 🌟
- **Lovely Welcome Intro Page**: Modern design featuring space-grade dark aesthetics, glassmorphism headers, radial glow gradients, and animated highlights.
- **Google Profile Display**: Once authenticated, the app reads the identity token client-side and displays:
  - Google profile avatar (mini & main with animated glowing ring borders).
  - Full Name, Given Name, and Family Name.
   - Verified Google email address.
  - Verification Status Badge (Google verified).
  - Unique Google Subject Account ID (`sub`).
- **Cryptographic JWT Inspector**: A syntax-highlighted panel detailing the raw token payload structure returned directly from Google APIs.
- **Interactive Simulated Demo Mode**: No setup required! Allows you to test and preview the dashboard and personal welcome notes instantly with high-fidelity mock data.
- **On-Page Credentials Config**: Enter, save (backed by browser `localStorage`), or clear custom Google Client IDs dynamically without editing any code.

---

## Quick Start 🚀

Follow these steps to run the application locally:

### 1. Launch the Web Server
Since Google Sign-In security blocks raw filesystem URLs (`file:///`), you must run this from a local web host. We've written a pure Node.js server with **zero external dependencies**:

```bash
# Navigate to the project directory
cd C:\Users\kunal\NNN\CPP\gmail-auth-login

# Run the server
node server.js
```

### 2. Access the Portal
Open your web browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

- Click **"Simulate Login (Demo Mode)"** to preview the gorgeous welcome card and extracted details instantly!

---

## Getting a Google Client ID

To enable real Gmail accounts to sign in:

1. **Go to the Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. **Create a Free Project**: Click the project dropdown (top-left) -> "New Project" and give it a name.
3. **Configure Credentials**:
   - Go to **APIs & Services** -> **Credentials**.
   - Click **+ CREATE CREDENTIALS** -> select **OAuth client ID**.
4. **Setup Consent Screen** (If prompted first):
   - Choose **External** -> click Create.
   - Enter the exact app name **Login Tester** and your Support Email.
   - Save and continue to the end (you can skip scopes and test users for localhost).
5. **Create the Client ID**:
   - Set Application Type to **Web application**.
   - Under **Authorized JavaScript origins**, click **+ ADD URI** and enter:
     `http://localhost:3000`
   - Click **Create**.
6. **Activate in App**:
   - Copy the generated Client ID (looks like `xxxxxx-xxxxxx.apps.googleusercontent.com`).
   - Open **[http://localhost:3000](http://localhost:3000)**.
   - Click **Google Client ID Config**, paste the Client ID, and click **Save**!
   - Now, you can sign in with a Google account.

## Publish the Website for Everyone 🌍

The Client ID is public by design, but each visitor must receive the same configured ID. Before deploying, open `index.html` and set `PUBLIC_CLIENT_ID` near the bottom of the file:

```js
const PUBLIC_CLIENT_ID = "your-client-id.apps.googleusercontent.com";
```

Deploy this folder to a static host such as GitHub Pages, Netlify, or Vercel. A free static host is enough because the login runs in the browser. After deployment:

1. Copy the final HTTPS website address, for example `https://loginifymail.netlify.app`.
2. In Google Cloud Console, add that exact address under **Authorized JavaScript origins**.
3. Keep `http://localhost:3000` there too if you still want local testing.
4. Under **OAuth consent screen**, choose **External** and publish the app. In testing mode, only accounts listed under **Test users** can sign in.
5. Use HTTPS for the public site. Do not use a `file:///` URL.

Once the consent screen is published, any Google account can use the basic profile login. The public homepage explains that Login Tester is an independent demonstration, what it does, and what it does not do. The app only reads identity fields Google returns, such as name, email, profile picture, and account ID; it does not request Gmail mailbox access.
