import type {ActivityLog,ActivityLogParams,ActivityStatus,PaginatedResult} from '../types/activity-log.types.ts';

const USERS=['Alex Dev','Sam Inspector','Priya SE','John PM','Carlos Lead','Sara Quality'];
const ACTIONS=[
  'Slab reinforcement inspection',
  'Electrical conduit layout audit',
  'Plumbing pressure test',
  'Fire sprinkler pipe inspection',
  'HVAC ductwork verification',
  'Drywall moisture check',
  'Concrete core test verification',
  'Waterproofing membrane audit',
  'Elevator shaft alignment review',
  'Structural column rebar check'
];
const TOWERS=['Tower A','Tower B','Tower C','Tower D'];
const STATUSES:ActivityStatus[]=['APPROVED','PENDING','IN_REVIEW','REJECTED'];

// Generate 520 realistic mock records
const generateMockLogs=():ActivityLog[]=>{
  const list:ActivityLog[]=[];
  const baseDate=new Date('2026-10-01T08:00:00Z').getTime();
  for(let i=1;i<=520;i++){
    const user=USERS[i%USERS.length];
    const action=ACTIONS[i%ACTIONS.length];
    const tower=TOWERS[i%TOWERS.length];
    const floor=(i%20)+1;
    const status=STATUSES[(i*7)%STATUSES.length];
    const itemDate=new Date(baseDate+i*43200000).toISOString().split('T')[0];
    list.push({id:`act-${i}`,date:itemDate,user,action,tower,floor,status});
  }
  return list;
};

let MOCK_DATA:ActivityLog[]=generateMockLogs();

export const fetchActivityLogs=async(params:ActivityLogParams):Promise<PaginatedResult<ActivityLog>>=>{
  // Simulating realistic network latency for React Query
  await new Promise((r)=>setTimeout(r,120));

  let filtered=[...MOCK_DATA];

  if(params.status&&params.status!=='ALL'){
    filtered=filtered.filter((item)=>item.status===params.status);
  }

  if(params.user&&params.user!=='ALL'){
    filtered=filtered.filter((item)=>item.user===params.user);
  }

  if(params.search&&params.search.trim()!==''){
    const q=params.search.toLowerCase().trim();
    filtered=filtered.filter((item)=>
      item.action.toLowerCase().includes(q)||
      item.user.toLowerCase().includes(q)||
      item.tower.toLowerCase().includes(q)||
      `floor ${item.floor}`.toLowerCase().includes(q)
    );
  }

  if(params.startDate){
    filtered=filtered.filter((item)=>item.date>=params.startDate!);
  }
  if(params.endDate){
    filtered=filtered.filter((item)=>item.date<=params.endDate!);
  }

  // Sorting
  const {sort,order}=params;
  filtered.sort((a,b)=>{
    let vA:any=a[sort];
    let vB:any=b[sort];
    if(typeof vA==='string') vA=vA.toLowerCase();
    if(typeof vB==='string') vB=vB.toLowerCase();
    if(vA<vB) return order==='asc'?-1:1;
    if(vA>vB) return order==='asc'?1:-1;
    return 0;
  });

  const total=filtered.length;
  const page=Math.max(1,params.page);
  const pageSize=Math.max(1,params.pageSize);
  const totalPages=Math.ceil(total/pageSize)||1;
  const start=(page-1)*pageSize;
  const data=filtered.slice(start,start+pageSize);

  return {data,total,page,pageSize,totalPages};
};

export const updateBatchStatus=async(ids:string[],newStatus:ActivityStatus):Promise<{updatedCount:number}>=>{
  await new Promise((r)=>setTimeout(r,100));
  let count=0;
  MOCK_DATA=MOCK_DATA.map((item)=>{
    if(ids.includes(item.id)){
      count++;
      return {...item,status:newStatus};
    }
    return item;
  });
  return {updatedCount:count};
};

export const getMockUsers=()=>USERS;
export const getMockStatuses=()=>STATUSES;
export const getRawMockCount=()=>MOCK_DATA.length;
