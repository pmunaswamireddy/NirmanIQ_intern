// Day 14 - Exercise 4: Refresh Token Rotation & Session Invalidation
// Author: Penumuru Madhu Sudhan Reddy
const crypto=require('crypto');

function hashToken(token){
  return crypto.createHash('sha256').update(token).digest('hex');
}

function generatePair(userId,email,role){
  const now=Date.now();
  const accessToken=`at_${userId}_${Math.random().toString(36).substring(2,10)}_${now}`;
  const refreshToken=`rt_${userId}_${Math.random().toString(36).substring(2,10)}_${now}`;
  return {accessToken,refreshToken};
}

class SessionService {
  constructor(){
    this.users=new Map();
  }
  registerUser(id,email,role){
    this.users.set(id,{id,email,role,refreshTokenHash:null});
  }
  login(id){
    const user=this.users.get(id);
    if(!user) throw new Error('User not found');
    const tokens=generatePair(user.id,user.email,user.role);
    user.refreshTokenHash=hashToken(tokens.refreshToken);
    return tokens;
  }
  // Refresh Token Rotation
  refreshTokenRotation(id,incomingRefreshToken){
    const user=this.users.get(id);
    if(!user||!user.refreshTokenHash){
      throw {statusCode:403,message:'Access denied. No active refresh session.',error:'Forbidden'};
    }
    const incomingHash=hashToken(incomingRefreshToken);
    if(user.refreshTokenHash!==incomingHash){
      // Potential token theft: Invalidate active token immediately
      user.refreshTokenHash=null;
      throw {statusCode:403,message:'Invalid refresh token. Token theft detected or token already used.',error:'Forbidden'};
    }
    // Issue brand new token pair & invalidate old refresh token
    const newTokens=generatePair(user.id,user.email,user.role);
    user.refreshTokenHash=hashToken(newTokens.refreshToken);
    return newTokens;
  }
}

function runExercise4(){
  console.log('--- EXERCISE 4: Refresh Token Rotation & Invalidation ---');
  const service=new SessionService();
  service.registerUser('u-99','director@example.com','PD');

  // 1. Initial Login
  const session1=service.login('u-99');
  console.log('1. Initial Login:');
  console.log('   Access Token 1:',session1.accessToken);
  console.log('   Refresh Token 1:',session1.refreshToken);

  // 2. Successful Token Rotation (Session 1 -> Session 2)
  const session2=service.refreshTokenRotation('u-99',session1.refreshToken);
  console.log('\n2. Successful Refresh Token Rotation (Session 1 -> Session 2):');
  console.log('   New Access Token 2:',session2.accessToken);
  console.log('   New Refresh Token 2:',session2.refreshToken);

  // 3. Normal second rotation using valid Session 2 -> Session 3
  const session3=service.refreshTokenRotation('u-99',session2.refreshToken);
  console.log('\n3. Legitimate Second Rotation (Session 2 -> Session 3):');
  console.log('   New Access Token 3:',session3.accessToken);
  console.log('   New Refresh Token 3:',session3.refreshToken);

  // 4. Token Theft Simulation: Attacker tries to replay expired Session 1
  console.log('\n4. Token Theft Attack (Replaying Expired Session 1):');
  try {
    service.refreshTokenRotation('u-99',session1.refreshToken);
    console.log('   Reused Token: ALLOWED (Bug)');
  } catch(e){
    console.log('   Reused Token Result:',e.statusCode,e.error,'->',e.message);
    console.log('   Security Action: Active session revoked to protect user account.');
  }
}

runExercise4();
