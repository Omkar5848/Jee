import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '@/utils/db';
import { comparePassword, setAuthCookie, signToken } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error:'Email and password required' });
  const user = DB.getUserByEmail(email);
  if (!user) return res.status(401).json({ error:'Invalid credentials' });
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error:'Invalid credentials' });
  const token = signToken({ email: user.email, name: user.name, profession: user.profession });
  setAuthCookie(res, token);
  return res.status(200).json({ ok: true });
}
