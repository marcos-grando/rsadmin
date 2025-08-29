import { cookieOpts, issueAccessToken, issueRefreshToken } from "../../server/util/authAuxiliar.js";
import jwt from 'jsonwebtoken';

export default async function Refresh(req, res) {
    const { rt } = req.cookies || {};
    if (!rt) return res.status(401).json({ error: 'Sem refresh' });

    try {
        const payload = jwt.verify(rt, process.env.JWT_REFRESH_SECRET);
        const at = issueAccessToken(payload.sub);
        const newRt = issueRefreshToken(payload.sub); // rotação simples

        res.cookie('sid', at, { ...cookieOpts, maxAge: 2 * 60 * 60 * 1000 })
            .cookie('rt', newRt, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({ ok: true });
    } catch {
        res.status(401).json({ error: 'Refresh inválido' });
    };
};