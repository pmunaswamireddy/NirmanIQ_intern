// Day 13 - Exercise 4: TypeORM Repository Service CRUD
// Author: Penumuru Madhu Sudhan Reddy

class MockRepository {
  constructor(entityName){
    this.entityName=entityName;
    this.records=[];
  }
  async create(data){
    return {id:data.id||`uuid-${Math.random().toString(36).substring(2,9)}`,createdAt:new Date(),updatedAt:new Date(),isArchived:false,...data};
  }
  async save(record){
    const idx=this.records.findIndex(r=>r.id===record.id);
    if(idx>=0){
      this.records[idx]={...this.records[idx],...record,updatedAt:new Date()};
      return this.records[idx];
    }
    this.records.push(record);
    return record;
  }
  async find(options={}){
    let res=[...this.records];
    if(options.where){
      res=res.filter(r=>{
        return Object.entries(options.where).every(([k,v])=>r[k]===v);
      });
    }
    if(options.select){
      res=res.map(r=>{
        const proj={};
        options.select.forEach(col=>{proj[col]=r[col];});
        return proj;
      });
    }
    return res;
  }
  async findOne(options={}){
    const found=this.records.find(r=>r.id===options.where?.id);
    return found?{...found}:null;
  }
  async delete(id){
    const initial=this.records.length;
    this.records=this.records.filter(r=>r.id!==id);
    return {affected:initial-this.records.length};
  }
}

// Service implementation demonstrating repository methods
class ProjectsService {
  constructor(repo){
    this.repo=repo;
  }
  async create(dto){
    const entity=await this.repo.create(dto);
    return await this.repo.save(entity);
  }
  // Selective projection: never SELECT *
  async findAll(){
    return await this.repo.find({
      select:['id','name','status','createdAt'],
      where:{isArchived:false}
    });
  }
  async findOne(id){
    const item=await this.repo.findOne({where:{id}});
    if(!item) throw new Error(`Project ${id} not found`);
    return item;
  }
  async update(id,dto){
    const project=await this.findOne(id);
    Object.assign(project,dto);
    return await this.repo.save(project);
  }
  async remove(id){
    const res=await this.repo.delete(id);
    if(res.affected===0) throw new Error(`Project ${id} not found`);
    return {message:`Project ${id} deleted successfully`};
  }
}

async function runExercise4(){
  console.log('--- EXERCISE 4: TypeORM Repository CRUD Operations ---');
  const repo=new MockRepository('projects');
  const service=new ProjectsService(repo);

  // 1. Create
  const p1=await service.create({name:'Apex Heights',status:'ACTIVE',description:'Luxury residences'});
  console.log('1. Created Project:',p1.name,p1.id);

  // 2. Find All with selective projection (notice description is omitted from result)
  const list=await service.findAll();
  console.log('2. FindAll (Selective Projection - No SELECT *):',list);

  // 3. Find One
  const single=await service.findOne(p1.id);
  console.log('3. FindOne Details:',single.name,single.status);

  // 4. Update
  const updated=await service.update(p1.id,{status:'COMPLETED'});
  console.log('4. Updated Project:',updated.name,'Status:',updated.status);

  // 5. Delete
  const del=await service.remove(p1.id);
  console.log('5. Delete Status:',del.message);
}

runExercise4();
