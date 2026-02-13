import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '@/utils/db';
import { clearOTP, getOTP } from './send-otp';
import { setAuthCookie, signToken } from '@/utils/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, otp } = req.body || {};
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

  const user = DB.getUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid login request' });

  const code = getOTP(email);
  if (!code || code !== otp) return res.status(400).json({ error: 'Invalid or expired OTP' });

  clearOTP(email);
  const token = signToken({ email: user.email, name: user.name, profession: user.profession });
  setAuthCookie(res, token);
  return res.status(200).json({ ok: true });
}
