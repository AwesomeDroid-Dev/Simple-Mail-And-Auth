import express from 'express';
import path from 'path';

const app = express();
const PORT = 3003;

app.use(express.json());
app.use('/api', await import('./Server/server.js').then(m => m.default));

/*
app.use(express.static(path.join(process.cwd(), 'Frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'Frontend/index.html'));
});
*/

app.use(express.static(path.join(process.cwd(), 'TempFrontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/login/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/signup/index.html'));
});

app.get('/mail', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/mail/index.html'));
});

app.get('/mail/view', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/mail/view/index.html'));
});

app.get('/mail/compose', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/mail/compose/index.html'));
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/account/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

