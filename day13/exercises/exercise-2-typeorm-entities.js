// Day 13 - Exercise 2: TypeORM Entity & Snake Case Column Mapping
// Author: Penumuru Madhu Sudhan Reddy

const crypto=require('crypto');

function toSnakeCase(str) {
  return str.replace(/[A-Z]/g,letter=>`_${letter.toLowerCase()}`);
}

class MockEntityDefinition {
  constructor(tableName,columns,relations) {
    this.tableName=tableName;
    this.columns=columns;
    this.relations=relations;
  }

  generateInsert(data) {
    const id=data.id||crypto.randomUUID();
    const dbRecord={id};

    for (const key of Object.keys(data)) {
      if (key==='id') continue;
      const colDef=this.columns[key];
      if (colDef) {
        const colName=colDef.name||toSnakeCase(key);
        dbRecord[colName]=data[key];
      }
    }
    return dbRecord;
  }
}

const projectEntity=new MockEntityDefinition('projects',{
  name:{type:'varchar',length:100},
  description:{type:'text',nullable:true},
  status:{type:'enum',default:'PLANNING'},
  isArchived:{type:'boolean',name:'is_archived',default:false},
  createdAt:{type:'timestamptz',name:'created_at'},
  updatedAt:{type:'timestamptz',name:'updated_at'}
},{
  towers:{type:'OneToMany',target:'towers'}
});

const sampleProject={
  name:'Apex Business Bay',
  description:'Commercial 3-tower campus',
  status:'ACTIVE',
  isArchived:false,
  createdAt:new Date().toISOString(),
  updatedAt:new Date().toISOString()
};

const mapped=projectEntity.generateInsert(sampleProject);
console.log('TypeScript Model -> PostgreSQL snake_case Mapping:');
console.log(JSON.stringify(mapped,null,2));
