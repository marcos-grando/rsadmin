import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {
    KEY_CREATE_CONST, KEY_CREATE_RESID,
    KEY_DELETE_CONST, KEY_DELETE_RESID,
    KEY_SELECT_CONST, KEY_SELECT_RESID,
    KEY_UPDATE_CONST, KEY_UPDATE_RESID
} from './shared/theMasterKeys.js';
import requireAuth from './server/auth/authRequire.js';

// auth
import login from './server/auth/login.js';
import logout from './server/auth/logout.js';
import refresh from './server/auth/refresh.js';

// crudizin
import fetchSelectTable from './server/supabase/readList.js';
import listSelectOpts from './server/supabase/readOpts.js';
import readTypeList from './server/supabase/readTypeList.js';

import readItem from './server/supabase/crud/readItem.js';
import createItem from './server/supabase/crud/createItem.js';
import updateItem from './server/supabase/crud/updateItem.js';
import deleteItem from './server/supabase/crud/deleteItem.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'https://rsadmin-phi.vercel.app'],
    credentials: true
}));

// ===-{ configs Multer/apis+files }-===
const upload = multer({ storage: multer.memoryStorage() });
const fields = {
    apis_resid: [
        { name: 'logo', maxCount: 1 },
        { name: 'thumb', maxCount: 1 },
        { name: 'aptoimg', maxCount: 10 },
        { name: 'condimg', maxCount: 10 },
        { name: 'plantimg', maxCount: 10 }
    ],
    apis_const: [{ name: 'logo', maxCount: 1 }]
};
const fields_uploads = {
    [KEY_SELECT_CONST]: fields?.apis_const,
    [KEY_UPDATE_CONST]: fields?.apis_const,
    [KEY_DELETE_CONST]: fields?.apis_const,
    [KEY_CREATE_CONST]: fields?.apis_const,

    [KEY_SELECT_RESID]: fields?.apis_resid,
    [KEY_UPDATE_RESID]: fields?.apis_resid,
    [KEY_DELETE_RESID]: fields?.apis_resid,
    [KEY_CREATE_RESID]: fields?.apis_resid,
};
const pickUpload = (req, res, next) => {
    const key = req.query.key || req.params.key;
    const spec = fields_uploads[key];
    if (!spec) return res.status(400).json({ error: 'Key inválida' });
    return upload.fields(spec)(req, res, next);
};

// ===-{apis Auth - apenas login próprio}-===
app.post('/api/auth/login', login);
app.post('/api/auth/refresh', refresh);
app.post('/api/auth/logout', logout);

// === { listas } ===
app.get('/api/read-list', requireAuth, fetchSelectTable);
app.get('/api/read-opts', requireAuth, listSelectOpts);
app.get('/api/read-type-list/:id', requireAuth, readTypeList);

// === { crud } ===
app.delete('/api/delete-item/:id', requireAuth, deleteItem)
app.patch('/api/update-item/:id', requireAuth, pickUpload, updateItem);
app.post('/api/create-item', requireAuth, pickUpload, createItem);
app.get('/api/read-item/:id', requireAuth, readItem);

// check público (entender melhor isso depois)
app.get('/api/health', (_req, res) => res.json({ ok: true }));

export default app;