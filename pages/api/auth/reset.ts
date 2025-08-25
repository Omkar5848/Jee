import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '@/utils/db';
import { hashPassword } from '@/utils/auth';
import { getOTP, clearOTP } from './send-otp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error:'Email and new password required' });
  const code = getOTP(email);
  if (!code) return res.status(400).json({ error:'OTP not verified or expired' });
  const hash = await hashPassword(password);
  const ok = DB.updateUserPassword(email, hash);
  if (!ok) return res.status(404).json({ error:'User not found' });
  clearOTP(email);
  return res.status(200).json({ ok:true });
}
