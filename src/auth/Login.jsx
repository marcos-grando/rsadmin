import React, { useState } from 'react';
import style from './Login.module.scss';
import { api } from './authLogin';

export default function Login({ onAuthed }) {

    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    async function submit(e) {
        e.preventDefault();

        setLoading(true);
        setErr('');

        const res = await api.post('/api/auth/login', { password });

        setLoading(false);
        if (res.ok) onAuthed(true);
        else setErr('Senha inválida');
    };

    return (
        <main className={style.main}>
            <div className={style.login}>
                <div className={style.loginImg}>
                    <img src="https://res.cloudinary.com/marcos-grando/image/upload/v1756171652/login_uhwsjp.jpg" alt="Fotografia de um prédio" />
                </div>
                <form onSubmit={submit} className={style.loginForm}>
                    <h1>Acesso Administrativo</h1>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        <h3>{loading ? 'Entrando…' : 'Entrar'}</h3>
                    </button>
                    {err && <div className={style.erro}>{err}</div>}
                </form>
            </div>
        </main>
    );
}
