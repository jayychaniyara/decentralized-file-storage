import { Router, Request, Response } from 'express';
import User from '../models/User'; 

const router = Router();

router.get('/activeUserCount', async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ error: 'Failed to fetch user count' });
  }
});

export default router;
