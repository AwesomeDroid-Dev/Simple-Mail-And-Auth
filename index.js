import express from 'express';
import path from 'path';

const app = express();
const PORT = 3003;

// Serve static files from TempFrontend directory
app.use(express.static(path.join(process.cwd(), 'TempFrontend')));

// API route
app.use(express.json()); // add this middleware to parse JSON requests
app.use('/api', (await import('./Server/server.js')).default);

// Routes for HTML files

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/login/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'TempFrontend/signup/signup.html'));
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

