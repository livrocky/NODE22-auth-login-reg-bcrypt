## hash passwords

[bcrypt] (https://www.npmjs.com/package/bcryptjs)

1. npm install bcryptjs
2. uzkoduoti slaptazodi, hash pass 'const hashedPassword = bcrypt.hashSync(plainTextPassword, 10)'
3. palyginti slaptazodzius bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)

### mysql

1. instaliuoti mysql2
2. sukurti .env prisijungimui prie db (config.js)
3. /register route irasyti naujo vartotojo duomenis i db lenteles users
