import type { NextFunction, Request, Response } from 'express';

type AsyncRouteHandler<
    P = Record<string, string>,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = Record<string, string>,
> = (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
) => Promise<unknown>;

export default function handleAsync<
    P = Record<string, string>,
    ResBody = unknown,
    reqBody = unknown,
    ReqQuery = Record<string, string>,
>(fn: AsyncRouteHandler<P, ResBody, reqBody, ReqQuery>) {
    return (
        req: Request<P, ResBody, reqBody, ReqQuery>,
        res: Response<ResBody>,
        next: NextFunction,
    ) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
