import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import requireAuth from './server/util/authRequire.js';

// auth apis
import Login from './server/auth/login.js';
import Logout from './server/auth/logout.js';
import Refresh from './server/auth/refresh.js';

// apis
import readList from './server/supabase/readList.js';
import listSelectOpts from './server/supabase/readOpts.js';
import readTypeList from './server/supabase/readTypeList.js';

import createConst from './server/supabase/crud_const/createConst.js';
import readConst from './server/supabase/crud_const/readConst.js';
import updateConst from './server/supabase/crud_const/updateConst.js';
import deteleConst from './server/supabase/crud_const/deteleConst.js';

import createResid from './server/supabase/crud_resid/createResid.js';
import readResid from './server/supabase/crud_resid/readResid.js';
import updateResid from './server/supabase/crud_resid/updateResid.js';
import deleteResid from './server/supabase/crud_resid/deleteResid.js';


const app = express();

// app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/health', (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json({ ok: true, ts: Date.now() });
});

app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

const allowed = process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173', 'https://SEUAPP.vercel.app'];
const corsCfg = {
    origin: (o, cb) => (!o || allowed.includes(o)) ? cb(null, true) : cb(new Error('CORS')),
    credentials: true
};
app.use(cors(corsCfg));
app.options('*', cors(corsCfg));

// app.use(cors({
//     origin: (origin, cb) => (!origin || allowed.includes(origin)) ? cb(null, true) : cb(new Error('CORS blocked')),
//     credentials: true
// }));
app.get('/_diag/auth', (_req, res) => {
    res.json({
        hasHash: !!process.env.ADMIN_PASSWORD_HASH,
        hasAccess: !!process.env.JWT_ACCESS_SECRET,
        hasRefresh: !!process.env.JWT_REFRESH_SECRET
    });
});

// ===-{ configs Multer/apis+files }-===
const upload = multer({ storage: multer.memoryStorage() });

const fields_uploads = {
    apis_resid: [
        { name: 'logo', maxCount: 1 },
        { name: 'thumb', maxCount: 1 },
        { name: 'aptoimg', maxCount: 10 },
        { name: 'condimg', maxCount: 10 },
        { name: 'plantimg', maxCount: 10 }
    ],
    apis_const: [{ name: 'logo', maxCount: 1 }]
};

// ===-{apis Auth - apenas login próprio}-===
app.post('/auth/login', Login);
app.post('/auth/refresh', Refresh);
app.post('/auth/logout', Logout);

// === { listas } ===
app.get('/read-list', requireAuth, readList);
app.get('/read-opts', requireAuth, listSelectOpts);
app.get('/read-type-list/:id', requireAuth, readTypeList);

// === { construtoras } ===
app.delete('/delete-const/:id', requireAuth, deteleConst);
app.patch('/update-const/:id', requireAuth, upload.fields(fields_uploads.apis_const), updateConst);
app.post('/create-const', requireAuth, upload.fields(fields_uploads.apis_const), createConst);
app.get('/read-const/:id', requireAuth, readConst);

// === { residenciais } ===
app.delete('/delete-resid/:id', requireAuth, deleteResid);
app.patch('/update-resid/:id', requireAuth, upload.fields(fields_uploads.apis_resid), updateResid);
app.post('/create-resid', requireAuth, upload.fields(fields_uploads.apis_resid), createResid);
app.get('/read-resid/:id', requireAuth, readResid);

app.use((err, _req, res, _next) => {
    console.error('UNHANDLED', err);
    res.status(500).json({ error: 'internal_error' });
});

export default app;