import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.headers.cookie || '';
  const token = cookie.split('; ').find(c => c.startsWith('jeevak_token='))?.split('=')[1];
  if (!token) return res.status(401).json({ error:'Unauthorized' });
  try {
    const secret = process.env.JWT_SECRET || 'devsecret';
    const payload = jwt.verify(token, secret) as any;
    return res.status(200).json({ user: { name: payload.name, email: payload.email, profession: payload.profession } });
  } catch {
    return res.status(401).json({ error:'Unauthorized' });
  }
}
