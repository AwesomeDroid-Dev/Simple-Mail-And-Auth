import express from 'express';
import setupSQL from './DBtools/sqliteSetup.js';
import loginHandler from './api/login.js';
import signupHandler from './api/signup.js';
import greetingHandler from './api/greeting.js';
import logoutHandler from './api/logout.js';

const router = express.Router();

setupSQL();

router.post('/login', loginHandler);

router.post('/signup', signupHandler);

router.post('/logout', logoutHandler);

router.get('/greeting', greetingHandler);

export default router;

