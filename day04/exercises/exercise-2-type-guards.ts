// Day 4 - Exercise 2: Type Guards
// Author: Penumuru Madhu Sudhan Reddy

interface SuccessResponse<T> {
  type:'success';
  data:T;
}
interface ErrorResponse {
  type:'error';
  message:string;
  code:number;
}
interface ValidationError {
  type:'validation_error';
  fields:Record<string,string>;
}
type APIResponse<T>=SuccessResponse<T> | ErrorResponse | ValidationError;

function isSuccess<T>(res:APIResponse<T>):res is SuccessResponse<T> {
  return res.type==='success';
}
function isError<T>(res:APIResponse<T>):res is ErrorResponse {
  return res.type==='error';
}
function isValidationError<T>(res:APIResponse<T>):res is ValidationError {
  return res.type==='validation_error';
}
function handleResponse<T>(res:APIResponse<T>):string {
  if (isSuccess(res)) return `Success: ${JSON.stringify(res.data)}`;
  if (isError(res)) return `Error [${res.code}]: ${res.message}`;
  if (isValidationError(res)) {
    const invalid=Object.keys(res.fields).join(', ');
    return `Validation failed on fields: ${invalid}`;
  }
  const _check:never=res;
  return _check;
}

// test
const r1:APIResponse<{ siteId:string }>={ type:'success',data:{ siteId:'SITE-99' } };
const r2:APIResponse<null>={ type:'error',message:'Database timeout',code:504 };
const r3:APIResponse<null>={ type:'validation_error',fields:{ budget:'Must be positive',name:'Required' } };
console.log(handleResponse(r1));
console.log(handleResponse(r2));
console.log(handleResponse(r3));
