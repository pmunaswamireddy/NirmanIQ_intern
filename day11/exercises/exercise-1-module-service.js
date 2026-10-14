// Day 11 - Exercise 1: Modules and Services
// Author: Penumuru Madhu Sudhan Reddy

class ProjectsService {
  constructor() {
    this.projects=[
      {id:'proj-1',name:'Skyline Commercial Park',status:'ACTIVE'},
      {id:'proj-2',name:'Greenfield Residency',status:'PLANNING'}
    ];
  }

  findAll() {
    return this.projects;
  }

  findById(id) {
    const item=this.projects.find(p=>p.id===id);
    return item||null;
  }

  create(name,status='PLANNING') {
    const newProj={id:`proj-${Date.now()}`,name,status};
    this.projects.push(newProj);
    return newProj;
  }
}

class ProjectsController {
  constructor(projectsService) {
    this.projectsService=projectsService;
  }

  getProjects() {
    return this.projectsService.findAll();
  }

  getProjectById(id) {
    const res=this.projectsService.findById(id);
    if (!res) {
      return {error:'Project not found',statusCode:404};
    }
    return res;
  }

  addProject(name,status) {
    if (!name||name.trim().length<3) {
      return {error:'Invalid project name',statusCode:400};
    }
    return this.projectsService.create(name.trim(),status);
  }
}

// test manual DI wiring
const service=new ProjectsService();
const controller=new ProjectsController(service);

console.log('All projects:',controller.getProjects());
console.log('Get proj-1:',controller.getProjectById('proj-1'));
console.log('Get invalid:',controller.getProjectById('proj-404'));
console.log('Create new:',controller.addProject('Apex Towers','ACTIVE'));
