import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { setSelectedFlow,setSelectedFlowData, reset, setSelectedStart } from '@/redux/features/flowSlice';
import {useGetFlowsQuery} from '@/redux/services/flowApi';


import { Flow } from '@/types/flow';
function useSearchRouteListener() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { isLoading, isFetching, data: flows, error } = useGetFlowsQuery(null);
  useEffect(() => {
    if (flows) {
        dispatch(reset());
        const _flowId = pathname.replaceAll('/', '');
        const _selectedFlow = flows.find((flow: Flow) => Number(flow.id) === Number(_flowId));
        const _selectedFlowData = flows.filter((flow: Flow) => Number(flow.flow_id) === Number(_flowId));
        const _selectedStart = _selectedFlowData.find((flow: Flow) => flow.start);

        
        dispatch(setSelectedFlow(_selectedFlow));
        dispatch(setSelectedFlowData(_selectedFlowData)); 
        dispatch(setSelectedStart(_selectedStart));
 
    }


  }, [flows, dispatch, pathname]);

  return null; // This hook doesn't return anything
}

export default useSearchRouteListener;