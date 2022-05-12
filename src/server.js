// server
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Joi = require('joi');
const { PORT } = require('./config');
const { showBody } = require('./middleware');
const userRoutes = require('./routes/userRoutes');

const app = express();

// users db
const users = [
  { email: 'james@bond.com', password: '123456' },
  { email: 'jane@bdoe.com', password: '123456' },
];

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(showBody);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/', userRoutes);

// GET /users - grazina visus vartotojus json formatu
app.get('/users', async (req, res) => {
  res.json(users);
});

// 404 turetu grazinti json objekta

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('server online on port', PORT));
