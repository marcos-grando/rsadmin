import { cookieOpts } from "../../helpers/util/authAuxiliar.js";

export default async function Logout(req, res) {
    res.clearCookie('sid', { ...cookieOpts })
        .clearCookie('rt', { ...cookieOpts })
        .json({ ok: true });
};