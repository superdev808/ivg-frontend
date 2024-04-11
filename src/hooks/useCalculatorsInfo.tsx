'use client';
import { useGetCalculatorInfoQuery } from "@/redux/hooks/apiHooks";

const useCalculatorsInfo = () => {
  const { data: calcInfoMap = {}, isLoading: isCalcInfoLoading, isError: isCalcInfoError, refetch: refetchCalcInfo } = useGetCalculatorInfoQuery({}, {
    pollingInterval: 3600 * 1000,
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  return {
    calcInfoMap,
    isCalcInfoLoading,
    isCalcInfoError,
    refetchCalcInfo,
  }
}

export default useCalculatorsInfo