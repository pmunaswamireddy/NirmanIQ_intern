// Day 13 - Exercise 1: Docker PostgreSQL Configuration & Connection Validator
// Author: Penumuru Madhu Sudhan Reddy

function validatePostgresConfig(cfg) {
  const errors=[];
  if (!cfg.user||typeof cfg.user!=='string') errors.push('Missing database user');
  if (!cfg.password||typeof cfg.password!=='string') errors.push('Missing database password');
  if (!cfg.database||typeof cfg.database!=='string') errors.push('Missing database name');
  if (!cfg.port||cfg.port!==5432) errors.push('Port must be standard 5432');
  if (cfg.password==='postgres'||cfg.password==='123456') errors.push('Weak default password detected');

  const connectionString=`postgresql://${cfg.user}:${cfg.password}@${cfg.host||'localhost'}:${cfg.port}/${cfg.database}`;
  return {
    valid:errors.length===0,
    errors,
    connectionString:errors.length===0?connectionString:null
  };
}

const config={
  host:'localhost',
  port:5432,
  user:'nirmaniq_user',
  password:'secretpassword',
  database:'nirmaniq_training'
};

const result=validatePostgresConfig(config);
console.log('PostgreSQL Configuration Check:');
console.log('Status:',result.valid?'VALID':'INVALID');
console.log('Connection URI:',result.connectionString);
