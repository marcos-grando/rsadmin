import jwt from 'jsonwebtoken';

export const cookieOpts = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
};

export function issueAccessToken(sub) {
    return jwt.sign({ sub, typ: 'access' }, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h' });
};

export function issueRefreshToken(sub) {
    return jwt.sign({ sub, typ: 'refresh' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
