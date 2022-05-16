## hash passwords

[bcrypt] (https://www.npmjs.com/package/bcryptjs)

1. npm install bcryptjs
2. uzkoduoti slaptazodi, hash pass 'const hashedPassword = bcrypt.hashSync(plainTextPassword, 10)'
3. palyginti slaptazodzius bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)

### mysql

1. instaliuoti mysql2
2. sukurti .env prisijungimui prie db (config.js)
3. /register route irasyti naujo vartotojo duomenis i db lenteles users

### jwt

[jwt npm] (https://www.npmjs.com/package/jsonwebtoken)

1. npm install jsonwebtoken
2. const jwt = require('jsonwebtoken');
3. const token = jwt.sign({ userId: 1254 }, jwtSecret, {expiresIn: 1hr})
4. const payload = jwt.verify(token, jwtSecret)

### random secret

node ->
`require('crypto').random
