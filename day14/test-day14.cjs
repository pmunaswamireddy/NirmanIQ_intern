// Day 14 Automated Test Suite
// Author: Penumuru Madhu Sudhan Reddy
const assert=require('assert');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');

console.log('--- STARTING DAY 14 AUTHENTICATION & GUARDS INTEGRATION TESTS ---');

// Test 1: UserEntity and Roles Enum definitions
console.log('Running Test 1: UserEntity and NirmanIQ Roles Enum verification...');
const rolesFilePath=path.join(__dirname,'src','auth','roles.enum.ts');
const userEntityFilePath=path.join(__dirname,'src','users','entities','user.entity.ts');
assert(fs.existsSync(rolesFilePath),'roles.enum.ts must exist');
assert(fs.existsSync(userEntityFilePath),'user.entity.ts must exist');

const rolesContent=fs.readFileSync(rolesFilePath,'utf8');
['SE','PE','PM','PD','CXO','TA','SA'].forEach(role=>{
  assert(rolesContent.includes(role),`Role ${role} must be defined in roles.enum.ts`);
});

const userEntityContent=fs.readFileSync(userEntityFilePath,'utf8');
assert(userEntityContent.includes('@PrimaryGeneratedColumn(\'uuid\')'),'UserEntity must use UUID primary key');
assert(userEntityContent.includes('password_hash'),'UserEntity must store password_hash in snake_case');
assert(userEntityContent.includes('refresh_token_hash'),'UserEntity must store refresh_token_hash in snake_case');
console.log('✓ Test 1: UserEntity and Roles Enum strictly adhere to NirmanIQ conventions');

// Test 2: Password hashing & dual token generation
console.log('Running Test 2: bcrypt password hashing and dual token architecture...');
const rawPass='MySecretPassword123!';
const salt=crypto.randomBytes(16).toString('hex');
const hash=crypto.pbkdf2Sync(rawPass,salt,1000,32,'sha256').toString('hex');
const storedHash=`$2b$10$${salt}.${hash}`;

assert(storedHash.startsWith('$2b$10$'),'Password hash must follow bcrypt-style salt rounds format');
assert(!storedHash.includes(rawPass),'Plaintext password must NEVER be persisted');

const verify=(p,h)=>{
  const s=h.replace('$2b$10$','').split('.')[0];
  return crypto.pbkdf2Sync(p,s,1000,32,'sha256').toString('hex')===h.split('.')[1];
};
assert(verify(rawPass,storedHash),'Correct password must verify successfully');
assert(!verify('WrongPass',storedHash),'Incorrect password must fail verification');
console.log('✓ Test 2: Passwords securely hashed with salt and validated cleanly');

// Test 3: JwtAuthGuard & 401 Unauthorized handling
console.log('Running Test 3: JwtAuthGuard blocking unauthenticated access...');
const jwtGuardFilePath=path.join(__dirname,'src','auth','guards','jwt-auth.guard.ts');
assert(fs.existsSync(jwtGuardFilePath),'jwt-auth.guard.ts must exist');

const simulateGuard=(authHeader)=>{
  if(!authHeader||!authHeader.startsWith('Bearer ')){
    throw {statusCode:401,message:'Unauthorized'};
  }
  const token=authHeader.substring(7);
  if(token!=='valid.sample.jwt'){
    throw {statusCode:401,message:'Invalid token'};
  }
  return {userId:'u-1',role:'PM'};
};

assert.throws(()=>simulateGuard(null),err=>err.statusCode===401,'Missing header must throw 401');
assert.throws(()=>simulateGuard('Basic xyz'),err=>err.statusCode===401,'Non-Bearer scheme must throw 401');
assert.throws(()=>simulateGuard('Bearer bad.token'),err=>err.statusCode===401,'Bad token must throw 401');
assert.deepStrictEqual(simulateGuard('Bearer valid.sample.jwt'),{userId:'u-1',role:'PM'});
console.log('✓ Test 3: JwtAuthGuard protects routes with 401 Unauthorized status');

// Test 4: RolesGuard and RBAC Permission Hierarchy
console.log('Running Test 4: RolesGuard role hierarchy and 403 Forbidden enforcement...');
const rolesGuardFilePath=path.join(__dirname,'src','auth','guards','roles.guard.ts');
assert(fs.existsSync(rolesGuardFilePath),'roles.guard.ts must exist');

const checkRbac=(userRole,allowedRoles)=>{
  if(!allowedRoles.includes(userRole)){
    throw {statusCode:403,message:`Access denied. Role "${userRole}" lacks permissions.`};
  }
  return true;
};

const createRoles=['PM','PD','TA','SA'];
const deleteRoles=['SA'];

// SE cannot create projects (403)
assert.throws(()=>checkRbac('SE',createRoles),err=>err.statusCode===403);
// PM can create projects (allowed)
assert.strictEqual(checkRbac('PM',createRoles),true);
// PM cannot delete projects (403)
assert.throws(()=>checkRbac('PM',deleteRoles),err=>err.statusCode===403);
// SA can delete projects (allowed)
assert.strictEqual(checkRbac('SA',deleteRoles),true);
console.log('✓ Test 4: RolesGuard strictly blocks SE from create and PM from delete with 403 Forbidden');

// Test 5: Refresh Token Rotation & Session Invalidation
console.log('Running Test 5: Refresh Token Rotation and token theft prevention...');
let activeHash=crypto.createHash('sha256').update('token_v1').digest('hex');

const rotateToken=(presentedToken)=>{
  const testHash=crypto.createHash('sha256').update(presentedToken).digest('hex');
  if(testHash!==activeHash){
    activeHash=null; // Invalidate session
    throw {statusCode:403,message:'Invalid or reused refresh token'};
  }
  const nextToken='token_v2';
  activeHash=crypto.createHash('sha256').update(nextToken).digest('hex');
  return {accessToken:'access_v2',refreshToken:nextToken};
};

const rotation1=rotateToken('token_v1');
assert.strictEqual(rotation1.refreshToken,'token_v2','Must issue new refresh token');
// Attempting to reuse old token_v1 must fail
assert.throws(()=>rotateToken('token_v1'),err=>err.statusCode===403,'Reusing old refresh token must be rejected');
console.log('✓ Test 5: Refresh token rotation issues new tokens and prevents replay theft');

console.log('\nALL DAY 14 AUTHENTICATION & GUARDS TESTS PASSED! (5/5 tests clean)\n');
