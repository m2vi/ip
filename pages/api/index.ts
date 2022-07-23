import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientIp } from 'request-ip';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ ip: getClientIp(req) });
}
