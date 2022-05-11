## hash passwords

[bcrypt] (https://www.npmjs.com/package/bcryptjs)

1. npm install bcryptjs
2. uzkoduoti slaptazodi, hash pass 'const hashedPassword = bcrypt.hashSync(plainTextPassword, 10)'
3. palyginti slaptazodzius bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)
