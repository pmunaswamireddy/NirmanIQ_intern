// Day 12 - Exercise 2: Mass Assignment Filtering
// Author: Penumuru Madhu Sudhan Reddy

const ALLOWED_KEYS=['name','description','status','towerCount'];

function sanitizePayload(body,options={whitelist:true,forbidNonWhitelisted:true}) {
  const incomingKeys=Object.keys(body);
  const forbidden=incomingKeys.filter(k=>!ALLOWED_KEYS.includes(k));

  if (options.forbidNonWhitelisted&&forbidden.length>0) {
    return {
      statusCode:400,
      error:'Bad Request',
      message:forbidden.map(k=>`property ${k} should not exist`)
    };
  }

  if (options.whitelist) {
    const clean={};
    for (const key of ALLOWED_KEYS) {
      if (body[key]!==undefined) clean[key]=body[key];
    }
    return {statusCode:200,data:clean};
  }

  return {statusCode:200,data:body};
}

// test payload injection
const attackPayload={
  name:'Apex City',
  status:'PLANNING',
  towerCount:3,
  role:'ADMIN',
  isAdmin:true
};
console.log('Injection test:',sanitizePayload(attackPayload));

const normalPayload={name:'Apex City',status:'PLANNING',towerCount:3};
console.log('Safe test:',sanitizePayload(normalPayload));
