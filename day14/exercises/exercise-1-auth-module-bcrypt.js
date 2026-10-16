// Day 14 - Exercise 1: Auth Module with bcrypt & JWT Issuance
// Author: Penumuru Madhu Sudhan Reddy
const crypto=require('crypto');

// Simulated bcrypt hashing using SHA-256 + salt rounds
function hashPassword(password,salt=crypto.randomBytes(16).toString('hex')){
  const hash=crypto.pbkdf2Sync(password,salt,1000,32,'sha256').toString('hex');
  return {salt,hash:`$2b$10$${salt}.${hash}`};
}
function comparePassword(password,combinedHash){
  const parts=combinedHash.replace('$2b$10$','').split('.');
  if(parts.length!==2) return false;
  const [salt,expectedHash]=parts;
  const testHash=crypto.pbkdf2Sync(password,salt,1000,32,'sha256').toString('hex');
  return testHash===expectedHash;
}

// Simulated JWT signing (HMAC-SHA256 base64url)
function signJwt(payload,secret,expiresIn){
  const header=Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url');
  const now=Math.floor(Date.now()/1000);
  const exp=now+(expiresIn==='1h'?3600:2592000);
  const body=Buffer.from(JSON.stringify({...payload,iat:now,exp})).toString('base64url');
  const signature=crypto.createHmac('sha256',secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

async function runExercise1(){
  console.log('--- EXERCISE 1: Auth Module, bcrypt Hashing & JWT Issuance ---');
  const userDatabase=[];

  // 1. User Registration
  const rawPassword='StrongPassword123!';
  const {hash:passwordHash}=hashPassword(rawPassword);
  const newUser={
    id:'u-'+crypto.randomUUID().substring(0,8),
    email:'pm.lead@example.com',
    passwordHash,
    role:'PM',
    createdAt:new Date()
  };
  userDatabase.push(newUser);
  console.log('1. User Registered:');
  console.log('   Email:',newUser.email);
  console.log('   Role:',newUser.role);
  console.log('   Salted Hash:',newUser.passwordHash.substring(0,28)+'...');

  // 2. Login Verification
  const validMatch=comparePassword('StrongPassword123!',newUser.passwordHash);
  const invalidMatch=comparePassword('WrongPassword!',newUser.passwordHash);
  console.log('2. Password Verification:');
  console.log('   Correct password check:',validMatch?'VALID (Match)':'INVALID');
  console.log('   Wrong password check:',invalidMatch?'VALID':'REJECTED (Invalid)');

  // 3. Token Generation
  const secret='DEV_JWT_SECRET_KEY_123';
  const refreshSecret='DEV_REFRESH_SECRET_KEY_456';
  const accessToken=signJwt({sub:newUser.id,email:newUser.email,role:newUser.role},secret,'1h');
  const refreshToken=signJwt({sub:newUser.id,email:newUser.email,role:newUser.role},refreshSecret,'30d');

  console.log('3. Generated Tokens:');
  console.log('   Access Token (1h):',accessToken.substring(0,40)+'...');
  console.log('   Refresh Token (30d):',refreshToken.substring(0,40)+'...');
}

runExercise1();
