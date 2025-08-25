import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  res.setHeader('Set-Cookie', serialize('jeevak_token', '', { path:'/', httpOnly:true, maxAge:0 }));
  res.status(200).json({ ok:true });
}
