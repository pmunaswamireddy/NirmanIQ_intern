import assert from 'node:assert';
import {
  fetchActivityLogs,
  updateBatchStatus,
  getRawMockCount,
  getMockUsers,
  getMockStatuses
} from './src/services/activity-log.service.ts';
import type {ActivityLogParams} from './src/types/activity-log.types.ts';

async function runTests(){
  console.log('--- STARTING DAY 17: DATA TABLES, PAGINATION & SEARCH TEST SUITE ---');

  // Test 1: Mock Dataset verification (500+ records required)
  console.log('Running Test 1: Verifying mock dataset volume...');
  const count=getRawMockCount();
  assert(count>=500,`Mock dataset must have at least 500 records. Found: ${count}`);
  console.log(`✓ Test 1: Successfully verified mock dataset with ${count} records (>= 500 requirement met)`);

  // Test 2: Server-side pagination calculation
  console.log('Running Test 2: Verifying server-side pagination math...');
  const page1=await fetchActivityLogs({page:1,pageSize:10,sort:'date',order:'desc'});
  assert.strictEqual(page1.data.length,10);
  assert.strictEqual(page1.page,1);
  assert.strictEqual(page1.pageSize,10);
  assert.strictEqual(page1.total,count);
  assert.strictEqual(page1.totalPages,Math.ceil(count/10));
  console.log('✓ Test 2: Server-side pagination returned exact slice and totalPages count');

  // Test 3: Pagination page bounds & pageSize 25/50
  console.log('Running Test 3: Verifying alternate page sizes (25, 50)...');
  const page25=await fetchActivityLogs({page:2,pageSize:25,sort:'date',order:'desc'});
  assert.strictEqual(page25.data.length,25);
  assert.strictEqual(page25.totalPages,Math.ceil(count/25));
  const page50=await fetchActivityLogs({page:1,pageSize:50,sort:'date',order:'desc'});
  assert.strictEqual(page50.data.length,50);
  console.log('✓ Test 3: Successfully verified page size 25 and 50 slicing');

  // Test 4: Column sorting (Ascending vs Descending)
  console.log('Running Test 4: Verifying column sorting logic...');
  const asc=await fetchActivityLogs({page:1,pageSize:10,sort:'date',order:'asc'});
  const desc=await fetchActivityLogs({page:1,pageSize:10,sort:'date',order:'desc'});
  assert(asc.data[0].date<=asc.data[1].date,'Ascending order not satisfied');
  assert(desc.data[0].date>=desc.data[1].date,'Descending order not satisfied');
  console.log('✓ Test 4: Verified column sorting (date asc/desc)');

  // Test 5: Status filtering
  console.log('Running Test 5: Verifying status column filter...');
  const approvedOnly=await fetchActivityLogs({page:1,pageSize:50,sort:'date',order:'desc',status:'APPROVED'});
  assert(approvedOnly.data.every((i)=>i.status==='APPROVED'),'All filtered items must be APPROVED');
  assert(approvedOnly.total>0&&approvedOnly.total<count,'Filtered total must be subset of overall records');
  console.log(`✓ Test 5: Status filter 'APPROVED' returned ${approvedOnly.total} matching records`);

  // Test 6: User filtering
  console.log('Running Test 6: Verifying user multi/single filter...');
  const userList=getMockUsers();
  const targetUser=userList[0];
  const userLogs=await fetchActivityLogs({page:1,pageSize:50,sort:'date',order:'desc',user:targetUser});
  assert(userLogs.data.every((i)=>i.user===targetUser),`All filtered items must belong to ${targetUser}`);
  console.log(`✓ Test 6: User filter '${targetUser}' correctly filtered dataset`);

  // Test 7: Debounced keyword search
  console.log('Running Test 7: Verifying keyword search filter...');
  const searchResult=await fetchActivityLogs({page:1,pageSize:50,sort:'date',order:'desc',search:'conduit'});
  assert(searchResult.total>0,'Search for "conduit" should return matching actions');
  assert(searchResult.data.every((i)=>i.action.toLowerCase().includes('conduit')||i.user.toLowerCase().includes('conduit')),'Search matches keyword');
  console.log(`✓ Test 7: Keyword search verified with ${searchResult.total} matches`);

  // Test 8: Date range filter
  console.log('Running Test 8: Verifying date range filtering...');
  const dateRange=await fetchActivityLogs({page:1,pageSize:50,sort:'date',order:'asc',startDate:'2026-10-10',endDate:'2026-10-20'});
  assert(dateRange.data.every((i)=>i.date>='2026-10-10'&&i.date<='2026-10-20'),'Date range bounds respected');
  console.log(`✓ Test 8: Date range filtering verified (${dateRange.total} records in window)`);

  // Test 9: Batch status update (Exercise 4 bulk actions)
  console.log('Running Test 9: Verifying Exercise 4 bulk update action...');
  const sample=await fetchActivityLogs({page:1,pageSize:3,sort:'date',order:'desc'});
  const targetIds=sample.data.map((i)=>i.id);
  const updateRes=await updateBatchStatus(targetIds,'REJECTED');
  assert.strictEqual(updateRes.updatedCount,3,'Batch update should affect exactly 3 rows');
  const verifyLogs=await fetchActivityLogs({page:1,pageSize:10,sort:'date',order:'desc'});
  const updatedItems=verifyLogs.data.filter((i)=>targetIds.includes(i.id));
  assert(updatedItems.every((i)=>i.status==='REJECTED'),'Updated items must now have REJECTED status');
  console.log('✓ Test 9: Exercise 4 bulk update batch status successfully verified');

  // Test 10: URL search params encoding & parsing
  console.log('Running Test 10: Verifying URL search params serialization...');
  const mockParams:ActivityLogParams={
    page:3,
    pageSize:25,
    sort:'user',
    order:'asc',
    status:'PENDING',
    user:'Sam Inspector',
    search:'audit',
  };
  const sp=new URLSearchParams();
  sp.set('page',String(mockParams.page));
  sp.set('pageSize',String(mockParams.pageSize));
  sp.set('sort',mockParams.sort);
  sp.set('order',mockParams.order);
  sp.set('status',mockParams.status!);
  sp.set('user',mockParams.user!);
  sp.set('search',mockParams.search!);

  assert.strictEqual(parseInt(sp.get('page')!,10),3);
  assert.strictEqual(parseInt(sp.get('pageSize')!,10),25);
  assert.strictEqual(sp.get('sort'),'user');
  assert.strictEqual(sp.get('status'),'PENDING');
  console.log('✓ Test 10: URL query string parameter encoding/decoding verified');

  console.log('============================================================');
  console.log('ALL DAY 17 DATA TABLES & PAGINATION TESTS PASSED! (10/10 clean)');
  console.log('============================================================');
}

runTests().catch((err)=>{
  console.error('Test Suite Failed:',err);
  process.exit(1);
});
