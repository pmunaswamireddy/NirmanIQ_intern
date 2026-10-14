// Day 4 - Exercise 1: CRUD DTOs
// Author: Penumuru Madhu Sudhan Reddy

interface ProjectBase {
  name:string;
  city:string;
  client:string;
  budget:number;
}
type CreateProjectDto=Required<ProjectBase>;
type UpdateProjectDto=Partial<CreateProjectDto>;
interface ProjectResponse extends ProjectBase {
  id:string;
  createdAt:Date;
  updatedAt:Date;
}

const projects:ProjectResponse[]=[];
function createProject(dto:CreateProjectDto):ProjectResponse {
  const newProj:ProjectResponse={
    ...dto,
    id:`PRJ-${projects.length+1}`,
    createdAt:new Date(),
    updatedAt:new Date()
  };
  projects.push(newProj);
  return newProj;
}
function updateProject(id:string,patch:UpdateProjectDto):ProjectResponse | undefined {
  const proj=projects.find(p=>p.id===id);
  if (!proj) return undefined;
  Object.assign(proj,patch,{ updatedAt:new Date() });
  return proj;
}

// test
const p1=createProject({
  name:'Godrej Woods',
  city:'Noida',
  client:'Godrej Properties',
  budget:50000000
});
console.log('Created:',p1.id,p1.name);
const updated=updateProject(p1.id,{ budget:55000000 });
console.log('Updated budget:',updated?.budget);
