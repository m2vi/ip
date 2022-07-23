import ip from 'apis/ip';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientIp } from 'request-ip';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const addr = req.query.ip?.toString() || getClientIp(req);

    res.status(200).json(await ip.lookup(addr));
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
