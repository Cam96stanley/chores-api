import type { NextFunction, Request, Response } from 'express';

interface AppError extends Error {
    statusCode?: number;
}

export default function handleError(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    const status = err.statusCode ?? 500;
    res.status(status).json({
        error: err.message || 'Internal Server Error',
    });
}
