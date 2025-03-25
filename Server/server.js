import express from 'express';
import setupSQL from './DBtools/sqliteSetup.js';
import { verifyUser } from './ApiTools/Session.js';
import loginHandler from './api/account/login.js';
import signupHandler from './api/account/signup.js';
import greetingHandler from './api/greeting/greeting.js';
import logoutHandler from './api/account/logout.js';
import mailHandler from './api/mail/mail.js';
import composeMailHandler from './api/mail/compose.js';
import viewMailHandler from './api/mail/view.js';
import accountHandler from './api/account/account.js';
import changePasswordHandler from './api/account/changePassword.js';

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

router.get('/account', (req, res) => verifyUser(req, res, accountHandler));

router.post('/account/changePassword', (req, res) => verifyUser(req, res, changePasswordHandler));

export default router;

