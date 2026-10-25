import {useState,useEffect,useCallback} from 'react';
import {ActivityLogParams,SortField,SortOrder} from '../types/activity-log.types';

const DEFAULT_PARAMS:ActivityLogParams={
  page:1,
  pageSize:10,
  sort:'date',
  order:'desc',
  status:'ALL',
  user:'ALL',
  search:'',
};

export const parseParamsFromUrl=():ActivityLogParams=>{
  if(typeof window==='undefined') return DEFAULT_PARAMS;
  const sp=new URLSearchParams(window.location.search);
  const page=parseInt(sp.get('page')||'1',10)||1;
  const pageSize=parseInt(sp.get('pageSize')||'10',10)||10;
  const sort=(sp.get('sort') as SortField)||'date';
  const order=(sp.get('order') as SortOrder)||'desc';
  const status=sp.get('status')||'ALL';
  const user=sp.get('user')||'ALL';
  const search=sp.get('search')||'';
  const startDate=sp.get('startDate')||undefined;
  const endDate=sp.get('endDate')||undefined;

  return {page,pageSize,sort,order,status,user,search,startDate,endDate};
};

export const syncParamsToUrl=(params:ActivityLogParams)=>{
  if(typeof window==='undefined') return;
  const sp=new URLSearchParams();
  if(params.page>1) sp.set('page',String(params.page));
  if(params.pageSize!==10) sp.set('pageSize',String(params.pageSize));
  if(params.sort!=='date') sp.set('sort',params.sort);
  if(params.order!=='desc') sp.set('order',params.order);
  if(params.status&&params.status!=='ALL') sp.set('status',params.status);
  if(params.user&&params.user!=='ALL') sp.set('user',params.user);
  if(params.search&&params.search.trim()) sp.set('search',params.search.trim());
  if(params.startDate) sp.set('startDate',params.startDate);
  if(params.endDate) sp.set('endDate',params.endDate);

  const qs=sp.toString();
  const nextUrl=qs?`${window.location.pathname}?${qs}`:window.location.pathname;
  window.history.pushState(null,'',nextUrl);
};

export const useUrlTableParams=()=>{
  const [params,setParams]=useState<ActivityLogParams>(parseParamsFromUrl);

  // Sync to URL whenever params change
  useEffect(()=>{
    syncParamsToUrl(params);
  },[params]);

  // Handle browser back/forward buttons
  useEffect(()=>{
    const onPopState=()=>{
      setParams(parseParamsFromUrl());
    };
    window.addEventListener('popstate',onPopState);
    return ()=>window.removeEventListener('popstate',onPopState);
  },[]);

  const updateParam=<K extends keyof ActivityLogParams>(key:K,val:ActivityLogParams[K])=>{
    setParams((prev)=>{
      const next={...prev,[key]:val};
      // Reset to page 1 on filter or search changes
      if(key!=='page'&&key!=='pageSize') next.page=1;
      return next;
    });
  };

  const toggleSort=useCallback((field:SortField)=>{
    setParams((prev)=>{
      if(prev.sort===field){
        return {...prev,order:prev.order==='asc'?'desc':'asc',page:1};
      }
      return {...prev,sort:field,order:'asc',page:1};
    });
  },[]);

  const resetFilters=useCallback(()=>{
    setParams(DEFAULT_PARAMS);
  },[]);

  return {params,setParams,updateParam,toggleSort,resetFilters};
};
