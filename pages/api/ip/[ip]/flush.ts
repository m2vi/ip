import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientIp } from 'request-ip';
import cache from 'memory-cache';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const addr = req.query.ip?.toString() || getClientIp(req);

    res.status(200).json(cache.del(addr));
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
