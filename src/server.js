// server
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { PORT, dbConfig } = require('./config');
const { addUserToDb, findUserByEmail } = require('./model/userModel');

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

// first middleware helper
function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', async (req, res) => {
  // gauti vartotojo email ir pass ir irtasiti i users
  const { email, password } = req.body;
  const plainTextPassword = password;
  //   const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  //   console.log('salt===', salt);
  console.log('hashedPassword===', hashedPassword);

  // pass = 123456
  // salt = dsfgdsfg.123456
  // has = dsyherdsfdshgryghdfgh

  const newUser = {
    email,
    password: hashedPassword,
  };

  // kviesti modelio funkcija kuri sukuria vartotoja
  const insertResult = await addUserToDb(newUser.email, newUser.password);
  console.log('insertResult===', insertResult);

  if (insertResult === false) {
    res.status(500).json('something wrong');
    return;
  }

  res.status(201).json('user created');
});

// POST /login - tuscias routas grazina 'bandom prisiloginti'
app.post('/login', async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasSlaptazodis = req.body.password;
  // patikrinti ar yra toks email kaip gautas
  const foundUser = await findUserByEmail(gautasEmail);
  console.log('foundUser===', foundUser);
  // jei nera 400 email or pass not found
  if (!foundUser) {
    res.status(400).json('email or pass not found(email)');
    return;
  }
  // jei yra tikrinama ar sutampa pass
  // bcrypt.compareSync(ivestas slaptazodis,issaugotas hashed slaptazodis)
  if (!bcrypt.compareSync(gautasSlaptazodis, foundUser.password)) {
    res.status(400).json('email or pass not found(pass)');
    return;
  }
  res.json('login success');
});

// GET /users - grazina visus vartotojus json formatu
app.get('/users', async (req, res) => {
  res.json(users);
});

// 404 turetu grazinti json objekta

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('server online on port', PORT));
