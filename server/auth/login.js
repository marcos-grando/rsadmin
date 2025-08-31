import { cookieOpts, issueAccessToken, issueRefreshToken } from "../../helpers/util/authAuxiliar.js";
import bcrypt from 'bcryptjs';

export default async function login(req, res) {
    const { password } = req.body || {};
    if (typeof password !== 'string') return res.status(400).json({ error: 'Senha obrigatória' });

    if (!process.env.ADMIN_PASSWORD_HASH) return res.status(500).json({ error: 'ADMIN_PASSWORD_HASH ausente' });
    if (!process.env.JWT_ACCESS_SECRET) return res.status(500).json({ error: 'JWT_ACCESS_SECRET ausente' });
    if (!process.env.JWT_REFRESH_SECRET) return res.status(500).json({ error: 'JWT_REFRESH_SECRET ausente' });

    const ok = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || '');
    if (!ok) {
        await new Promise(r => setTimeout(r, 300));
        return res.status(401).json({ error: 'Credenciais inválidas' });
    };

    const sub = 'admin';
    const at = issueAccessToken(sub);
    const rt = issueRefreshToken(sub);

    res.set('Cache-Control', 'no-store, max-age=0');
    res.set('Pragma', 'no-cache');

    res.cookie('sid', at, { ...cookieOpts, maxAge: 2 * 60 * 60 * 1000 })
        .cookie('rt', rt, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
        .json({ ok: true });
};