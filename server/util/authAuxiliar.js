import jwt from 'jsonwebtoken';

export const cookieOpts = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {})
};

export function issueAccessToken(sub) {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error('JWT_ACCESS_SECRET ausente');
    return jwt.sign({ sub }, secret, { expiresIn: '2h' });
}

export function issueRefreshToken(sub) {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error('JWT_REFRESH_SECRET ausente');
    return jwt.sign({ sub }, secret, { expiresIn: '7d' });
}