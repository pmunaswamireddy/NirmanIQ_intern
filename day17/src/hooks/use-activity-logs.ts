import {useQuery,useMutation,useQueryClient,keepPreviousData} from '@tanstack/react-query';
import {ActivityLogParams,ActivityStatus} from '../types/activity-log.types';
import {fetchActivityLogs,updateBatchStatus} from '../services/activity-log.service';

export const useActivityLogs=(params:ActivityLogParams)=>{
  return useQuery({
    queryKey:['activity-logs',params],
    queryFn:async()=>{
      const res=await fetchActivityLogs(params);
      console.log('Activity Logs Query Result:',{page:res.page,total:res.total,count:res.data.length});
      return res;
    },
    placeholderData:keepPreviousData,
    staleTime:5000,
  });
};

export const useBatchUpdateStatus=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn:({ids,status}:{ids:string[];status:ActivityStatus})=>updateBatchStatus(ids,status),
    onSuccess:(res,vars)=>{
      console.log('Bulk Action Applied Report:',{status:vars.status,ids:vars.ids,updatedCount:res.updatedCount});
      queryClient.invalidateQueries({queryKey:['activity-logs']});
    },
  });
};
