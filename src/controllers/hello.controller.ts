import type { Request, Response } from 'express';
import { helloService } from '../services/hello.service.js';

export function getHello(req: Request, res: Response) {
    const message = helloService();

    res.json({ message });
}
