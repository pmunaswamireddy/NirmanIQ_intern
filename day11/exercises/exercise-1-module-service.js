// Day 11 - Exercise 1: Understanding NestJS Dependency Injection
// An intern-friendly demonstration of how Controllers and Services communicate

class ProjectsService {
  constructor() {
    this.projects = [
      { id: 'proj-1', name: 'Skyline Commercial Park', status: 'ACTIVE' },
      { id: 'proj-2', name: 'Greenfield Residency', status: 'PLANNING' }
    ];
  }

  findAll() {
    return this.projects;
  }

  findById(id) {
    return this.projects.find(p => p.id === id);
  }
}

class ProjectsController {
  // In NestJS, this is injected automatically via the constructor:
  // constructor(private readonly projectsService: ProjectsService) {}
  constructor(projectsService) {
    this.projectsService = projectsService;
  }

  getProjects() {
    console.log('[Controller] GET /projects called -> Delegating to service...');
    return this.projectsService.findAll();
  }

  getProjectById(id) {
    console.log(`[Controller] GET /projects/${id} called -> Delegating to service...`);
    const project = this.projectsService.findById(id);
    if (!project) {
      return { error: 'Project not found', status: 404 };
    }
    return project;
  }
}

// Running the exercise
console.log('--- EXERCISE 1: MODULE & SERVICE DEPENDENCY INJECTION ---');
const service = new ProjectsService();
const controller = new ProjectsController(service);

console.log('1. Fetch all projects:');
console.log(controller.getProjects());

console.log('\n2. Fetch project by ID (proj-1):');
console.log(controller.getProjectById('proj-1'));

console.log('\n3. Fetch non-existent project (proj-999):');
console.log(controller.getProjectById('proj-999'));
