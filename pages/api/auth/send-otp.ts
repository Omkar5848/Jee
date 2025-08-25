import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '@/utils/db';
import { sendOTP } from '@/utils/mailer';

const store: Record<string, { otp: string, exp: number }> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error:'Email required' });
  const user = DB.getUserByEmail(email);
  if (!user) return res.status(404).json({ error:'No account with that email' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const exp = Date.now() + 5 * 60 * 1000;
  store[email.toLowerCase()] = { otp, exp };

  try {
    await sendOTP(email, otp);
    return res.status(200).json({ ok:true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error:'Failed to send OTP' });
  }
}

export function getOTP(email: string) {
  const rec = store[email.toLowerCase()];
  if (!rec) return null;
  if (Date.now() > rec.exp) { delete store[email.toLowerCase()]; return null; }
  return rec.otp;
}
export function clearOTP(email: string) { delete store[email.toLowerCase()]; }
