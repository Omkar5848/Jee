import type { NextApiRequest, NextApiResponse } from 'next';
import { getOTP } from './send-otp';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, otp } = req.body || {};
  if (!email || !otp) return res.status(400).json({ error:'Email and OTP required' });
  const code = getOTP(email);
  if (!code || code !== otp) return res.status(400).json({ error:'Invalid or expired OTP' });
  return res.status(200).json({ ok:true });
}
