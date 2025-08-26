import { useEffect, useState } from 'react';
import Login from './Login.jsx';

export default function Private({ children }) {
    const [authed, setAuthed] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                setAuthed(res.ok);
            } finally {
                setChecking(false);
            }
        })();
    }, []);

    if (checking) return <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>Carregando…</div>;
    if (!authed) return <Login onAuthed={setAuthed} />;
    return children;
}
