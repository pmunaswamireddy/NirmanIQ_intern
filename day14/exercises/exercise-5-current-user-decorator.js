// Day 14 - Exercise 5: @CurrentUser Parameter Decorator
// Author: Penumuru Madhu Sudhan Reddy

// Simulation of NestJS createParamDecorator factory
function createParamDecorator(factory){
  return (data)=>{
    return (req)=>{
      const context={
        switchToHttp:()=>({
          getRequest:()=>req
        })
      };
      return factory(data,context);
    };
  };
}

// Actual CurrentUser decorator definition
const CurrentUser=createParamDecorator((data,ctx)=>{
  const request=ctx.switchToHttp().getRequest();
  const user=request.user;
  return data?user?.[data]:user;
});

// Mock Controller demonstrating decorator usage
class ProjectsController {
  findAll(user){
    return {
      message:'Listing all active construction projects',
      requestedBy:user.email,
      userRole:user.role
    };
  }
  create(createDto,userId){
    return {
      message:'Project created successfully',
      createdById:userId,
      projectName:createDto.name
    };
  }
}

function runExercise5(){
  console.log('--- EXERCISE 5: @CurrentUser() Custom Parameter Decorator ---');
  const controller=new ProjectsController();

  // Mock incoming HTTP Request with authenticated user context
  const mockReq={
    headers:{authorization:'Bearer token.sample.jwt'},
    user:{
      userId:'usr-77a89f',
      email:'pm.alex@example.com',
      role:'PM'
    }
  };

  // 1. Extract full user context: @CurrentUser() user: AuthenticatedUser
  const extractFullUser=CurrentUser();
  const fullUser=extractFullUser(mockReq);
  console.log('1. Extracted Full User Context (@CurrentUser()):');
  console.log(fullUser);

  const listResponse=controller.findAll(fullUser);
  console.log('   Controller GET /projects response:',listResponse);

  // 2. Extract specific field: @CurrentUser('userId') userId: string
  const extractUserId=CurrentUser('userId');
  const userId=extractUserId(mockReq);
  console.log('\n2. Extracted Specific Property (@CurrentUser(\'userId\')):',userId);

  const createResponse=controller.create({name:'Apex Heights'},userId);
  console.log('   Controller POST /projects response:',createResponse);
}

runExercise5();
