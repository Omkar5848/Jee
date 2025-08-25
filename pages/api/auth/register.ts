import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '@/utils/db';
import { hashPassword } from '@/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, password, profession } = req.body || {};
  if (!name || !email || !password || !profession) return res.status(400).json({ error:'All fields required' });
  if (DB.getUserByEmail(email)) return res.status(409).json({ error:'Email already registered' });
  const passwordHash = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    name, email, passwordHash,
    profession
  } as const;
  DB.addUser(user as any);
  return res.status(201).json({ ok: true });
}
