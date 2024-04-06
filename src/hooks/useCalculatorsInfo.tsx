'use client';
import { useGetCalculatorInfoQuery } from "@/redux/hooks/apiHooks";
import { useCallback } from "react";

const useCalculatorsInfo = () => {
  const { data: calcInfoMap = {}, isLoading: isCalcInfoLoading, isError: isCalcInfoError } = useGetCalculatorInfoQuery({}, {
    pollingInterval: 3600 * 1000,
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  return {
    calcInfoMap,
    isCalcInfoLoading,
    isCalcInfoError,
  }
}

export default useCalculatorsInfo