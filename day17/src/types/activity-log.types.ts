export type ActivityStatus='APPROVED'|'REJECTED'|'PENDING'|'IN_REVIEW';

export interface ActivityLog {
  id:string;
  date:string;
  user:string;
  action:string;
  tower:string;
  floor:number;
  status:ActivityStatus;
}

export type SortField='date'|'user'|'action'|'tower'|'floor'|'status';
export type SortOrder='asc'|'desc';

export interface ActivityLogParams {
  page:number;
  pageSize:number;
  sort:SortField;
  order:SortOrder;
  status?:string;
  user?:string;
  search?:string;
  startDate?:string;
  endDate?:string;
}

export interface PaginatedResult<T> {
  data:T[];
  total:number;
  page:number;
  pageSize:number;
  totalPages:number;
}
