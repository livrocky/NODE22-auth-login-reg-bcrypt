const express = require('express');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../middleware');
const { addUserToDb, findUserByEmail } = require('../model/userModel');

const userRoutes = express.Router();

userRoutes.post('/register', validateUser, async (req, res) => {
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
userRoutes.post('/login', validateUser, async (req, res) => {
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
  res.json({ success: true });
});

module.exports = userRoutes;
