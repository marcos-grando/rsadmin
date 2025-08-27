import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const cookieOpts = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {})
};

export function issueAccessToken(sub) {
    if (!ACCESS_SECRET) throw new Error('JWT_ACCESS_SECRET ausente');
    return jwt.sign({ sub }, ACCESS_SECRET, { expiresIn: '2h' });
};

export function issueRefreshToken(sub) {
    if (!REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET ausente');
    return jwt.sign({ sub }, REFRESH_SECRET, { expiresIn: '7d' });
};
