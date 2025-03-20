import express from 'express';
import setupSQL from './DBtools/sqliteSetup.js';
import { verifyUser } from './Session/Session.js';
import loginHandler from './api/login.js';
import signupHandler from './api/signup.js';
import greetingHandler from './api/greeting.js';
import logoutHandler from './api/logout.js';
import mailHandler from './api/mail.js';
import composeMailHandler from './api/compose.js';
import viewMailHandler from './api/view.js';

const router = express.Router();

setupSQL();

router.post('/login', loginHandler);

router.post('/signup', signupHandler);

/*
router.post('/logout', logoutHandler);

router.get('/greeting', greetingHandler);

router.get('/mail', mailHandler);

router.post('/mail/compose', composeMailHandler);
*/

router.post('/logout', (req, res) => verifyUser(req, res, logoutHandler));

router.get('/greeting', (req, res) => verifyUser(req, res, greetingHandler));

router.get('/mail', (req, res) => verifyUser(req, res, mailHandler));

router.post('/mail/compose', (req, res) => verifyUser(req, res, composeMailHandler));

router.get('/mail/view', (req, res) => verifyUser(req, res, viewMailHandler));

export default router;

