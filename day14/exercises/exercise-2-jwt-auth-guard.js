// Day 14 - Exercise 2: JwtAuthGuard Protection & 401 Rejection
// Author: Penumuru Madhu Sudhan Reddy
const crypto=require('crypto');

const JWT_SECRET='DEV_JWT_SECRET_KEY_123';

function signToken(payload,secret=JWT_SECRET,expiresInSec=3600){
  const h=Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url');
  const now=Math.floor(Date.now()/1000);
  const p=Buffer.from(JSON.stringify({...payload,iat:now,exp:now+expiresInSec})).toString('base64url');
  const sig=crypto.createHmac('sha256',secret).update(`${h}.${p}`).digest('base64url');
  return `${h}.${p}.${sig}`;
}

function verifyToken(token,secret=JWT_SECRET){
  const parts=token.split('.');
  if(parts.length!==3) return {valid:false,error:'Malformed token'};
  const [h,p,sig]=parts;
  const expectedSig=crypto.createHmac('sha256',secret).update(`${h}.${p}`).digest('base64url');
  if(sig!==expectedSig) return {valid:false,error:'Invalid signature'};
  const payload=JSON.parse(Buffer.from(p,'base64url').toString('utf8'));
  const now=Math.floor(Date.now()/1000);
  if(payload.exp&&payload.exp<now) return {valid:false,error:'Token expired'};
  return {valid:true,payload};
}

// Simulated NestJS JwtAuthGuard
class JwtAuthGuard {
  canActivate(req){
    const authHeader=req.headers?.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')){
      throw {statusCode:401,message:'Authentication required. Missing Bearer token.',error:'Unauthorized'};
    }
    const token=authHeader.substring(7);
    const result=verifyToken(token);
    if(!result.valid){
      throw {statusCode:401,message:`Authentication failed: ${result.error}`,error:'Unauthorized'};
    }
    req.user=result.payload;
    return true;
  }
}

function runExercise2(){
  console.log('--- EXERCISE 2: JwtAuthGuard & 401 Unauthorized Protection ---');
  const guard=new JwtAuthGuard();

  // Test Case 1: Unauthenticated request (no header)
  try {
    guard.canActivate({headers:{}});
  } catch(e){
    console.log('1. No Header Request:',e.statusCode,e.error,'-',e.message);
  }

  // Test Case 2: Tampered / Invalid token
  try {
    guard.canActivate({headers:{authorization:'Bearer invalid.token.payload'}});
  } catch(e){
    console.log('2. Tampered Token Request:',e.statusCode,e.error,'-',e.message);
  }

  // Test Case 3: Valid Bearer Token
  const validToken=signToken({sub:'u-1234',email:'site.engineer@example.com',role:'SE'});
  const req={headers:{authorization:`Bearer ${validToken}`}};
  const allowed=guard.canActivate(req);
  console.log('3. Valid Token Request: Allowed =',allowed);
  console.log('   Attached req.user:',req.user);
}

runExercise2();
