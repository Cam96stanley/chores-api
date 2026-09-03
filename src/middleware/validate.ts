import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { z } from 'zod';

export default function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res
                .status(400)
                .json({ errors: z.flattenError(result.error).fieldErrors });
        }

        req.body = result.data;
        next();
    };
}
