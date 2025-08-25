# Jeevak - Next.js (TS) Fullstack Auth + OTP

 Install deps:
   ```bash
   npm install
   npm run dev
   ```
 Open http://localhost:3000

## Features
- Apple ID–style login/register/forgot forms
- Email OTP for password reset (Gmail via Nodemailer)
- JSON file storage (no DB setup)
- JWT auth stored in httpOnly cookie
- Dashboard with logout
- Home page with 3D heading & auto-rotating hospital images + arrows

## Notes
- OTP expires in 5 minutes.
- This demo stores users in `data/db.json`. For production, move to a database.
- Make sure Gmail is configured for App Passwords.
