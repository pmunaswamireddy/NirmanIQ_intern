// Day 14 - Exercise 3: RolesGuard & Role-Based Access Control (RBAC)
// Author: Penumuru Madhu Sudhan Reddy

const Role={
  SE:'SE',
  PE:'PE',
  PM:'PM',
  PD:'PD',
  CXO:'CXO',
  TA:'TA',
  SA:'SA'
};

// Simulated NestJS RolesGuard with Reflector metadata lookup
class RolesGuard {
  canActivate(req,requiredRoles){
    if(!requiredRoles||requiredRoles.length===0) return true;
    const user=req.user;
    if(!user||!user.role){
      throw {statusCode:403,message:'User context missing or unauthenticated',error:'Forbidden'};
    }
    const hasRole=requiredRoles.includes(user.role);
    if(!hasRole){
      throw {
        statusCode:403,
        message:`Access denied. Role "${user.role}" does not have sufficient permissions.`,
        error:'Forbidden'
      };
    }
    return true;
  }
}

function runExercise3(){
  console.log('--- EXERCISE 3: RolesGuard & RBAC Authorization Checks ---');
  const guard=new RolesGuard();

  // Route 1 rules: POST /projects requires PM, PD, TA, or SA
  const createProjectRoles=[Role.PM,Role.PD,Role.TA,Role.SA];
  // Route 2 rules: DELETE /projects/:id requires SA only
  const deleteProjectRoles=[Role.SA];

  const userSE={sub:'u-1',email:'se@example.com',role:Role.SE};
  const userPM={sub:'u-2',email:'pm@example.com',role:Role.PM};
  const userSA={sub:'u-3',email:'sa@example.com',role:Role.SA};

  // Test 1: SE attempts POST /projects
  try {
    guard.canActivate({user:userSE},createProjectRoles);
    console.log('1. SE creates project: ALLOWED');
  } catch(e){
    console.log('1. SE creates project:',e.statusCode,e.error,'->',e.message);
  }

  // Test 2: PM attempts POST /projects
  try {
    const ok=guard.canActivate({user:userPM},createProjectRoles);
    console.log('2. PM creates project: ALLOWED (Status 201 Created)');
  } catch(e){
    console.log('2. PM creates project:',e.statusCode,e.message);
  }

  // Test 3: PM attempts DELETE /projects/:id
  try {
    guard.canActivate({user:userPM},deleteProjectRoles);
    console.log('3. PM deletes project: ALLOWED');
  } catch(e){
    console.log('3. PM deletes project:',e.statusCode,e.error,'->',e.message);
  }

  // Test 4: SA attempts DELETE /projects/:id
  try {
    const ok=guard.canActivate({user:userSA},deleteProjectRoles);
    console.log('4. SA deletes project: ALLOWED (Status 200 OK)');
  } catch(e){
    console.log('4. SA deletes project:',e.statusCode,e.message);
  }
}

runExercise3();
