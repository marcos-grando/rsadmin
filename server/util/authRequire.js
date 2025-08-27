import jwt from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
    const { sid } = req.cookies || {};
    if (!sid) return res.status(401).json({ error: 'Não autenticado' });
    try {
        const payload = jwt.verify(sid, process.env.JWT_ACCESS_SECRET);
        req.user = { id: payload.sub };
        next();
    } catch {
        res.status(401).json({ error: 'Sessão expirada' });
    }
}
