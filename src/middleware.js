const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');
// first middlewere helper
function showBody(req, res, next) {
  // console.log(req.method);
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

async function validateUser(req, res, next) {
  // validuoti gauta email ir password
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    // abortEarly default true - rodyti tik pirma rasta klaida
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    res.status(400).json(error.details);
  }
}

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];
  console.log('req.headers.authorization ===', req.headers.authorization);
  // nera token
  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'no token',
    });
    return;
  }
  // token yra
  try {
    // token patikrinimas
    // jwt.verify(token, secret)
    // console.log('tokenFromHeaders ===', tokenFromHeaders);
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const userId = tokenPayload.userId;
    // budas perduoti userId i tolimesne funkcija
    req.userId = userId;
    console.log('tokenPayload ===', tokenPayload);
    next();
  } catch (error) {
    console.log('error verifyRezult ===', error);
    // token not valid
    res.status(403).json({
      success: false,
      error: 'invalid token',
    });
  }

  // istraukti token reiksme is headers
  // validuoti token
}

module.exports = {
  showBody,
  validateUser,
  validateToken,
};
